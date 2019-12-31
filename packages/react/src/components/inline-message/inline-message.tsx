import React, { ReactNode, useMemo } from 'react';
import styled from 'styled-components';

import { Icon, IconName } from '../icon/icon';
import { Theme } from '../theme-wrapper/theme-wrapper';

type MessageType = 'info' | 'success' | 'alert' | 'error';
type DeviceType = 'mobile' | 'desktop';

interface ContainerProps {
    device: DeviceType;
    theme: Theme;
    type: MessageType;
}

const Container = styled.div<ContainerProps>`
  background-color:
    ${(props) => {
        if (props.type === 'info') return '#f5fdff';
        else if (props.type === 'success') return '#f7faf4';
        else if (props.type === 'alert') return '#fffce9';
        else if (props.type === 'error') return '#fdf6f7';
        else return '#f5fdff';
    }};
  border:
    1px solid ${(props) => {
        if (props.type === 'info') return props.theme.main['primary-3'];
        else if (props.type === 'success') return props.theme.notifications['success-1.1'];
        else if (props.type === 'alert') return props.theme.notifications['alert-3.1'];
        else if (props.type === 'error') return props.theme.notifications['error-2.1'];
    }};
  box-sizing: border-box;
  display: flex;
  max-width: 800px;
  min-height: 88px;
  padding: ${props => props.device === 'mobile' ? 'var(--spacing-3x) var(--spacing-2x)' : 'var(--spacing-2x)'};

  svg {
    color:
      ${(props) => {
          if (props.type === 'info') return props.theme.main['primary-3'];
          else if (props.type === 'success') return props.theme.notifications['success-1.1'];
          else if (props.type === 'alert') return props.theme.notifications['alert-3.1'];
          else if (props.type === 'error') return props.theme.notifications['error-2.1'];
      }};
  }
`;

const TextWrapper = styled.div<{device: DeviceType}>`
  box-sizing: border-box;
  max-width: ${props => props.device === 'mobile' ? 'calc(100% - 20px)' : 'calc(100% - 16px)'};
  padding-left: ${props => props.device === 'mobile' ? 'var(--spacing-2x)' : '12px'};

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
    iconName: IconName;
    title: string;
}

const handleType = (type: MessageType): MessageTypeProps => {
    switch (type) {
        case 'info':
            return {
                iconName: 'star',
                title: 'Tips',
            };
        case 'success':
            return {
                iconName: 'check',
                title: 'Success',
            };
        case 'alert':
            return {
                iconName: 'alertTriangle',
                title: 'Alert',
            };
        case 'error':
            return {
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
     * Sets message type
     */
    type: MessageType;
}

export const InlineMessage = ({ children, device = 'desktop', type }: InlineMessageProps) => {
    const messageType: MessageTypeProps = useMemo(() => handleType(type), [type]);

    return (
        <Container device={device} type={type}>
            <Icon name={messageType.iconName} size={device === 'mobile' ? '20' : '16'} focusable={false}/>
            <TextWrapper device={device}>
                <Heading device={device}>{messageType.title}</Heading>
                <p aria-live={type === 'alert' || type === 'error' ? 'assertive' : 'polite'}>{children}</p>
            </TextWrapper>
        </Container>
    );
};
