import React, { ReactElement } from 'react';

import { Icon, IconName } from '../icon/icon';
import { StyledLink } from '../route-link/styles/styled-link';

interface ExternalLinkProps {
    disabled?: boolean;
    href?: string;
    iconName?: IconName;
    iconOnly?: boolean;
    label: string;
    target?: string;
    onClick?(): void;
}

export const ExternalLink = ({
    disabled,
    href,
    iconName,
    iconOnly = false,
    label,
    onClick,
    target }: ExternalLinkProps): ReactElement => (
    <StyledLink
        aria-disabled={disabled ? 'true' : 'false'}
        aria-label={label}
        className={`external${iconOnly ? ' iconOnly' : ''}`}
        disabled={disabled}
        href={disabled ? undefined : href ? href : 'javascript:void(0)'}
        onClick={disabled ? undefined : onClick}
        target={target}
    >
        {iconName && <Icon name={iconName} size="16"/>}
        {!iconOnly && label}
    </StyledLink>
);
