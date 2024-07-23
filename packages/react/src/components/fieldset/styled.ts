import styled from 'styled-components';
import { FieldsetProps, LegendProps } from './types';

const getFontSize = (size: 'small' | 'medium' | 'large' | undefined, isMobile: boolean): string => {
    const effectiveSize = size || 'medium';
    if (isMobile) {
        switch (effectiveSize) {
            case 'small':
                return '0.75rem';
            case 'medium':
                return '0.875rem';
            case 'large':
                return '1rem';
            default:
                return '0.875rem';
        }
    } else {
        switch (effectiveSize) {
            case 'small':
                return '0.625rem';
            case 'medium':
                return '0.75rem';
            case 'large':
                return '0.875rem';
            default:
                return '0.75rem';
        }
    }
};

export const StyledLegend = styled.legend<LegendProps & { isMobile: boolean }>`
    color: ${({ disabled, theme }) => (disabled ? theme.component['legend-disabled-text-color'] : theme.component['legend-text-color'])};
    display: table;
    font-size: ${({ isMobile, size }) => getFontSize(size, isMobile)};
    font-weight: ${({ bold }) => (bold ? 'var(--font-bold)' : 'var(--font-normal)')};
    margin: 0 0 var(--spacing-1x);
`;

export const StyledFieldset = styled.fieldset<FieldsetProps>`
    border: 0;
    border: none;
    display: flex;
    flex-direction: ${({ orientation }) => (orientation === 'horizontal' ? 'row' : 'column')};
    gap: var(--spacing-1x);
    margin: 0;
    min-inline-size: 0;
    min-width: 0;
    padding: 0;
`;
