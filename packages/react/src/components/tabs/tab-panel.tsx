import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';
import { TabSize } from './tabs';

interface TabPanelProps {
    buttonId: string,
    children: ReactNode;
    hidden: boolean,
    id: string,
    size?: TabSize;
}

const StyledDiv = styled.div<{ $size?: TabSize }>`
    border-top: none;

    ${({ theme }) => focus({ theme }, { focusType: 'focus-visible' })}
`;

export const TabPanel: FunctionComponent<PropsWithChildren<TabPanelProps>> = ({
    buttonId,
    children,
    size = 'default',
    hidden,
    id,
}) => (
    <StyledDiv
        $size={size}
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
