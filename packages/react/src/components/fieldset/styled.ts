import styled from 'styled-components';
import { FieldsetProps, LegendProps } from './types';

function getFontSize({ $isMobile, $size = 'medium' }: { $isMobile: boolean, $size?: LegendProps['size'] }): string {
    const mobileSizes = { xxsmall: '0.75rem', xsmall: '0.875rem', small: '1rem', medium: '1.25rem', large: '1.5rem' };
    const desktopSizes = { xxsmall: '0.75rem', xsmall: '0.875rem', small: '1rem', medium: '1.25rem', large: '1.5rem' };
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

export const StyledFieldset = styled.fieldset<FieldsetProps>`
    border: 0;
    border: none;
    display: flex;
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
