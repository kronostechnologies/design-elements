import React from 'react';
import styled from 'styled-components';

import styles from './styles/visuallyhidden';

const VisuallyHidden = styled.span`
  ${styles}
`;

export default ({ children }) => (
    <VisuallyHidden aria-hidden="false">
        {children}
    </VisuallyHidden>
);
