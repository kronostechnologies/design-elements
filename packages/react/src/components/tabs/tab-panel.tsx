import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { focus, focusVisibleReset } from '../../utils/css-state';

interface TabPanelProps {
    buttonId: string,
    children: ReactNode;
    contained?: boolean;
    hidden: boolean,
    id: string,
}

const StyledDiv = styled.div<{ $contained?: boolean }>`
    border: ${({ $contained, theme }) => ($contained ? `1px solid ${theme.component['tab-panel-border-color']}` : 'none')};
    border-top: none;

    ${focus}
    ${({ theme }) => focus({ theme }, false, ':focus-visible')}
    ${focusVisibleReset}
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
