import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import { focus } from '@design-elements/utils/css-state';

interface TabPanelProps {
    id: string;
    children: ReactNode;
    associatedTabId: string;
    isSelected: boolean;
}

const StyledDiv = styled.div`
    ${focus}
`;

export function TabPanel({ id, children, associatedTabId, isSelected }: TabPanelProps): ReactElement {
    return (
        <StyledDiv
            id={id}
            role="tabpanel"
            aria-labelledby={associatedTabId}
            tabIndex={0}
            aria-hidden={!isSelected}
            hidden={!isSelected}
        >
            {children}
        </StyledDiv>
    );
}
