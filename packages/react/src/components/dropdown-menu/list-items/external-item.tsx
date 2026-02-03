import { ReactElement } from 'react';
import styled from 'styled-components';
import { focus } from '../../../utils/css-state';
import { useDeviceContext } from '../../device-context-provider';
import { type DeviceContextProps } from '../../device-context-provider/device-context-provider';
import { ExternalLink, type ExternalLinkProps } from '../../external-link';

export interface ExternalItemProps extends ExternalLinkProps {
    label: string;
    href: string;
    disabled?: boolean;
    target?: string;
    onClick?(): void;
}

interface ExternalItemsStyledProps extends ExternalItemProps {
    $device: DeviceContextProps;
}

export const StyledExternalLink = styled(ExternalLink)<ExternalItemsStyledProps>`
    color: ${({ theme }) => theme.component['dropdown-menu-external-item-text-color']};
    display: flex;
    line-height: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? 2.5 : 2)}rem;
    overflow: hidden;
    padding: 0 var(--spacing-2x) 0 var(--spacing-3x);
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;

    ${({ theme }) => focus({ theme }, { insideOnly: true })};

    &:hover {
        background-color: ${({ theme }) => theme.component['dropdown-menu-external-item-hover-background-color']};
    }

    &:visited {
        color: ${({ theme }) => theme.component['dropdown-menu-external-item-visited-text-color']};
        fill: ${({ theme }) => theme.component['dropdown-menu-external-item-visited-icon-color']};

        svg {
            color: ${({ theme }) => theme.component['dropdown-menu-external-item-visited-icon-color']};
            fill: ${({ theme }) => theme.component['dropdown-menu-external-item-visited-icon-color']};
        }
    }

    &[disabled] {
        color: ${({ theme }) => theme.component['dropdown-menu-external-item-disabled-text-color']};
        fill: ${({ theme }) => theme.component['dropdown-menu-external-item-disabled-text-color']};
        pointer-events: none;
    }
`;

export const ExternalItem = ({
    href,
    label,
    disabled,
    target,
    onClick,
}: ExternalItemProps): ReactElement => {
    const device = useDeviceContext();
    return (
        <li onClick={onClick}>
            <StyledExternalLink
                $device={device}
                data-testid={`listitem-${label}`}
                href={href}
                label={label}
                disabled={disabled}
                target={target}
            />
        </li>
    );
};

ExternalItem.displayName = 'ExternalItem';
