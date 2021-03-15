import React, { MouseEvent, ReactElement, useCallback } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

import { Icon, IconName } from '../icon/icon';
import { StyledLink } from '../route-link/styles/styled-link';

const LeftIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

const ExternalIcon = styled(Icon)`
    margin-left: var(--spacing-half);
    margin-right: 0;
`;

const Link = styled(StyledLink)<{isMobile: boolean}>`
    color: ${({ disabled, theme }) => (disabled ? theme.main['primary-1.2'] : theme.main['primary-1.1'])};
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};

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
    className, disabled, href = '', iconName, label, onClick, target = '_blank',
}: ExternalLinkProps): ReactElement {
    const { isMobile } = useDeviceContext();
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
            isMobile={isMobile}
            onClick={disabled ? undefined : handleClick}
            target={target}
            type="external"
        >
            {iconName && <LeftIcon aria-hidden="true" name={iconName} size="16" />}
            {label}
            <ExternalIcon aria-label="open in new window" name="externalLink" role="img" size="16" />
        </Link>
    );
}
