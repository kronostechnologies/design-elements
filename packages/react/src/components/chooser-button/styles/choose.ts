import styled from 'styled-components';
import { Theme } from '../../../themes';
import { focus } from '../../../utils/css-state';

export const Label = styled.label`
    ${({ theme }: { theme: Theme }) => `
            --border-radius: 8px;

            align-items: center;
            background: ${theme.ref['color-white']};
            border: 1px solid ${theme.ref['color-neutral-65']};
            border-radius: var(--border-radius);
            box-sizing: border-box;
            color: ${theme.ref['color-neutral-65']};
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
                background: ${theme.ref['color-neutral-15']};
                border-color: ${theme.ref['color-neutral-15']};
            }

            input[type="checkbox"]:checked + &,
            input[type="radio"]:checked + & {
                background: ${theme.ref['color-brand-50']};
                border-color: ${theme.ref['color-brand-50']};
                color: ${theme.ref['color-white']};
            }

            ${focus({ theme }, true, 'input[type="checkbox"]:focus + &, input[type="radio"]:focus + &')}

            input[type="checkbox"]:disabled + &,
            input[type="radio"]:disabled + & {
                background: ${theme.ref['color-neutral-05']};
                border-color: ${theme.ref['color-neutral-15']};
                color: ${theme.ref['color-neutral-30']};
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
