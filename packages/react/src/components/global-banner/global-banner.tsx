import {
    forwardRef,
    MouseEvent,
    MouseEventHandler,
    ReactElement,
    ReactNode,
    Ref,
    SVGProps,
    useCallback,
    useState,
} from 'react';
import styled, { css, FlattenSimpleInterpolation, StyledProps } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { Button } from '../buttons/button';
import { useId } from '../../hooks/use-id';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';

export type GlobalBannerType = 'neutral' | 'discovery' | 'warning' | 'alert';

interface ContainerProps {
    bannerType: GlobalBannerType;
    isMobile: boolean;
}

interface IsMobileProps {
    $isMobile: boolean;
}

function getGlobalBannerContainerColors(
    { bannerType, theme }: StyledProps<ContainerProps>,
): FlattenSimpleInterpolation {
    return css`
        background-color: ${theme.component[`global-banner-${bannerType}-background-color`]};
        color: ${theme.component[`global-banner-${bannerType}-text-color`]};
    `;
}

const Container = styled.section<ContainerProps>`
    align-items: center;
    ${getGlobalBannerContainerColors};
    display: flex;
    flex-flow: ${({ isMobile }) => (isMobile ? 'column nowrap' : 'row rap')};
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    justify-content: space-between;
    letter-spacing: ${({ isMobile }) => (isMobile ? 0.02875 : 0.0125)}rem;
    line-height: 1.5rem;
    padding: ${({ isMobile }) => (isMobile ? 'var(--spacing-1halfx)' : 'var(--spacing-1halfx) var(--spacing-2x)')};
    position: relative;
`;

const Content = styled.div<IsMobileProps>`
    align-items: center;
    align-self: ${({ $isMobile }) => ($isMobile ? 'flex-start' : null)};
    display: flex;
    justify-content: ${({ $isMobile }) => ($isMobile ? 'unset' : 'center')};
    padding-left: var(--spacing-4x);
    position: relative;
`;

const StyledIcon = styled(Icon)<SVGProps<SVGSVGElement> & IsMobileProps>`
    align-self: flex-start;
    flex-shrink: 0;
    height: ${({ $isMobile }) => ($isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
    margin: var(--spacing-half) var(--spacing-1halfx) 0 calc(-1 * var(--spacing-4x));
    width: ${({ $isMobile }) => ($isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
`;

const Title = styled.strong<IsMobileProps>`
    display: block;
    font-size: 1rem;
    font-weight: var(--font-semi-bold);
    margin-bottom: ${({ $isMobile }) => $isMobile && 'var(--spacing-half)'};
`;

const getIconName = (bannerType: GlobalBannerType): IconName => {
    switch (bannerType) {
        case 'alert':
            return 'alertOctagon';
        case 'warning':
            return 'alertTriangle';
        case 'discovery':
            return 'lightbulb';
        case 'neutral':
        default:
            return 'info';
    }
};

const ButtonContainer = styled.div<IsMobileProps>`
    display: flex;
    flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
    width: ${({ $isMobile }) => ($isMobile ? '100%' : 'unset')};

    > button {
        margin-left: ${({ $isMobile }) => ($isMobile ? '0' : 'var(--spacing-1x)')};
        margin-top: ${({ $isMobile }) => ($isMobile ? 'var(--spacing-1x)' : '0')};
    }
`;

type GlobalBannerButtonState = 'default' | 'hover';

interface ActionButtonProps {
    bannerType: GlobalBannerType;
}

export interface ActionButton {
    label: string;

    onClick(event: MouseEvent<HTMLButtonElement>): void;
}

function getActionButtonColors(
    { bannerType, theme }: StyledProps<ActionButtonProps>,
    state: GlobalBannerButtonState,
): FlattenSimpleInterpolation {
    const statePrefix = state === 'hover' ? '-hover' : '';
    return css`
        border-color: ${theme.component[`global-banner-${bannerType}-action-button${statePrefix}-border-color`]};
        color: ${theme.component[`global-banner-${bannerType}-action-button${statePrefix}-text-color`]};
    `;
}

const ActionButton = styled(Button).attrs(
    { buttonType: 'secondary', inverted: true },
)<ActionButtonProps>`
    ${(props) => getActionButtonColors(props, 'default')};

    &:hover {
        ${(props) => getActionButtonColors(props, 'hover')};
    }
`;

const StyledButton = styled(Button)<{ bannerType: GlobalBannerType }>`
    ${({ bannerType, theme }) => (
        bannerType === 'warning' ? `color: ${theme.component['global-banner-warning-action-button-text-color']};` : ''
    )};
`;

interface GlobalBannerProps {
    actionButton?: ActionButton;
    secondaryActionButton?: ActionButton;
    className?: string;
    children: ReactNode;
    id?: string;
    hidden?: boolean;
    /**
     * Adds an ignore-button. Note that alert type banners are not dismissable.
     */
    dismissable?: boolean;
    label: string;
    onDismiss?(): void;
    type?: GlobalBannerType;
}

export const GlobalBanner = forwardRef(({
    actionButton,
    children,
    className,
    hidden,
    id: providedId,
    dismissable = false,
    label,
    onDismiss,
    secondaryActionButton,
    type = 'neutral',
}: GlobalBannerProps, ref: Ref<HTMLElement>): ReactElement | null => {
    const { isMobile } = useDeviceContext();
    const [visible, setVisible] = useState(!hidden);
    const { t } = useTranslation('global-banner');
    const hasDismissButton = type !== 'alert' && dismissable;
    const hasButtons = hasDismissButton || actionButton || secondaryActionButton;
    const id = useId(providedId);
    const titleId = `${id}_title`;

    const handleDismiss: MouseEventHandler = useCallback(() => {
        onDismiss?.();
        setVisible(false);
    }, [onDismiss]);

    return visible ? (
        <Container
            ref={ref}
            aria-atomic="true"
            aria-labelledby={titleId}
            aria-live="polite"
            className={className}
            data-testid="container"
            isMobile={isMobile}
            bannerType={type}
            role="status"
        >
            <Content $isMobile={isMobile}>
                <StyledIcon
                    aria-label={type}
                    focusable={undefined}
                    $isMobile={isMobile}
                    name={getIconName(type)}
                    role="img"
                    size={isMobile ? '24' : '16'}
                />
                <span>
                    <Title $isMobile={isMobile} id={titleId}>{label}</Title>
                    {children}
                </span>
            </Content>

            {hasButtons && (
                <ButtonContainer $isMobile={isMobile}>
                    {actionButton && (
                        <ActionButton
                            data-testid="action-button"
                            bannerType={type}
                            onClick={actionButton.onClick}
                            type="button"
                        >
                            {actionButton.label}
                        </ActionButton>
                    )}

                    {secondaryActionButton && (
                        <StyledButton
                            data-testid="secondary-action-button"
                            buttonType="tertiary"
                            bannerType={type}
                            inverted={type !== 'warning'}
                            onClick={secondaryActionButton.onClick}
                            type="button"
                        >
                            {secondaryActionButton.label}
                        </StyledButton>
                    )}

                    {hasDismissButton && (
                        <StyledButton
                            data-testid="dismiss-button"
                            buttonType="tertiary"
                            bannerType={type}
                            inverted={type !== 'warning'}
                            onClick={handleDismiss}
                            type="button"
                        >
                            {t('ignore')}
                        </StyledButton>
                    )}
                </ButtonContainer>
            )}
        </Container>
    ) : null;
});

GlobalBanner.displayName = 'GlobalBanner';
