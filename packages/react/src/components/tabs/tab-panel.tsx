import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { focus, focusVisibleReset } from '../../utils/css-state';

interface TabPanelProps {
    buttonId: string,
    children: ReactNode;
    hidden: boolean,
    id: string,
    global?: boolean;
}

const StyledDiv = styled.div<{ $isGlobal?: boolean; }>`
    background: ${({ $isGlobal, theme }) => !$isGlobal && theme.component['tabs-panel-background-color']};
    border: ${({ $isGlobal, theme }) => !$isGlobal && `1px solid ${theme.component['tabs-panel-border-color']}`};
    border-radius: ${({ $isGlobal }) => !$isGlobal && '0 0 var(--border-radius-2x) var(--border-radius-2x)'};
    border-top: none;

    ${focus};
    ${focusVisibleReset};

    &:focus-visible {
        position: relative;
        z-index: 2;
    }
`;

export const TabPanel: FunctionComponent<PropsWithChildren<TabPanelProps>> = ({
    buttonId,
    children,
    hidden,
    id,
    global,
}) => (
    <StyledDiv
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
