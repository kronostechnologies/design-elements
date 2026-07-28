import { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';
import type { TabPanelProps, TabSize } from './types';

const StyledDiv = styled.div<{ $size?: TabSize }>`
    border-top: none;

    ${({ theme }) => focus({ theme }, { focusType: 'focus-visible' })}
`;

export const TabPanel: FunctionComponent<PropsWithChildren<TabPanelProps>> = ({
    buttonId,
    children,
    size,
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

TabPanel.displayName = 'TabPanel';
