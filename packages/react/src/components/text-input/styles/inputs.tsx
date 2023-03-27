import { css, FlattenSimpleInterpolation } from 'styled-components';
import { Theme } from '../../../themes';
import { focus } from '../../../utils/css-state';
import { DeviceContextProps } from '../../device-context-provider/device-context-provider';

export const inputsStyle: (theme: Theme, isMobile?: boolean) => FlattenSimpleInterpolation = (
    theme: Theme,
    isMobile = false,
) => css`
    background: ${theme.greys.white};
    border: 1px solid ${theme.greys['dark-grey']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${theme.greys.black};
    font-family: inherit;
    font-size: ${isMobile ? '1rem' : '0.875rem'};
    letter-spacing: ${isMobile ? '0.02875rem' : '0.015rem'};
    line-height: 1.5rem;
    margin: 0;
    min-height: var(--size-2x);
    outline: none;
    padding: 0 var(--spacing-1x);
    width: 100%;

    ${focus({ theme }, true)};

    &::placeholder {
        color: ${theme.greys['dark-grey']};
    }

    &:disabled {
        background-color: ${theme.greys['light-grey']};
        border-color: ${theme.greys.grey};

        &,
        &::placeholder {
            color: ${theme.greys['mid-grey']};
        }
    }
`;

interface ResponsiveInputsStyles {
    theme: Theme;
    device: DeviceContextProps;
}

export const responsiveInputsStyle = ({ theme, device: { isMobile } }: ResponsiveInputsStyles): FlattenSimpleInterpolation => css`
    background: ${theme.greys.white};
    border: 1px solid ${theme.greys['dark-grey']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${theme.greys.black};
    font-family: inherit;
    font-size: ${isMobile ? 1 : 0.875}rem;
    letter-spacing: ${isMobile ? 0.02875 : 0.015}rem;
    line-height: 1.5rem;
    margin: 0;
    outline: none;
    padding: ${isMobile ? 'var(--spacing-1x)' : 'var(--spacing-half) var(--spacing-1x)'};
    width: 100%;

    &::placeholder {
        color: ${theme.greys['dark-grey']};
    }

    &:disabled {
        background-color: ${theme.greys['light-grey']};
        border-color: ${theme.greys.grey};

        &,
        &::placeholder {
            color: ${theme.greys['mid-grey']};
        }
    }

    ${focus({ theme }, true)}
`;
