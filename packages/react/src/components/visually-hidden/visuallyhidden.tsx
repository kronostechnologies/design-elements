import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { hiddenStyle } from './styles/visuallyhidden';

const Hidden = styled.span`
    ${hiddenStyle}
`;

export const VisuallyHidden: FunctionComponent = ({ children }) => (
    <Hidden aria-hidden="false">
        {children}
    </Hidden>
);
