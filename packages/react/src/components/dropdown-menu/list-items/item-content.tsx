import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { DeviceContextProps } from '../../device-context-provider/device-context-provider';
import { Icon, IconName } from '../../icon/icon';

export interface ItemContentProps {
    device: DeviceContextProps;
    description?: string;
    iconName?: IconName;
    label: string;
}

interface LabelContainerStyledProps {
    $device: DeviceContextProps;
}

const IconContainer = styled.span`
    background-color: ${({ theme }) => theme.greys['light-grey']};
    border: 1px solid ${({ theme }) => theme.greys.grey};
    border-radius: var(--border-radius);
    float: left;
    height: 38px;
    text-align: center;
    width: 38px;
    
    svg {
        vertical-align: bottom;
    }
`;

const LabelContainer = styled.span<LabelContainerStyledProps>`
    display: flex;
    flex-direction: column;
    font-size: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? '1rem' : '0.875rem')};
    height: 100%;
    line-height: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? 2.5 : 2)}rem;
    margin: 0;
    padding: 0;

    span {
        line-height: 1.25rem;
        margin: auto 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    span:nth-of-type(2) {
        color: ${({ theme }) => theme.greys['dark-grey']};
        font-size: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? '0.875rem' : '0.75rem')};
    }
`;

export const ItemContent = ({
    device,
    description,
    iconName,
    label,
}: ItemContentProps): ReactElement => {
    return (
        <>
            { iconName && <IconContainer><Icon name={iconName} /></IconContainer> }
            <LabelContainer $device={device}>
                <span>{label}</span>
                { description && <span>{description}</span> }
            </LabelContainer>
        </>
    );
};
