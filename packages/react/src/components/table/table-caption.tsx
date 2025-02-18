import { forwardRef, HTMLAttributes, PropsWithChildren, useMemo } from 'react';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

export type TableCaptionSize = 'large' | 'medium' | 'small';

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
    className?: string;
    id?: string;
    bold?: boolean;
    size?: TableCaptionSize;
}

export interface StyledTableCaptionProps {
    $bold?: boolean;
}

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

function getComponent(size: TableCaptionSize): StyledComponent<'caption', DefaultTheme, StyledTableCaptionProps> {
    switch (size) {
        case 'large':
            return TableCaptionLarge;
        case 'small':
            return TableCaptionSmall;
        default:
            return TableCaptionMedium;
    }
}

export const TableCaption = forwardRef<HTMLTableCaptionElement, PropsWithChildren<TableCaptionProps>>(({
    bold,
    className,
    children,
    id,
    size,
}, ref) => {
    const StyledTableCaption = useMemo(() => getComponent(size ?? 'medium'), [size]);

    return (
        <StyledTableCaption
            data-testid='caption'
            $bold={bold}
            className={className}
            id={id}
            ref={ref}
        >
            {children}
        </StyledTableCaption>
    );
});

TableCaption.displayName = 'TableCaption';
