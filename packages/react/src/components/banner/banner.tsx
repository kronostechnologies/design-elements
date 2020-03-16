import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

import { Icon, IconName } from '../icon/icon';

type MessageType = 'warning' | 'error';
type DeviceType = 'mobile' | 'desktop';

const Container = styled.div<{messageType: MessageType, device: DeviceType}>`
    background-color: ${props => props.messageType === 'error' ? props.theme.notifications['error-2.1'] : props.theme.notifications['alert-3.3'] };
    color: ${props => props.messageType === 'error' ? props.theme.greys.white : props.theme.greys.black };
    font-size: ${props => props.device === 'desktop' ? 0.75 : 1}rem;
    font-weight: ${props => props.device === 'desktop' ? 600 : 'var(--font-normal)' };
    letter-spacing: ${props => props.device === 'desktop' ? 0.2 : 0.46}px;
    line-height: ${({ device }) => device === 'mobile' ? 1.5 : 1.25}rem;
    padding: ${props => props.device === 'desktop' ? 'var(--spacing-2x) var(--spacing-6x)' : 'var(--spacing-3x) var(--spacing-7x) var(--spacing-3x) var(--spacing-2x)'};
    position: relative;
`;

const Content = styled.div<{device: DeviceType}>`
    display: flex;
    justify-content: ${props => props.device === 'desktop' ? 'center' : ''};

    svg {
        flex-shrink: 0;
        margin-right: var(--spacing-2x);
    }

    p {
        margin: 0;
    }
`;

const CloseButton = styled.button<{device: DeviceType}>`
    appearance: none;
    background: transparent;
    border: 0;
    color: currentColor;
    cursor: pointer;
    height: ${props => props.device === 'desktop' ? 32 : 48}px;
    padding: 0;
    position: absolute;
    right: ${props => props.device === 'desktop' ? '6px' : '0'};
    top: 9px;
    width: ${props => props.device === 'desktop' ? 32 : 48}px;
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
            <CloseButton
                data-testid="closeButton"
                onClick={() => setVisible(false)}
                device={concreteDevice}
                aria-label="Close"
                type="button"
            >
                <Icon name="x" size={device === 'mobile' ? '28' : '20'}/>
            </CloseButton>
            <Content device={concreteDevice}>
                <Icon name={GetIconName(type)} aria-hidden="true" size={device === 'mobile' ? '24' : '20'}/>
                <p>{children}</p>
            </Content>
        </Container>
    ) : null;
};
