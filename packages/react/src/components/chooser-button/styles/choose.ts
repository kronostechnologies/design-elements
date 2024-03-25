import styled from 'styled-components';
import { focus } from '../../../utils/css-state';

export const Label = styled.label`
    --border-radius: 8px;

    align-items: center;
    background: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${({ theme }) => theme.greys['dark-grey']};
    display: flex;
    font-size: 1rem;
    justify-content: center;
    letter-spacing: 0;
    line-height: 1.5rem;
    min-height: 3rem;
    padding: var(--spacing-1x);
    text-align: center;
    transition: all 0.25s ease-in-out;

    &:hover {
        background: ${({ theme }) => theme.greys.grey};
        border-color: ${({ theme }) => theme.greys.grey};
    }

    input[type='checkbox']:checked + &,
    input[type='radio']:checked + & {
        background: ${({ theme }) => theme.main['primary-1.1']};
        border-color: ${({ theme }) => theme.main['primary-1.1']};
        color: ${({ theme }) => theme.greys.white};
    }

    ${({ theme }) => focus({ theme }, { selector: ', input[type="checkbox"]:focus + &, input[type="radio"]:focus + &' })}

    input[type='checkbox']:disabled + &,
    input[type='radio']:disabled + & {
        background: ${({ theme }) => theme.greys['light-grey']};
        border-color: ${({ theme }) => theme.greys.grey};
        color: ${({ theme }) => theme.greys['mid-grey']};
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
