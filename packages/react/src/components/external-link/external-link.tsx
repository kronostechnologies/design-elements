import React, { MouseEvent, ReactElement, useCallback } from 'react';

import { Icon, IconName } from '../icon/icon';
import { StyledLink } from '../route-link/styles/styled-link';

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
        <StyledLink
            aria-disabled={disabled ? 'true' : 'false'}
            className={['external', className, !label && 'iconOnly'].filter(Boolean).join(' ')}
            disabled={disabled}
            href={disabled ? undefined : href}
            onClick={disabled ? undefined : handleClick}
            target={target}
        >
            {iconName && <Icon name={iconName} size="16" />}
            {label}
        </StyledLink>
    );
}
