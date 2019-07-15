import styled from 'styled-components';

import enso from '../icons/enso.svg';

export default styled(enso)`
  animation: roll 1s infinite;
  animation-timing-function: linear;
  fill: #e2732d;
  height: 80px;
  width: 83px;

  @keyframes roll {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
