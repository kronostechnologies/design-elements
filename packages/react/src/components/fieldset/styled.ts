import styled from 'styled-components';
import { FieldsetProps, LegendProps } from './types';

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

export const StyledFieldset = styled.fieldset<{
    $orientation: FieldsetProps['orientation'],
}>`
    border: 0;
    border: none;
    display: flex;
    flex-direction: ${({ $orientation }) => ($orientation === 'horizontal' ? 'row' : 'column')};
    gap: var(--spacing-1x);
    margin: 0;
    min-inline-size: 0;
    min-width: 0;
    padding: 0;

    &:disabled,
    &[aria-disabled='true'] {
        legend {
            color: ${({ theme }) => theme.component['legend-disabled-text-color']};
        }
    }
`;
