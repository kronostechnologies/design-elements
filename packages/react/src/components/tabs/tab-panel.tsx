import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';

interface TabPanelProps {
    id: string,
    buttonId: string,
    hidden: boolean,
    children: ReactNode;
}

const StyledDiv = styled.div`
    ${focus}
`;

export function TabPanel({
    id,
    buttonId,
    hidden,
    children,
}: TabPanelProps): ReactElement {
    return (
        <StyledDiv
            id={id}
            role="tabpanel"
            hidden={hidden}
            aria-hidden={hidden}
            aria-labelledby={buttonId}
            tabIndex={0}
        >
            {children}
        </StyledDiv>
    );
}
