import styled from 'styled-components';
import { equisoftTheme } from '../../../themes/equisoft';

export const Label = styled.label`
    ${(props: {theme?: Theme}) => {
        let theme = props.theme;
        if (theme) {
            if (Object.entries(theme).length === 0 && theme.constructor === Object) {
                theme = equisoftTheme;
            }
        } else {
            theme = equisoftTheme;
        }
        return (`
          align-items: center;
          background: ${theme.greys.white};
          border: 1px solid ${theme.greys.grey};
          border-radius: 0.5rem;
          box-sizing: border-box;
          color: ${theme.greys['dark-grey']};
          cursor: pointer;
          display: flex;
          justify-content: center;
          min-height: 3rem;
          padding: 1rem;
          transition: all 0.25s ease-in-out;

          &:hover {
            background: ${theme.greys.grey};
            border-color: ${theme.greys.grey};
          }

          input[type="checkbox"]:checked + &,
          input[type="radio"]:checked + & {
            background: ${theme.main['primary-1.1']};
            border-color: ${theme.main['primary-1.1']};
            color: ${theme.greys.white};
          }

          input[type="checkbox"]:focus + &,
          input[type="radio"]:focus + & {
            border-color: ${theme.main['primary-1.1']};
          }

          input[type="checkbox"]:disabled + &,
          input[type="radio"]:disabled + & {
            background: ${theme.greys['light-grey']};
            border-color: ${theme.greys.grey};
            color: ${theme.greys['mid-grey']};
            cursor: auto;
          }

          b {
            font-size: 1.5rem;
            font-weight: 400;
          }

          /* For future support of SVG icons in button */
          svg {
            color: inherit;
            height: 3rem;
            width: 3rem;
          }
        `);
    }}
`;
