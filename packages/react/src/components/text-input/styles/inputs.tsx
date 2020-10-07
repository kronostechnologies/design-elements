import { focus } from '@design-elements/utils/state';
import { Theme } from '../../theme-wrapper/theme-wrapper';

export const inputsStyle = (theme: Theme) => `
    ${focus({ theme: theme })}

    background: ${theme.greys.white};
    border: 1px solid ${theme.greys.grey};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${theme.greys.black};
    font-family: inherit;
    font-size: 0.875rem;
    letter-spacing: 0.025rem;
    line-height: 1.4rem;
    margin: 0;
    outline: none;
    padding: var(--spacing-half) var(--spacing-1x);
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

    label + & {
        display: block;
        margin-top: var(--spacing-half);
    }
`;
