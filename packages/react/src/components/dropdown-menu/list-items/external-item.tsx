import { ReactElement } from 'react';
import styled from 'styled-components';
import { focus } from '../../../utils/css-state';
import { DeviceContextProps, useDeviceContext } from '../../device-context-provider/device-context-provider';
import { ExternalLink, ExternalLinkProps } from '../../external-link/external-link';

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

    ${(props) => focus(props, undefined, undefined, true)}

    &:hover {
        background-color: ${({ theme }) => theme.component['dropdown-menu-external-item-hover-background-color']};
    }

    &:visited {
        color: ${({ theme }) => theme.component['dropdown-menu-external-item-visited-text-color']};
        fill: ${({ theme }) => theme.component['dropdown-menu-external-item-visited-fill-color']};

        svg {
            color: ${({ theme }) => theme.component['dropdown-menu-external-item-svg-visited-text-color']};
            fill: ${({ theme }) => theme.component['dropdown-menu-external-item-svg-visited-fill-color']};
        }
    }

    &[disabled] {
        color: ${({ theme }) => theme.component['dropdown-menu-external-item-disabled-text-color']};
        fill: ${({ theme }) => theme.component['dropdown-menu-external-item-disabled-fill-color']};
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
