import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';

interface TabPanelProps {
    buttonId: string,
    children: ReactNode;
    contained?: boolean;
    hidden: boolean,
    id: string,
    isGlobal?: boolean;
}

const StyledDiv = styled.div<{ $contained?: boolean; $isGlobal?: boolean; }>`
    border: ${({ $contained }) => ($contained ? '1px solid #DBDEE1' : 'none')}; /* TODO change with next thematization */
    border-radius: ${({ $isGlobal }) => !$isGlobal && '0 0 var(--border-radius-2x) var(--border-radius-2x)'};
    border-top: none;

    ${focus}
`;

export const TabPanel: FunctionComponent<PropsWithChildren<TabPanelProps>> = ({
    buttonId,
    children,
    contained,
    hidden,
    id,
    isGlobal,
}) => (
    <StyledDiv
        $contained={contained}
        $isGlobal={isGlobal}
        aria-hidden={hidden}
        aria-labelledby={buttonId}
        hidden={hidden}
        id={id}
        role="tabpanel"
        tabIndex={0}

    >
        {children}
    </StyledDiv>
);
