import { ComponentProps, ComponentType, ReactElement } from 'react';
import { equisoftTheme, ThemeWrapper } from '..';

type ThemeProps = Pick<ComponentProps<typeof ThemeWrapper>, 'children'>;

export function ThemeProvider({ children }: ThemeProps): ReactElement {
    return (
        <ThemeWrapper theme={equisoftTheme}>
            {children}
        </ThemeWrapper>
    );
}

export function themeProvider(): ComponentType {
    return ThemeProvider as ComponentType;
}
