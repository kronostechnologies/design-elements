import styled from 'styled-components';

export const Label = styled.label`
    ${props => {
        return `
            --border-radius: 8px;

            align-items: center;
            background: ${props.theme.greys.white};
            border: 1px solid ${props.theme.greys['dark-grey']};
            border-radius: var(--border-radius);
            box-sizing: border-box;
            color: ${props.theme.greys['dark-grey']};
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
                background: ${props.theme.greys.grey};
                border-color: ${props.theme.greys.grey};
            }

            input[type="checkbox"]:checked + &,
            input[type="radio"]:checked + & {
                background: ${props.theme.main['primary-1.1']};
                border-color: ${props.theme.main['primary-1.1']};
                color: ${props.theme.greys.white};
            }

            input[type="checkbox"]:focus + &,
            input[type="radio"]:focus + & {
                border-color: ${props.theme.main['primary-1.1']};
            }

            input[type="checkbox"]:disabled + &,
            input[type="radio"]:disabled + & {
                background: ${props.theme.greys['light-grey']};
                border-color: ${props.theme.greys.grey};
                color: ${props.theme.greys['mid-grey']};
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
        `;
    }}
`;
