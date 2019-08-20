import React from 'react';
import styled from 'styled-components';

import { Child } from '../buttons/abstract-button';
import { hiddenStyle } from './styles/visuallyhidden';

const Hidden = styled.span`
  ${hiddenStyle}
`;

const VisuallyHidden =  ({ children }: {children: Child}) => (
    <Hidden aria-hidden="false">
        {children}
    </Hidden>
);

export { VisuallyHidden };
