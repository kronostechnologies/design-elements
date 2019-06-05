import { Link } from 'react-router-dom';
import styled from 'styled-components';

import abstract from '../styles/abstract';
import primary from '../styles/primary';
import link from '../styles/link';

export default styled(Link)`
  ${abstract}
  ${primary}
  ${link}
`;
