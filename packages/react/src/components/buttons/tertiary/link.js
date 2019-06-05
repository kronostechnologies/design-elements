import { Link } from 'react-router-dom';
import styled from 'styled-components';

import abstract from '../styles/abstract';
import tertiary from '../styles/tertiary';
import link from '../styles/link';

export default styled(Link)`
  ${abstract}
  ${tertiary}
  ${link}
`;
