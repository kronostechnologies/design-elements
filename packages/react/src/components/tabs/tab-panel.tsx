import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { focus, focusVisibleReset } from '../../utils/css-state';

interface TabPanelProps {
    buttonId: string,
    children: ReactNode;
    contained?: boolean;
    hidden: boolean,
    id: string,
    global?: boolean;
}

const StyledDiv = styled.div<{ $contained?: boolean; $isGlobal?: boolean; }>`
    border: ${({ $contained, theme }) => ($contained ? `1px solid ${theme.component['tab-panel-border-color']}` : 'none')};
    border-radius: ${({ $isGlobal }) => !$isGlobal && '0 0 var(--border-radius-2x) var(--border-radius-2x)'};
    border-top: none;

    ${focus};
    ${focusVisibleReset};
`;

export const TabPanel: FunctionComponent<PropsWithChildren<TabPanelProps>> = ({
    buttonId,
    children,
    contained,
    hidden,
    id,
    global,
}) => (
    <StyledDiv
        $contained={contained}
        $isGlobal={global}
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
