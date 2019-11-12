import React, { ReactElement } from 'react';

import { Icon, IconName } from '../icon/icon';
import { StyledLink } from '../route-link/styles/styled-link';

interface ExternalLinkProps {
    disabled?: boolean;
    href?: string;
    iconName?: IconName;
    label?: string;
    onClick?(): void;
}

export const ExternalLink = ({ disabled, href, iconName, label, onClick }: ExternalLinkProps): ReactElement => (
    <StyledLink
        disabled={disabled}
        href={disabled ? undefined : href}
        aria-disabled={disabled ? 'true' : 'false'}
        className={`external${label ? '' : ' iconOnly'}`}
        onClick={disabled ? undefined : onClick}
    >
        {iconName && <Icon name={iconName} size="16"/>}
        {label}
    </StyledLink>
);
