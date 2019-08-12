import React from 'react';
import styled from 'styled-components';

import { Children } from '../buttons/abstract-button';
import styles from './styles/visuallyhidden';

const Hidden = styled.span`
  ${styles}
`;

const VisuallyHidden =  ({ children }: {children: Children}) => (
    <Hidden aria-hidden="false">
        {children}
    </Hidden>
);

export { VisuallyHidden };
