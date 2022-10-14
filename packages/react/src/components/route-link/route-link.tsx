import { MouseEvent, VoidFunctionComponent } from 'react';

import { NavLink, Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';
import { StyledLink } from './styles/styled-link';

const Link = styled(StyledLink)<{ $isMobile: boolean, $hasLabel: boolean }>`
    color: ${({ disabled, theme }) => (disabled ? theme.main['primary-1.2'] : theme.main['primary-1.1'])};
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};

    svg {
        margin-right: ${({ $hasLabel }) => ($hasLabel ? 'var(--spacing-1x)' : '0')};
    }

    &:hover {
        ${({ disabled, theme }) => (disabled ? '' : `color: ${theme.main['primary-1.3']};`)};
    }

    &:visited {
        ${({ disabled }) => (disabled ? '' : 'color: #62a;')};

        svg {
            ${({ disabled }) => (disabled ? '' : 'color: #62a;')}
        }
    }

    &[disabled] {
        pointer-events: none;
    }
`;

interface LinkProps {
    className?: string;
    disabled?: boolean;
    end?: boolean;
    href: string;
    iconName?: IconName;
    label?: string;
    routerLink: typeof NavLink | typeof ReactRouterLink;

    onClick?(event: MouseEvent<HTMLAnchorElement>): void;
}

export const RouteLink: VoidFunctionComponent<LinkProps> = ({
    className,
    disabled,
    end,
    href,
    iconName,
    label,
    routerLink,
    onClick,
}) => {
    const { isMobile } = useDeviceContext();

    return (
        <Link
            aria-disabled={disabled}
            as={routerLink}
            className={className}
            disabled={disabled}
            end={end}
            $hasLabel={!!label}
            $isMobile={isMobile}
            tabIndex={disabled ? -1 : 0}
            to={href}
            type="route"
            onClick={onClick}
        >
            {iconName && <Icon aria-hidden="true" name={iconName} size="16" />}
            {label}
        </Link>
    );
};
