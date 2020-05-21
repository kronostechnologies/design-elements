import React, { ReactElement } from 'react';

import { Icon, IconName } from '../icon/icon';
import { StyledLink } from '../route-link/styles/styled-link';

interface ExternalLinkProps {
    disabled?: boolean;
    href?: string;
    iconName?: IconName;
    label?: string;
    target?: string;
    onClick?(): void;
}

export function ExternalLink({ disabled, href, iconName, label, onClick, target }: ExternalLinkProps): ReactElement {
    return (
        <StyledLink
            aria-disabled={disabled ? 'true' : 'false'}
            className={`external${label ? '' : ' iconOnly'}`}
            disabled={disabled}
            href={disabled ? undefined : href ? href : 'javascript:void(0)'}
            onClick={disabled ? undefined : onClick}
            target={target}
        >
            {iconName && <Icon name={iconName} size="16"/>}
            {label}
        </StyledLink>
    );
}
