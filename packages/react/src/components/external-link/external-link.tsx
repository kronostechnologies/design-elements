import React, { ReactElement } from 'react';

import { Icon, IconName } from '../icon/icon';
import { StyledLink } from '../link/styles/styled-link';

interface ExternalLinkProps {
    disabled?: boolean;
    href: string;
    iconName?: IconName;
    label?: string;
}

export const ExternalLink = ({ disabled, href, iconName, label }: ExternalLinkProps): ReactElement => (
    <StyledLink
        disabled={disabled}
        href={disabled ? undefined : href}
        aria-disabled={disabled ? 'true' : 'false'}
        className={'external' + (label && label !== '' ? '' : ' iconOnly')}
    >
        {iconName && <Icon name={iconName} size="16"/>}
        {label}
    </StyledLink>
);
