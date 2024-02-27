import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';

interface TabPanelProps {
    buttonId: string,
    children: ReactNode;
    contained?: boolean;
    hidden: boolean,
    id: string,
}

const StyledDiv = styled.div<{ $contained?: boolean }>`
    border: ${({ $contained }) => ($contained ? '1px solid #878F9A' : 'none')}; /* TODO change with next thematization */
    border-top: none;

    ${focus};
`;

export const TabPanel: FunctionComponent<PropsWithChildren<TabPanelProps>> = ({
    buttonId,
    children,
    contained,
    hidden,
    id,
}) => (
    <StyledDiv
        $contained={contained}
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
