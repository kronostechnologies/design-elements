import styled from 'styled-components';

import Enso from '../../icons/enso.svg';
import { equisoftTheme } from '../../themes/equisoft';
import { Theme } from '../theme-wrapper/theme-wrapper';

const EnsoSpinner = styled(Enso)`
  ${(props: {theme: Theme}) => {
      const theme = Object.entries(props.theme).length === 0 ? equisoftTheme : props.theme;
      return `
      animation: roll 1s infinite;
      animation-timing-function: linear;
      fill: ${theme.main['primary-1.1']};
      height: 80px;
      width: 83px;

      @keyframes roll {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
  }}
`;

export { EnsoSpinner };
