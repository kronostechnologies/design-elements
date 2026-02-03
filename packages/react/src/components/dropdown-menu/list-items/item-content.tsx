import { type FC } from 'react';
import styled from 'styled-components';
import { type DeviceContextProps } from '../../device-context-provider/device-context-provider';
import { Icon, type IconName } from '../../icon';
import { Lozenge } from '../../lozenge';

export interface ItemContentProps {
    device: DeviceContextProps;
    smallLabel?: boolean;
    description?: string;
    iconName?: IconName;
    label: string;
    lozenge?: string;
}

const StyledIcon = styled(Icon)`
    align-self: flex-start;
    background-color: ${({ theme }) => theme.component['dropdown-menu-item-content-icon-background-color']};
    border: 1px solid ${({ theme }) => theme.component['dropdown-menu-item-content-icon-border-color']};
    border-radius: var(--border-radius);
    flex-shrink: 0;
    margin: 0 var(--spacing-half) 2px 0;
    padding: var(--spacing-half);
`;

const StyledDiv = styled.div`
    align-items: center;
    display: flex;
    max-width: 100%;
`;

const StyledSpan = styled.span`
    line-height: 1.25rem;
    margin: auto var(--spacing-1x) auto 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Description = styled(StyledSpan)<{ $device: DeviceContextProps }>`
    color: ${({ theme }) => theme.component['dropdown-menu-item-content-description-text-color']};
    flex: 1 0 100%;
    font-size: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? '0.875rem' : '0.75rem')};
    line-height: 1.25rem;
    order: 3;
`;

const StyledLozenge = styled(Lozenge)`
    min-width: fit-content;
`;

interface LabelContainerProps {
    $smallLabel: boolean;
    $device: DeviceContextProps;
}

const getFontSize = ({ $smallLabel, $device: { isTablet, isMobile } }: LabelContainerProps): string => {
    if ($smallLabel) {
        return (isTablet || isMobile) ? '0.875rem' : '0.75rem';
    }
    return (isTablet || isMobile) ? '1rem' : '0.875rem';
};

const LabelContainer = styled.div<{ $smallLabel: boolean, $device: DeviceContextProps }>`
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    font-size: ${getFontSize};
    margin: 0;
    overflow: hidden;
    padding: 0 0 0 var(--spacing-half);
`;

export const ItemContent: FC<ItemContentProps> = ({
    device,
    description,
    iconName,
    label,
    lozenge,
    smallLabel = false,
}) => (
    <>
        { iconName && <StyledIcon aria-hidden="true" size="22" name={iconName} /> }
        <LabelContainer $device={device} $smallLabel={smallLabel}>
            <StyledDiv>
                <StyledSpan>{label}</StyledSpan>
                {lozenge && <StyledLozenge>{lozenge}</StyledLozenge>}
            </StyledDiv>
            { description && <Description $device={device}>{description}</Description> }
        </LabelContainer>
    </>
);

ItemContent.displayName = 'ItemContent';
