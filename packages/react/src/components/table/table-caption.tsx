import { forwardRef } from 'react';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import { TableCaptionProps, TableCaptionSize, StyledTableCaptionProps } from './types';

const TableCaptionLarge = styled.caption<StyledTableCaptionProps>`
    color: ${({ theme }) => theme.component['caption-text-color']};
    font-size: 1.5rem;
    font-weight: ${({ $bold }) => ($bold ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    line-height: 2rem;
    margin: var(--spacing-3x) 0;
    text-align: left;
`;

const TableCaptionMedium = styled.caption<StyledTableCaptionProps>`
    color: ${({ theme }) => theme.component['caption-text-color']};
    font-size: 1.25rem;
    font-weight: ${({ $bold }) => ($bold ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    line-height: 1.75rem;
    margin: var(--spacing-3x) 0;
    text-align: left;
`;

const TableCaptionSmall = styled.caption<StyledTableCaptionProps>`
    color: ${({ theme }) => theme.component['caption-text-color']};
    font-size: 1rem;
    font-weight: ${({ $bold }) => ($bold ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    line-height: 1.5rem;
    margin: var(--spacing-3x) 0;
    text-align: left;
`;

function getComponent(size: TableCaptionSize): StyledComponent<'caption', DefaultTheme, TableCaptionProps> {
    switch (size) {
        case 'large':
            return TableCaptionLarge;
        case 'medium':
            return TableCaptionMedium;
        case 'small':
            return TableCaptionSmall;
    }
}

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(({
    bold,
    className,
    children,
    id,
    size,
}, ref) => {
    const StyledTableCaption = getComponent(size ?? 'medium');

    return (
        <StyledTableCaption
            datatest-id='caption'
            size={size}
            bold={bold}
            className={className}
            id={id}
            ref={ref}
        >
            {children}
        </StyledTableCaption>
    );
});
