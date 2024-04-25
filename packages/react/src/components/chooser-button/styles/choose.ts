import styled from 'styled-components';
import { focus } from '../../../utils/css-state';

export const Label = styled.label`
    --border-radius: 8px;

    align-items: center;
    background: ${({ theme }) => theme.component['chooser-background-color']};
    border: 1px solid ${({ theme }) => theme.component['chooser-border-color']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${({ theme }) => theme.component['chooser-text-color']};
    display: flex;
    font-size: 1rem;
    justify-content: center;
    letter-spacing: 0;
    line-height: 1.5rem;
    min-height: 3rem;
    padding: var(--spacing-1x);
    text-align: center;

    &:hover {
        background: ${({ theme }) => theme.component['chooser-hover-background-color']};
        border-color: ${({ theme }) => theme.component['chooser-hover-border-color']};
        color: ${({ theme }) => theme.component['chooser-hover-text-color']};
    }

    input[type='checkbox']:checked + &,
    input[type='radio']:checked + & {
        background: ${({ theme }) => theme.component['chooser-selected-background-color']};
        border-color: ${({ theme }) => theme.component['chooser-selected-border-color']};
        color: ${({ theme }) => theme.component['chooser-selected-text-color']};
    }

    ${({ theme }) => focus({ theme }, { selector: ', input[type="checkbox"]:focus + &, input[type="radio"]:focus + &' })}

    input[type='checkbox']:disabled + &,
    input[type='radio']:disabled + & {
        background: ${({ theme }) => theme.component['chooser-disabled-background-color']};
        border-color: ${({ theme }) => theme.component['chooser-disabled-border-color']};
        color: ${({ theme }) => theme.component['chooser-disabled-text-color']};
    }

    b {
        font-size: 1.5rem;
        font-weight: var(--font-normal);
        line-height: 2.5rem;
    }

    /* For future support of SVG icons in button */
    svg {
        color: inherit;
        height: 3rem;
        width: 3rem;
    }
`;
