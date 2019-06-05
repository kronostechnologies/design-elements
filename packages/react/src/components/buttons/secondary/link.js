import { Link } from 'react-router-dom';
import styled from 'styled-components';

import abstract from '../styles/abstract';
import secondary from '../styles/secondary';
import link from '../styles/link';

export default styled(Link)`
  ${abstract}
  ${secondary}
  ${link}
`;
