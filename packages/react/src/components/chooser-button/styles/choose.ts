import styled from 'styled-components';
import { ResolvedTheme } from '../../../themes/theme';
import { focus } from '../../../utils/css-state';

export const Label = styled.label`
    ${({ theme }: { theme: ResolvedTheme }) => `
            --border-radius: 8px;
            align-items: center;
            background: ${theme.component['chooser-background-color']};
            border: 1px solid ${theme.component['chooser-border-color']};
            border-radius: var(--border-radius);
            box-sizing: border-box;
            color: ${theme.component['chooser-text-color']};
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
                background: ${theme.component['chooser-hover-background-color']};
                border-color: ${theme.component['chooser-hover-border-color']};
                color: ${theme.component['chooser-hover-text-color']};
            }
            input[type="checkbox"]:checked + &,
            input[type="radio"]:checked + & {
                background: ${theme.component['chooser-selected-background-color']};
                border-color: ${theme.component['chooser-selected-border-color']};
                color: ${theme.component['chooser-selected-text-color']};
            }
            ${focus({ theme }, false, ', input[type="checkbox"]:focus + &, input[type="radio"]:focus + &')}
            input[type="checkbox"]:disabled + &,
            input[type="radio"]:disabled + & {
                background: ${theme.component['chooser-disabled-background-color']};
                border-color: ${theme.component['chooser-disabled-background-color']};
                color: ${theme.component['chooser-disabled-background-color']};
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
