# ADR-002: Component File Structure

## Date
2024-10-22

## Status
PROPOSED

## Context
As our `Design System` continues to grow, maintaining a scalable and maintainable component architecture is becoming increasingly important. Our initial approach of housing everything (component logic, styles, types, utilities, etc.) in a single file worked well for simple components, but as components grew in complexity, this structure began to hinder readability, maintainability, and reusability.

Challenges with the single-file structure included:

- **Large files**: Components with complex logic, hooks, and styling resulted in long files that were hard to navigate and maintain.
- **Poor separation of concerns**: Housing multiple responsibilities (logic, styling, types) in a single file blurred the lines between concerns, making testing, debugging, and collaborative development challenging.

## Decision
After group discussions, we decided to adopt an approach by leveraging separation of concerns by splitting key responsibilities (styles, types, logic, and utilities) into distinct files. 
This ensures better file management, improved reusability, and easier maintenance for both small and large components.

Our goal is to create a clean, modular file structure that facilitates ease of use, scalability, and consistent development practices across our `Design System`.

### Basic component structure
```markdown
/components
└── /component-name
    ├── index.ts                        // Barrel file to export all public members of the component
    ├── component.tsx                   // Main functional component
    ├── component.test.tsx              // Test file for the main component
    ├── component.test.tsx.snap         // Snapshot file for the main component
    ├── styled.ts                       // Styled-components, style-related functions or any component-specific styling logic
    ├── types.ts                        // Types/interfaces, including styled component types
    ...

Might be considered for different scenarios
    ├── utils.ts                        // Utility and helper functions
    ├── constants.ts                    // Constants, default props and states for particular situations
```

#### `index.ts` - Barrel File
- **Responsibility**: This file acts as a central point of export for the component and its associated pieces (e.g., subcomponents, hooks, and types).
- **Guidelines**:
  - Export only what's necessary for external use. 
  - Keep this file clean and simple, focusing only on exports.
```typescript
// index.ts
export { default as ComponentName } from './component';
export { ComponentProps } from './types';
```

#### `component.tsx` - Main Functional Component
- **Responsibility**: This is the core file where the presentational component is defined.
- **Guidelines**:
    - Keep this file as simple as possible by extracting complex logic into hooks, helpers, or utility files. .
    - Focus only on rendering, passing props, and event handlers here.
```tsx
// component.tsx
import { FC } from 'react';
import { StyledComponent, StyledSubComponent } from './styled';
import { ComponentProps } from './types';
import { useComponent } from './use-component';

export const ComponentName: FC<ComponentProps> = ({
    id: providedId,
    size,
    ...props
}) => {
    const { isMobile } = useDeviceContext();

    const processedProps = useComponent({
        size,
        ...props,
    });

    return (
        <StyledComponent
            datatest-id='component-name'
            $size={size}
            $isMobile={isMobile}
            {...props}
        >
            {/* Content */}
            <StyledSubComponent />
        </StyledComponent>
    );
};

ComponentName.displayName = 'ComponentName';
```

#### `styled.ts` - Styling (Styled-components & CSS)
- **Responsibility**: Manages the component’s CSS and related style logic using styled-components or other styling methods.
- **Guidelines**:
    - Use styled-components for modular and encapsulated styles.
    - Keep this file strictly for styled-components and conditional styling based on props.
    - Avoid mixing component logic with styles.

```typescript
// styled.ts
import styled from 'styled-components';
import StyledComponentProps from './types';

function getFontSize({ $size }: StyledComponentProps): string {
    switch ($size) {
        case 'small':
            return '12px';
        default:
            return '16px';
    }
}

export const StyledComponent = styled.div`
  color: ${({theme}) => theme.components['component-token-name-color']};
  font-size: ${getFontSize};       
  padding: 20px; 
`;

export const StyledSubComponent = styled.div`
  color: ${({theme}) => theme.components['sub-component-token-name-color']};   
`;
```

#### `types.ts` - Types/Interfaces
- **Responsibility**: Store the types and interfaces that define props, state, and any other types related to the component.
- **Guidelines**:
    - Keep all types and interfaces in this file to maintain a clean separation.
    - Define types for the component's props, as well as types for other elements like the styled-components or hooks.
    - Avoid over-complicating types—focus on the key props, state, or other structures used in the component.
```typescript
// types.ts
import { HTMLAttributes, CSSProperties } from 'react';

export type ComponentSize = 'small' | 'medium' | 'large';

type BaseComponentProps = Pick<HTMLAttributes<HTMLElement>,
    'className' | 'id' // ...
>;

export interface ComponentProps extends BaseComponentProps {
    size?: ComponentSize;
}

type MobileDeviceContextProps = Pick<DeviceContextProps, 'isMobile'>

export interface StyledComponentProps extends MobileDeviceContextProps {
    $size: ComponentProps['size'];
    $width: CSSProperties['width'];
}
```

#### `utils.ts` - Utility Functions
- **Responsibility**: This file houses any helper or utility or reusable logic functions that are specific to the component.
- **Guidelines**:
  - Only include component-specific utilities here. If they are useful across multiple components, move them to a shared utils folder at the top level.
  - These could include transformation functions, calculations, or data formatting that the component uses.
```typescript
// utils.ts
export const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};
```

#### `component.test.tsx` - Test File
- **Responsibility**: This file contains unit or integration tests that ensure the component behaves as expected. (with React Testing Library, Jest, etc.)
- **Guidelines**:
  - Focus on key behaviors, ensuring the component renders correctly and interacts with props or state or event handlers as expected. 
  - Include tests for edge cases, such as missing props, and ensure error handling works.

