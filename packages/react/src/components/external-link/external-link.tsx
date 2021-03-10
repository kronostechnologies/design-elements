import React, { MouseEvent, ReactElement, useCallback } from 'react';
import styled from 'styled-components';

import { Icon, IconName } from '../icon/icon';
import { StyledLink } from '../route-link/styles/styled-link';

const ExternalIcon = styled(Icon)`
    margin-left: var(--spacing-half);
    margin-right: 0;
`;

const Link = styled(StyledLink)`
    color: ${({ disabled, theme }) => (disabled ? theme.main['primary-1.2'] : theme.main['primary-1.1'])};

    &:hover {
        ${({ disabled, theme }) => (disabled ? '' : `color: ${theme.main['primary-1.3']};`)}
    }

    &:visited {
        color: #62a; /* TODO change colors when updating thematization */

        svg {
            color: #62a; /* TODO change colors when updating thematization */
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
            {iconName && <Icon aria-hidden="true" name={iconName} size="16" />}
            {label}
            <ExternalIcon name="externalLink" size="16" />
        </Link>
    );
}
