import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

import { Icon, IconName } from '../icon/icon';

type MessageType = 'warning' | 'error';
type DeviceType = 'mobile' | 'desktop';

const Container = styled.div<{messageType: MessageType, device: DeviceType}>`
    background-color: ${props => props.messageType === 'error' ? props.theme.notifications['error-2.1'] : props.theme.notifications['alert-3.3'] };

    svg {
        color: ${props => props.messageType === 'error' ? props.theme.greys.white : props.theme.greys.black };
    }

    color: ${props => props.messageType === 'error' ? props.theme.greys.white : props.theme.greys.black };
    display: flex;
    font-size: ${props => props.device === 'desktop' ? 0.75 : 1}rem;
    font-weight: ${props => props.device === 'desktop' ? 600 : 'var(--font-normal)' };
    letter-spacing: ${props => props.device === 'desktop' ? 0.2 : 0.46}px;
    line-height: 1.25rem;
    padding: ${props => props.device === 'desktop' ? 'var(--spacing-2x)' : 'var(--spacing-3x) var(--spacing-2x)'};
    width: 100%;
`;

const Content = styled.div<{device: DeviceType}>`
    display: flex;
    flex-grow: 1;
    justify-content: center;

    svg {
        flex-shrink: 0;
        margin-right: var(--spacing-2x);
    }

    p {
        align-self: center;
        margin: 0;
    }
`;

const CloseButton = styled.button`
    appearance: none;
    background: transparent;
    border: 0;
    cursor: pointer;
    height: 24px;
    margin-left: var(--spacing-2x);
    padding: 0;
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
     * Applies styles and sizes according to the device
     * @default desktop
     */
    device?: DeviceType;
    /**
     * Hides the component
     * @default false
     */
    hidden?: boolean;
}

export const Banner = ({ children, type, device, hidden }: BannerProps) => {
    const concreteDevice = device || 'desktop';
    const [visible, setVisible] = useState(!hidden);

    return visible ? (
        <Container data-testid="container" role="alert" messageType={type} device={concreteDevice}>
            <Content device={concreteDevice}>
                <Icon name={GetIconName(type)} aria-hidden="true"/>
                <p>{children}</p>
            </Content>
            <CloseButton data-testid="closeButton" onClick={() => setVisible(false)} aria-label="Close">
                <Icon name="x" size={device === 'mobile' ? '20' : '16'}/>
            </CloseButton>
        </Container>
    ) : null;
};
