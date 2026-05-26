import { type FC } from 'react';
import styled from 'styled-components';
import { Button } from '../buttons';
import {
    gradientEnd,
    gradientEndHover,
    gradientEndLoading,
    gradientStart,
    gradientStartHover,
    gradientStartLoading,
} from './colors';

const StyledButton = styled(Button)`
    background: transparent;
    border: none;
    line-height: normal;
    padding: 2px var(--spacing-2x);
    position: relative;
    z-index: 0;

    ::before {
        background:
            linear-gradient(
                90deg,
                ${({ loading }) => (loading ? gradientStartLoading : gradientStart)},
                ${({ loading }) => (loading ? gradientEndLoading : gradientEnd)}
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

export interface PromotionalButtonProps {
    label: string;
    loading?: boolean;
    loadingLabel?: string;

    onClick?(): void;
}

export const PromotionalButton: FC<PromotionalButtonProps> = ({
    label,
    loading = false,
    loadingLabel,
    onClick,
}) => (
    <StyledButton
        buttonType="secondary"
        disabled={loading}
        leftIconName="equisoft"
        loading={loading}
        loadingLabel={loadingLabel}
        onClick={onClick}
        rightIconName="externalLink"
        label={label}
    />
);

PromotionalButton.displayName = 'PromotionalButton';
