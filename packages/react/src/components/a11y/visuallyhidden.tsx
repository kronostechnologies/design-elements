import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { hiddenStyle } from './styles/visuallyhidden';

const Hidden = styled.span`
  ${hiddenStyle}
`;

const VisuallyHidden =  ({ children }: {children: ReactNode}) => (
    <Hidden>
        {children}
    </Hidden>
);

export { VisuallyHidden };
