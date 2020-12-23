import { useTranslation } from '@design-elements/i18n/use-translation';
import { Theme } from '@design-elements/themes/theme';
import React, { ComponentType, FunctionComponent, ReactElement, ReactNode, useMemo } from 'react';
import styled from 'styled-components';

import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';

type MobileDeviceContextProps = Pick<DeviceContextProps, 'isMobile'>

function abstractContainer(
    bgColor: string,
    color?: keyof Theme['notifications'],
): FunctionComponent<MobileDeviceContextProps> {
    return styled.div<MobileDeviceContextProps>`
        background-color: ${bgColor};
        border: 1px solid ${(props) => (color ? props.theme.notifications[color] : props.theme.main['primary-3'])};
        box-sizing: border-box;
        display: flex;
        padding: ${(props) => (props.isMobile ? 'var(--spacing-3x) var(--spacing-2x)' : 'var(--spacing-2x)')};
        width: 100%;

        svg {
            color: ${(props) => (color ? props.theme.notifications[color] : props.theme.main['primary-3'])};
            flex: 0 0 auto;
        }`;
}

const InfoContainer = abstractContainer('#f5fdff');
const SuccessContainer = abstractContainer('#f7faf4', 'success-1.1');
const AlertContainer = abstractContainer('#fffce9', 'alert-3.1');
const ErrorContainer = abstractContainer('#fdf6f7', 'error-2.1');

const TextWrapper = styled.div<MobileDeviceContextProps>`
    box-sizing: border-box;
    padding-left: var(--spacing-2x);

    p {
        font-size: ${(props) => (props.isMobile ? '1rem' : '0.875rem')};
        line-height: 24px;
        margin: ${(props) => (props.isMobile ? 'var(--spacing-2x)' : 'var(--spacing-1x)')} 0 0 0;
    }
`;

const Heading = styled.span<MobileDeviceContextProps>`
    font-size: ${(props) => (props.isMobile ? '1.125rem' : '1rem')};
    font-weight: var(--font-bold);
`;

type MessageType = 'info' | 'success' | 'alert' | 'error';

interface MessageTypeProps {
    container: ComponentType<{ isMobile: boolean; }>;
    iconName: IconName;
    title: 'Tips' | 'Success' | 'Alert' | 'Error';
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
     */
    children: ReactNode;
    /**
     * Sets custom message title
     */
    title?: string;
    /**
     * Sets message type
     */
    type: MessageType;
}

export function InlineMessage({ children, title, type }: InlineMessageProps): ReactElement {
    const { t } = useTranslation('inline-message');
    const { isMobile } = useDeviceContext();
    const messageType: MessageTypeProps = useMemo(() => handleType(type), [type]);
    const Container = messageType.container;

    return (
        <Container isMobile={isMobile} aria-live={type === 'alert' || type === 'error' ? 'assertive' : 'polite'}>
            <Icon name={messageType.iconName} size={isMobile ? '20' : '16'} />
            <TextWrapper isMobile={isMobile}>
                <Heading isMobile={isMobile}>{title || t(messageType.title)}</Heading>
                <p>{children}</p>
            </TextWrapper>
        </Container>
    );
}