```tsx
// component.test.tsx
import ComponentName from './component';
import {render} from '@testing-library/react';
import {expect} from "@jest/globals";

describe('ComponentName', () => {
    describe('Features', () => {
        // tests for uses cases, dynamic rendering, event handling, etc.
        it('renders component correctly', () => {
            expect(true).toBe(true);
        });
    });

    describe('Styling', () => {
        // matching snapshots
        it('matches size medium', () => {
            const { container } = render(<ComponentName size='medium' />);
            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe('Accessibility', () => {
        // tests for accessibility
        it('applies aria-label when provided', () => {
            expect(true).toBe(true);
        });
    });
});
```
- **With multiple testing files**: In a scenario where the main testing file becomes to large, we could break into separate files
```markdown
└── /tests                          // Directory for testing files
    ├── component.test.tsx                  // Main test file for the component (features, props, dynamic, etc.)
    ├── component-utils.test.tsx            // Test file for utility functions    
    ├── component-hooks.test.tsx            // Test file for hooks
    ├── component-accessibility.test.tsx    // Test file for accessibility
    ├── component-styles.test.tsx           // Test file for styles
    ├── component.test.tsx.snap             // Snapshot file for the main component
    ...
```

### With `sub-components` or `variants`
In scenarios where a component can be separated into multiple sub-components or has variations, create a separate directory for each sub-component or variant.
- **Guidelines**:
  - Each sub-component/variant directory should contain only the logic, styles, and types specific to that sub-component or variant that differentiate them from the base component. 
  - Sub-components should handle specific tasks or UI parts.
  - Avoid duplicating code that can be shared across multiple variants. Extract shared logic from the base component and reuse it in the variant to ensure consistency. 
  - Use the same file structure (e.g., styled.ts, types.ts, test.tsx) as for full components.
```markdown
└── /sub-component                  
    ├── sub-component.tsx
    ├── sub-component.test.tsx
    ├── styled.ts
    ...

└── /variant-component
    ├── variant-component.tsx
    ├── variant-component.test.tsx
    ├── styled.ts
    ...
```

### With headless component and multiple hooks
In a scenario where the component has many hooks or we choose to make it headless, we could create a separate directory for hooks.
```markdown
└── /hooks   
    ├── useComponent.ts             // Custom hooks and headless component logic (if applicable)
    ├── useHandlers.ts
    ├── useFeature1.ts           
    ├── useFeature2.ts
    ...
```

#### `useComponent.ts` - Custom Hook for Headless Component Logic
- **Responsibility**:  This file is the main custom hook for the headless component, containing all logic related to managing the component’s behavior without rendering any JSX. This hook typically manages state and any handlers, leaving the rendering logic to the presentational component.
- **Guidelines**:
    - Keep the focus on business logic and state management—this is a "headless" hook, meaning it shouldn’t contain any rendering logic.
    - It should provide a clear API that the presentational component can consume.
    - Will probably reuse the main interface (ComponentProps) defined in the types file.
```typescript
// useComponent.ts
import { useState } from 'react';
import { ComponentProps } from './types';

type UseComponentProps = Pick<ComponentProps, | 'size' | 'initialCount'>;

export const useComponent = ({initialCount = 0}: UseComponentProps) => {
    const [count, setCount] = useState(initialCount);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        increment();
    }, []);

    const handleKeyPress = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        decrement();
    }, []);

    return {
        count,
        handleClick,
        handleKeyPress,
    };
};
```

### With design tokens evolution
Currently, our design tokens are limited to colors.
As the design tokens evolve to include shadows, fonts, and other properties, we may need to separate them into distinct files such as `color-tokens.ts`, `font-tokens.ts`, and `shadow-tokens.ts`. 
Additionally, relocating these tokens into their respective component folders could enhance organization. 
In this scenario, a dedicated directory for styles-related files might be necessary.
```markdown
└── /styles                         // Directory for styles-related files
    ├── styled.ts                       // Styled-components, including any component-specific styling logic
    ├── color-tokens.ts                
    ├── font-tokens.ts                  
    ├── shadow-tokens.ts                
    ...
```

### With Storybook stories relocation
Currently, the Storybook stories are stored in a centralized stories folder, separated from the actual component files.
Co-locating Storybook stories with their respective components could improve organization, discoverability, maintenance, and consistency.
In this scenario, a dedicated directory for stories-related files might be needed.
```markdown
└── /stories                // Directory for stories-related files
    ├── component.stories.tsx   // Storybook stories for the component
    ├── component.mdx           // Storybook MDX doc file for the component
    ...
```

## Consequences

### Positive

- **Smaller files**: Each file has a clear purpose and is much easier to navigate, maintain, and refactor.
- **Improved readability**: Each file has a specific, well-defined responsibility—whether it’s styles, utility functions, or types. By splitting these into their own files, each file remains concise and focused, making it easier to understand at a glance.
- **Improved reusability**: Utility functions, hooks, or styles can be easily reused across different components if they are split out into separate files.
- **Testing**: With clear separation, each part can be tested individually, making unit testing of utility functions or hooks simpler.
- **Team collaboration**: Multiple people can work on different parts of a component (e.g., styles, logic) without stepping on each other’s toes.

### Negative

- **Fragmented context**: Developers may need to jump between multiple files to understand the complete logic of a component, which can slow down development. Changes in one part of the component may require touching multiple files.
- **Overhead**: For smaller components, splitting every piece (styles, hooks, types) into its own file could create unnecessary overhead and complexity when navigating the project.
- **Potential for duplication**: If the separation is too rigid, there could be a temptation to duplicate utility functions or hooks that are too specific to reuse across components, leading to code duplication.
