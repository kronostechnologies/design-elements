import React from 'react';
import styled from 'styled-components';

import { Child } from '../buttons/abstract-button';
import { styles } from './styles/visuallyhidden';

const Hidden = styled.span`
  ${styles}
`;

const VisuallyHidden =  ({ children }: {children: Child}) => (
    <Hidden>
        {children}
    </Hidden>
);

export { VisuallyHidden };
