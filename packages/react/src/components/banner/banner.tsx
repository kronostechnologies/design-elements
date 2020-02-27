import React, { ComponentType, ReactNode, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Icon, IconName } from '../icon/icon';
import { VisuallyHidden } from '../visually-hidden/visuallyhidden';

type MessageType = 'warning' | 'error';
type DeviceType = 'mobile' | 'desktop';

const abstractBanner = (bgColor: string, color: (props: any) => string, deviceType: DeviceType) => styled.div`
    background-color: ${props => props.theme.notifications[bgColor] };

    svg {
        color: ${color};
    }

    color: ${color};
    display: flex;
    font-size: ${deviceType === 'desktop' ? 0.75 : 1}rem;
    font-weight: ${deviceType === 'desktop' ? 600 : 400 };
    letter-spacing: ${deviceType === 'desktop' ? 0.2 : 0.46};
    line-height: ${deviceType === 'desktop' ? 14 : 24}px;
    padding: var(--spacing-1x) 0 var(--spacing-1x) 0;
    width: 100%;
`;

const BannerContent = styled.div<{device: DeviceType}>`
    display: flex;
    flex-grow: 1;
    justify-content: center;

    svg {
        flex-shrink: 0;
        margin: ${props => props.device === 'desktop' ? '7' : '14'}px 1em 0 1em;
    }
`;

const CloseButton = styled.button<{device: DeviceType}>`
    appearance: none;
    background: transparent;
    border: 0;
    cursor: pointer;
    height: 24px;
    margin: ${props => props.device === 'desktop' ? '7' : '14'}px 1em auto 1em;
    order: 2;
    padding: 0;

    input:valid + & {
        display: inline-block;
    }
`;

interface BannerTypeProps {
    container: ComponentType;
    iconName: IconName;
}

const BuildBannerType = (messageType: MessageType, deviceType: DeviceType): BannerTypeProps => {
    if (messageType === 'error') {
        return {
            container: abstractBanner('error-2.1', (props: any) => props.theme.greys.white, deviceType),
            iconName: 'alertOctagon',
        };
    }
    if (deviceType === 'mobile') {
        return {
            container: abstractBanner('alert-3.3', (props: any) => props.theme.greys.black, deviceType),
            iconName: 'alertTriangle',
        };
    } else {
        return {
            container: abstractBanner('alert-3.2', (props: any) => props.theme.notifications['alert-3.1'], deviceType),
            iconName: 'alertTriangle',
        };
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
    const concreteDevice = device ? device : 'desktop';
    const typeProps = useMemo(() => BuildBannerType(type, concreteDevice), [type]);
    const Container = typeProps.container;
    const [visible, setVisible] = useState(!hidden);

    return visible ? (
        <Container data-testid="container">
            <BannerContent device={concreteDevice}>
                <Icon name={typeProps.iconName} size="24"/>
                <p>{children}</p>
            </BannerContent>
            <CloseButton data-testid="closeButton" onClick={() => setVisible(false)} device={concreteDevice}>
                <Icon name="x" size="24"/>
                <VisuallyHidden>Close</VisuallyHidden>
            </CloseButton>
        </Container>
    ) : null;
};
