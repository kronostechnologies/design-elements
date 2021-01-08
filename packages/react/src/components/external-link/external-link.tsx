import React, { MouseEvent, ReactElement, useCallback } from 'react';
import styled from 'styled-components';

import { Icon, IconName } from '../icon/icon';
import { StyledLink } from '../route-link/styles/styled-link';

const Link = styled(StyledLink)`
    color: ${({ disabled, theme }) => (disabled ? '#7fbfd2' : theme.main['primary-1.1'])};

    &:hover {
        ${({ disabled }) => (disabled ? '' : 'text-decoration: underline')};
    }

    &:visited {
        color: ${({ theme }) => theme.main['primary-3']};

        svg {
            color: ${({ theme }) => theme.main['primary-3']};
        }
    }
`;

interface ExternalLinkProps {
    className?: string;
    disabled?: boolean;
    href?: string;
    iconName?: IconName;
    label?: string;
    target?: string;

    onClick?(): void;
}

export function ExternalLink({
    className, disabled, href = '', iconName, label, onClick, target,
}: ExternalLinkProps): ReactElement {
    const handleClick: (event: MouseEvent<HTMLAnchorElement>) => void = useCallback((event) => {
        if (!href) {
            event.preventDefault();
        }
        onClick?.();
    }, [href, onClick]);

    return (
        <Link
            aria-disabled={disabled ? 'true' : 'false'}
            className={className}
            disabled={disabled}
            $hasLabel={!!label}
            href={disabled ? undefined : href}
            onClick={disabled ? undefined : handleClick}
            target={target}
            type="external"
        >
            {iconName && <Icon name={iconName} size="16" />}
            {label}
        </Link>
    );
}
