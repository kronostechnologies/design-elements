import { type FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider';

export type LegendSize = 'small' | 'medium' | 'large';

export interface LegendProps extends HTMLAttributes<HTMLLegendElement> {
    className?: string;
    size?: LegendSize;
    bold?: boolean;
}

function getFontSize({ $isMobile, $size = 'medium' }: { $isMobile: boolean, $size?: LegendProps['size'] }): string {
    const mobileSizes = { small: '0.75rem', medium: '0.875rem', large: '1rem' };
    const desktopSizes = { small: '0.625rem', medium: '0.75rem', large: '0.875rem' };
    const sizes = $isMobile ? mobileSizes : desktopSizes;
    return sizes[$size] || sizes.medium;
}

export const StyledLegend = styled.legend<{
    $size: LegendProps['size'],
    $bold: LegendProps['bold'],
    $isMobile: boolean,
}>`
    color: ${({ theme }) => theme.component['legend-text-color']};
    font-size: ${getFontSize};
    font-weight: ${({ $bold }) => ($bold ? 'var(--font-bold)' : 'var(--font-normal)')};
    margin: 0 0 var(--spacing-1x);
`;

export const Legend: FC<LegendProps> = ({
    children,
    size,
    bold,
    ...props
}) => {
    const { isMobile } = useDeviceContext();

    return (
        <StyledLegend
            datatest-id="legend"
            $size={size}
            $bold={bold}
            $isMobile={isMobile}
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {children}
        </StyledLegend>
    );
};

Legend.displayName = 'Legend';
