import { Theme } from '@design-elements/themes/theme';
import { focus } from '@design-elements/utils/css-state';
import { css, FlattenSimpleInterpolation } from 'styled-components';

export const inputsStyle: (
    theme: Theme,
    isMobile?: boolean,
    inputWidth?: string,
    inputHeight?: string
) => FlattenSimpleInterpolation = (
  theme: Theme,
  isMobile: boolean = false,
  inputWidth: string | undefined = undefined,
  inputHeight: string | undefined = undefined
) => css`
    background: ${theme.greys.white};
    border: 1px solid ${theme.greys['dark-grey']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${theme.greys.black};
    font-family: inherit;
    font-size: ${isMobile ? '1rem' : '0.875rem'};
    letter-spacing: ${isMobile ? `0.02875rem` : '0.015rem'};
    line-height: 1.5rem;
    margin: 0;
    outline: none;
    padding: var(--spacing-half) var(--spacing-1x);
    ${inputHeight ? `height:${inputHeight};` : ''}
    ${inputWidth ? `width:${inputWidth};` : ''}

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
