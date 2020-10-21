import { focus } from '@design-elements/utils/css-state';
import React, { ReactElement, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';

type MessageType = 'warning' | 'error';

const Container = styled.div<{messageType: MessageType, isMobile: boolean}>`
    background-color: ${props => props.messageType === 'error' ? props.theme.notifications['error-2.1'] : props.theme.notifications['alert-3.3'] };
    color: ${props => props.messageType === 'error' ? props.theme.greys.white : props.theme.greys.black };
    font-size: ${({ isMobile }) => isMobile ? 1 : 0.75}rem;
    font-weight: ${({ isMobile }) => isMobile ? 'var(--font-normal)' : 'var(--font-semi-bold)' };
    letter-spacing: ${({ isMobile }) => isMobile ? 0.46 : 0.2}px;
    line-height: ${({ isMobile }) => isMobile ? 1.5 : 1.25}rem;
    padding: ${({ isMobile }) => isMobile ? 'var(--spacing-3x) var(--spacing-7x) var(--spacing-3x) var(--spacing-2x)' : 'var(--spacing-2x) var(--spacing-6x)'};
    position: relative;
`;

const Content = styled.div<{isMobile: boolean}>`
    display: flex;
    justify-content: ${({ isMobile }) => isMobile ? '' : 'center'};

    svg {
        flex-shrink: 0;
        margin-right: var(--spacing-2x);
    }

    p {
        margin: 0;
    }
`;

const CloseButton = styled.button<{isMobile: boolean}>`
    appearance: none;
    background: transparent;
    border: 1px solid transparent;
    color: currentColor;
    cursor: pointer;
    height: ${({ isMobile }) => isMobile ? 48 : 32}px;
    ${focus}
    padding: 0;
    position: absolute;
    right: ${({ isMobile }) => isMobile ? '0' : '6px'};
    top: 9px;
    width: ${({ isMobile }) => isMobile ? 48 : 32}px;

    svg {
        vertical-align: middle;
    }
`;

const GetIconName = (messageType: MessageType): IconName => {
    switch (messageType) {
        case 'error':
            return 'alertOctagon';
        case 'warning':
            return 'alertTriangle';
    }
};

interface BannerProps {
    children: ReactNode;
    type: MessageType;
    /**
     * Hides the component
     * @default false
     */
    hidden?: boolean;
}

export function Banner({ children, type, hidden }: BannerProps): ReactElement | null {
    const { isMobile } = useDeviceContext();
    const [visible, setVisible] = useState(!hidden);

    return visible ? (
        <Container data-testid="container" role="alert" messageType={type} isMobile={isMobile}>
            <CloseButton
                data-testid="closeButton"
                onClick={() => setVisible(false)}
                isMobile={isMobile}
                aria-label="Close"
                type="button"
            >
                <Icon name="x" size={isMobile ? '28' : '20'}/>
            </CloseButton>
            <Content isMobile={isMobile}>
                <Icon name={GetIconName(type)} aria-hidden="true" size={isMobile ? '24' : '20'}/>
                <p>{children}</p>
            </Content>
        </Container>
    ) : null;
}
