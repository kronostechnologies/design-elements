import styled from 'styled-components';
import { Theme } from '../../../themes';
import { focus } from '../../../utils/css-state';

export const Label = styled.label`
    ${({ theme }: { theme: Theme }) => `
            --border-radius: 8px;

            align-items: center;
            background: ${theme.colors.white};
            border: 1px solid ${theme.colors['dark-grey']};
            border-radius: var(--border-radius);
            box-sizing: border-box;
            color: ${theme.colors['dark-grey']};
            cursor: pointer;
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
                background: ${theme.colors.grey};
                border-color: ${theme.colors.grey};
            }

            input[type="checkbox"]:checked + &,
            input[type="radio"]:checked + & {
                background: ${theme.colors['primary-1.1']};
                border-color: ${theme.colors['primary-1.1']};
                color: ${theme.colors.white};
            }

            ${focus({ theme }, true, 'input[type="checkbox"]:focus + &, input[type="radio"]:focus + &')}

            input[type="checkbox"]:disabled + &,
            input[type="radio"]:disabled + & {
                background: ${theme.colors['light-grey']};
                border-color: ${theme.colors.grey};
                color: ${theme.colors['mid-grey']};
                cursor: auto;
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
        `}
`;
