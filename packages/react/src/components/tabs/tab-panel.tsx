import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { focus, focusVisibleReset } from '../../utils/css-state';

interface TabPanelProps {
    id: string,
    buttonId: string,
    hidden: boolean,
    children: ReactNode;
}

const StyledDiv = styled.div`
    ${focus}
    ${({ theme }) => focus({ theme }, false, ':focus-visible')}
    ${focusVisibleReset}
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
