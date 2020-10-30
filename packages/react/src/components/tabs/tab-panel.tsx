import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import { focus } from '@design-elements/utils/css-state';

interface TabPanelProps {
    children: ReactNode;
}

const StyledDiv = styled.div`
    ${focus}
`;

export function TabPanel({ children }: TabPanelProps): ReactElement {
    return (
        <StyledDiv tabIndex={0}>{children}</StyledDiv>
    );
}
