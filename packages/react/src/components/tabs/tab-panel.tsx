import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';

interface TabPanelProps {
    buttonId: string,
    children: ReactNode;
    hidden: boolean,
    id: string,
    global?: boolean;
}

const StyledDiv = styled.div<{ $isGlobal?: boolean; }>`
    background: ${({ $isGlobal, theme }) => !$isGlobal && theme.component['tab-panel-background-color']};
    border: ${({ $isGlobal, theme }) => !$isGlobal && `1px solid ${theme.component['tab-panel-border-color']}`};
    border-radius: ${({ $isGlobal }) => !$isGlobal && '0 0 var(--border-radius-2x) var(--border-radius-2x)'};
    border-top: none;

    ${({ theme }) => focus({ theme }, { focusType: 'focus-visible' })}
`;

export const TabPanel: FunctionComponent<PropsWithChildren<TabPanelProps>> = ({
    buttonId,
    children,
    global = false,
    hidden,
    id,
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
