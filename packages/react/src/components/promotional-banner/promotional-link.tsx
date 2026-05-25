import { type FC, type MouseEventHandler, useCallback } from 'react';
import styled from 'styled-components';
import { Link, type LinkProps } from '../link';
import { ProgressIndicator } from '../progress-indicator';
import {
    gradientEnd,
    gradientEndHover,
    gradientEndLoading,
    gradientStart,
    gradientStartHover,
    gradientStartLoading,
} from './colors';

type StyledLinkProps = LinkProps & {
    $loading: boolean;
}

const StyledLoading = styled(ProgressIndicator)`
    margin-right: var(--spacing-1x);
`;

const StyledLink = styled(Link)<StyledLinkProps>`
    background: transparent;
    border: none;
    color: ${({ $loading, theme }) => $loading && theme.alias['color-action-disabled']};
    line-height: normal;
    padding: 2px var(--spacing-2x);
    position: relative;
    z-index: 0;

    ::before {
        background:
            linear-gradient(
                90deg,
                ${({ $loading }) => ($loading ? gradientStartLoading : gradientStart)},
                ${({ $loading }) => ($loading ? gradientEndLoading : gradientEnd)}
            );
        border-radius: var(--border-radius-4x);
        content: '';
        inset: 0;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); /* stylelint-disable-line property-no-vendor-prefix */
        mask-composite: exclude;
        padding: 1px;
        position: absolute;
        z-index: -1;
    }

    :hover::before {
        background:
            linear-gradient(
                90deg,
                ${gradientStartHover},
                ${gradientEndHover}
            );
    }
`;

export interface PromotionalLinkProps {
    href?: string;
    label: string;
    loading?: boolean;

    onClick?(): void;
}

export const PromotionalLink: FC<PromotionalLinkProps> = ({
    href,
    label,
    loading = false,
    onClick,
}) => {
    const icon: LinkProps['icon'] = loading ? undefined : { name: 'equisoft' };

    const handleClick: MouseEventHandler = useCallback((event) => {
        if (!href) {
            event.preventDefault();
        }
        onClick?.();
    }, [href, onClick]);

    return (
        <StyledLink
            button={{ buttonType: 'secondary' }}
            disabled={loading}
            external
            href={href}
            icon={icon}
            onClick={handleClick}
            $loading={loading}
        >
            {loading && <StyledLoading />}
            {label}
        </StyledLink>
    );
};

PromotionalLink.displayName = 'PromotionalLink';
