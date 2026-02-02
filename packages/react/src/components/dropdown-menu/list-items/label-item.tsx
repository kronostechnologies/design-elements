import { ReactElement } from 'react';
import styled from 'styled-components';
import { DeviceContextProps, useDeviceContext } from '../../device-context-provider/device-context-provider';
import { IconName } from '../../icon/icon';
import { ItemContent } from './item-content';

interface LabelItemProps {
    description?: string;
    iconName?: IconName;
    label: string;
}

interface LabelContainerStyledProps {
    $device: DeviceContextProps;
}

export const StyledListItem = styled.li<LabelContainerStyledProps>`
    color: ${({ theme }) => theme.component['dropdown-menu-list-item-text-color']};
    display: block;
    font-size: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? '1rem' : '0.875rem')};
    line-height: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? 2.5 : 2)}rem;
    overflow: hidden;
    padding: var(--spacing-1x) var(--spacing-2x);
    text-decoration: none;
    white-space: nowrap;
`;

export const LabelItem = ({
    description,
    iconName,
    label,
}: LabelItemProps): ReactElement => {
    const device = useDeviceContext();
    return (
        <StyledListItem $device={device}>
            <ItemContent
                device={device}
                label={label}
                description={description}
                iconName={iconName}
                smallLabel
            />
        </StyledListItem>
    );
};

LabelItem.displayName = 'LabelItem';
