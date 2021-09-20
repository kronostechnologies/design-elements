import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { DeviceContextProps, useDeviceContext } from '../../device-context-provider/device-context-provider';
import { ExternalLink, ExternalLinkProps } from '../../external-link/external-link';

export interface ExternalItemProps extends ExternalLinkProps {
    id: string;
    href: string;
}

interface ExternalItemsStyledProps extends ExternalItemProps {
    $device: DeviceContextProps;
}

export const StyledExternalLink = styled(ExternalLink)<ExternalItemsStyledProps>`
    color: ${({ theme }) => theme.greys.black};
    display: block;
    line-height: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? 2.5 : 2)}rem;
    overflow: hidden;
    padding: 0 var(--spacing-2x) 0 var(--spacing-3x);
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-border-box-shadow-inset']};
        outline: none;
    }

    :hover {
        background-color: ${({ theme }) => theme.greys.grey};
    }
`;

export const ExternalItem = ({
    id,
    href,
    label,
}: ExternalItemProps): ReactElement => {
    const device = useDeviceContext();
    return (
        <li key={id}>
            <StyledExternalLink
                id={id}
                $device={device}
                href={href}
                label={label}
            />
        </li>
    );
};
