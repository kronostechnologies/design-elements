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
    color: ${({ theme }) => theme.ref['color-black']};
    display: flex;
    line-height: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? 2.5 : 2)}rem;
    overflow: hidden;
    padding: 0 var(--spacing-2x) 0 var(--spacing-3x);
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;

    ${(props) => focus(props, undefined, undefined, true)}

    &:hover {
        background-color: ${({ theme }) => theme.ref['color-neutral-15']};
    }

    &:visited {
        color: ${({ theme }) => theme.ref['color-black']};
        fill: ${({ theme }) => theme.ref['color-black']};

        svg {
            color: ${({ theme }) => theme.ref['color-black']};
            fill: ${({ theme }) => theme.ref['color-black']};
        }
    }

    &[disabled] {
        color: ${({ theme }) => theme.ref['color-neutral-30']};
        fill: ${({ theme }) => theme.ref['color-neutral-30']};
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
