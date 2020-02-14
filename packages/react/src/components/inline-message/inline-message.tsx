import { Theme } from '@design-elements/components/theme-wrapper/theme-wrapper';
import React, { ComponentType, ReactNode, useMemo } from 'react';
import styled from 'styled-components';

import { Icon, IconName } from '../icon/icon';

type MessageType = 'info' | 'success' | 'alert' | 'error';
type DeviceType = 'mobile' | 'desktop';

const abstractContainer = (bgColor: string, color?: keyof Theme['notifications']) => styled.div<{device: DeviceType}>`
    background-color: ${bgColor};
    border: 1px solid ${props => color ? props.theme.notifications[color] : props.theme.main['primary-3']};
    box-sizing: border-box;
    display: flex;
    padding: ${props => props.device === 'mobile' ? 'var(--spacing-3x) var(--spacing-2x)' : 'var(--spacing-2x)'};
    width: 100%;

    svg {
        color: ${props => color ? props.theme.notifications[color] : props.theme.main['primary-3']};
        flex: 0 0 auto;
    }
`;

const InfoContainer = abstractContainer('#f5fdff');
const SuccessContainer = abstractContainer('#f7faf4', 'success-1.1');
const AlertContainer = abstractContainer('#fffce9', 'alert-3.1');
const ErrorContainer = abstractContainer('#fdf6f7', 'error-2.1');

const TextWrapper = styled.div<{device: DeviceType}>`
    box-sizing: border-box;
    padding-left: var(--spacing-2x);

    p {
        font-size: ${props => props.device === 'mobile' ? '1rem' : '0.875rem'};
        line-height: 24px;
        margin: ${props => props.device === 'mobile' ? 'var(--spacing-2x)' : 'var(--spacing-1x)'} 0 0 0;
    }
`;

const Heading = styled.span<{device: DeviceType}>`
    font-size: ${props => props.device === 'mobile' ? '1.125rem' : '1rem'};
    font-weight: var(--font-bold);
`;

interface MessageTypeProps {
    container: ComponentType<{ device: DeviceType; }>;
    iconName: IconName;
    title: string;
}

const handleType = (type: MessageType): MessageTypeProps => {
    switch (type) {
        case 'info':
            return {
                container: InfoContainer,
                iconName: 'star',
                title: 'Tips',
            };
        case 'success':
            return {
                container: SuccessContainer,
                iconName: 'check',
                title: 'Success',
            };
        case 'alert':
            return {
                container: AlertContainer,
                iconName: 'alertTriangle',
                title: 'Alert',
            };
        case 'error':
            return {
                container: ErrorContainer,
                iconName: 'alertOctagon',
                title: 'Error',
            };
    }
};

interface InlineMessageProps {
    /**
     * Sets text message
     **/
    children: ReactNode;
    /**
     * Applies styles and sizes according to the device
     * @default desktop
     */
    device?: DeviceType;
    /**
     * Sets custom message title
     */
    title?: string;
    /**
     * Sets message type
     */
    type: MessageType;
}

export const InlineMessage = ({ children, device = 'desktop', title, type }: InlineMessageProps) => {
    const messageType: MessageTypeProps = useMemo(() => handleType(type), [type]);
    const Container = messageType.container;

    return (
        <Container device={device} aria-live={type === 'alert' || type === 'error' ? 'assertive' : 'polite'}>
            <Icon name={messageType.iconName} size={device === 'mobile' ? '20' : '16'}/>
            <TextWrapper device={device}>
                <Heading device={device}>{title ? title : messageType.title}</Heading>
                <p>{children}</p>
            </TextWrapper>
        </Container>
    );
};
