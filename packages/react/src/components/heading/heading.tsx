import { forwardRef, ReactNode } from 'react';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

export type Type = 'xlarge' | 'large' | 'medium' | 'small' | 'subtitle';
export type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface HeadingProps {
    bold?: boolean;
    children?: ReactNode;
    className?: string;
    id?: string;
    noMargin?: boolean;
    tag?: Tag;
    type: Type;
}

interface StyledHeadingProps {
    bold?: boolean;
    noMargin?: boolean;
}

const HeadingXlarge = styled.h1<StyledHeadingProps>`
    font-size: 2rem;
    font-weight: var(--font-normal);
    line-height: 3rem;
    margin: ${({ noMargin }) => (noMargin ? '0' : 'var(--spacing-4x) 0')};
`;

const HeadingLarge = styled.h2<StyledHeadingProps>`
    font-size: 1.5rem;
    font-weight: ${({ bold }) => (bold ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    line-height: 2.25rem;
    margin: ${({ noMargin }) => (noMargin ? '0' : 'var(--spacing-3x) 0')};
`;

const HeadingMedium = styled.h3<StyledHeadingProps>`
    font-size: 1.25rem;
    font-weight: ${({ bold }) => (bold ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    line-height: 2rem;
    margin: ${({ noMargin }) => (noMargin ? '0' : 'var(--spacing-3x) 0')};
`;

const HeadingSmall = styled.h4<StyledHeadingProps>`
    font-size: 1rem;
    font-weight: ${({ bold }) => (bold ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    line-height: 1.5rem;
    margin: ${({ noMargin }) => (noMargin ? '0' : 'var(--spacing-3x) 0')};
`;

const HeadingSubtitle = styled.h2<StyledHeadingProps>`
    color: ${({ theme }) => theme.colors['dark-grey']};
    font-size: 1rem;
    font-weight: ${({ bold }) => (bold ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    line-height: 1.5rem;
    margin: ${({ noMargin }) => (noMargin ? '0' : 'var(--spacing-3x) 0')};
`;

function getComponent(type: Type): StyledComponent<'h1' | 'h2' | 'h3' | 'h4', DefaultTheme, StyledHeadingProps> {
    switch (type) {
        case 'xlarge':
            return HeadingXlarge;
        case 'large':
            return HeadingLarge;
        case 'medium':
            return HeadingMedium;
        case 'small':
            return HeadingSmall;
        case 'subtitle':
            return HeadingSubtitle;
    }
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({
    bold,
    className,
    children,
    id,
    noMargin,
    tag,
    type,
}, ref) => {
    const HeadingComponent = getComponent(type);

    return (
        <HeadingComponent
            as={tag}
            bold={bold}
            className={className}
            id={id}
            noMargin={noMargin}
            ref={ref}
        >
            {children}
        </HeadingComponent>
    );
});

Heading.displayName = 'Heading';
