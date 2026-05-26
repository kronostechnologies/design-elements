import type { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { equisoftColors } from '../../themes';
import { IconButton } from '../buttons';
import { Logo, type LogoName } from '../logo';
import { Tooltip } from '../tooltip';
import { backgroundGradientEnd, backgroundGradientStart } from './colors';
import { PromotionalButton, type PromotionalButtonProps } from '../promotional-button';

const Banner = styled.div`
    align-items: center;
    align-self: stretch;
    background:
        linear-gradient(
            90deg,
            ${backgroundGradientStart} 0%,
            ${backgroundGradientEnd} 100%
        );
    border: 1px solid #0062961a;
    border-radius: var(--border-radius-2x);
    display: flex;
    gap: var(--spacing-2x);
    padding: var(--spacing-2x) var(--spacing-2x) var(--spacing-2x) var(--spacing-3x);
`;

const Text = styled.div`
    align-items: flex-start;
    align-self: stretch;
    color: ${equisoftColors.text};
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    font-size: ${({ theme }) => theme.alias['text-body-medium-font-size']};
    font-weight: ${({ theme }) => theme.alias['text-body-strong-font-weight']};
    gap: var(--spacing-half);
    letter-spacing: ${({ theme }) => theme.alias['text-body-letter-spacing']};
    line-height: ${({ theme }) => theme.alias['text-heading-xsmall-line-height']};
`;

const Buttons = styled.div`
    align-items: center;
    display: flex;
    gap: var(--spacing-half);
`;

export interface PromotionalBannerProps {
    button: PromotionalButtonProps;
    logo: LogoName;

    onDismiss?(): void;
}

export const PromotionalBanner: FC<PropsWithChildren<PromotionalBannerProps>> = ({
    children,
    button,
    logo,
    onDismiss,
}) => {
    const { t } = useTranslation('promotional-banner');
    return (
        <Banner>
            <Text>
                {logo && <Logo name={logo} />}
                {children}
            </Text>
            <Buttons>
                <PromotionalButton
                    label={button.label}
                    loading={button.loading}
                    loadingLabel={button.loadingLabel}
                    onClick={button.onClick}
                />

                {onDismiss && (
                    <Tooltip
                        desktopPlacement="bottom"
                        label={t('close')}
                    >
                        <IconButton buttonType="tertiary" iconName="x" onClick={onDismiss} />
                    </Tooltip>
                )}
            </Buttons>
        </Banner>
    );
};

PromotionalBanner.displayName = 'PromotionalBanner';
