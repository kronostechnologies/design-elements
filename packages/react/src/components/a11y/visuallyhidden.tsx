import React from 'react';
import styled from 'styled-components';

import styles from './styles/visuallyhidden';

const Hidden = styled.span`
  ${styles}
`;

const VisuallyHidden =  ({ children }: {children: any}) => (
    <Hidden aria-hidden="false">
        {children}
    </Hidden>
);

export { VisuallyHidden };
