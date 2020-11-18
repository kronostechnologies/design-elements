import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import { focus } from '@design-elements/utils/css-state';

interface TabPanelProps {
    id: string,
    buttonId: string,
    children: ReactNode;
}

const StyledDiv = styled.div`
    ${focus}
`;

export function TabPanel({ id, buttonId, children }: TabPanelProps): ReactElement {
    return (
        <StyledDiv id={id} role="tabpanel" aria-labelledby={buttonId} tabIndex={0}>{children}</StyledDiv>
    );
}
