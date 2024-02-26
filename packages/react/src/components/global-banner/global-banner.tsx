import {
    forwardRef,
    MouseEvent,
    MouseEventHandler,
    PropsWithChildren,
    ReactElement,
    ReactNode,
    Ref,
    SVGProps,
    useCallback,
    useState,
} from 'react';
import styled, { css, SimpleInterpolation, StyledProps } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { Button } from '../buttons/button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';

export type GlobalBannerType = 'alert' | 'warning' | 'info' | 'default';

interface ContainerProps {
    bannerType: GlobalBannerType;
    isMobile: boolean;
}

interface IsMobileProps {
    $isMobile: boolean;
}

function getContainerBackgroundColor({ bannerType, theme }: StyledProps<{ bannerType: GlobalBannerType }>): string {
    switch (bannerType) {
        case 'alert':
            return theme.component['global-banner-alert-background-color'];
        case 'warning':
            return theme.component['global-banner-warning-background-color'];
        case 'info':
            return theme.component['global-banner-info-background-color'];
        case 'default':
            return theme.component['global-banner-default-background-color'];
    }
}

function getContainerColor({ bannerType, theme }: StyledProps<ContainerProps>): string {
    switch (bannerType) {
        case 'alert':
        case 'info':
        case 'default':
            return theme.component['global-banner-default-color'];
        case 'warning':
            return theme.component['global-banner-warning-color'];
    }
}

const Label = styled.strong<{ isMobile: boolean }>`
    display: ${({ isMobile }) => (isMobile ? 'block' : 'inline')};
    font-weight: var(--font-semi-bold);
    ${({ isMobile }) => (isMobile ? css`
        margin-bottom: var(--spacing-half);
` : css`
        margin-right: var(--spacing-1x);
`)}
`;

const Message = styled.span`
    display: inline-block;
`;

const Container = styled.section<ContainerProps>`
    align-items: center;
    background-color: ${getContainerBackgroundColor};
    color: ${getContainerColor};
    display: flex;
    flex-flow: ${({ isMobile }) => (isMobile ? 'column nowrap' : 'row rap')};
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    justify-content: space-between;
    letter-spacing: ${({ isMobile }) => (isMobile ? 0.02875 : 0.0125)}rem;
    line-height: 1.5rem;
    padding: ${({ isMobile }) => (isMobile ? 'var(--spacing-1halfx)' : 'var(--spacing-1x) var(--spacing-2x)')};
    position: relative;
`;

const Content = styled.div<{ isMobile: boolean }>`
    align-items: center;
    align-self: ${({ isMobile }) => (isMobile ? 'flex-start' : null)};
    display: flex;
    justify-content: ${({ isMobile }) => (isMobile ? 'unset' : 'center')};
    padding-left: var(--spacing-4x);
    position: relative;

    > svg {
        flex-shrink: 0;
        height: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
        margin: 0 var(--spacing-1x) 0 calc(-1 * var(--spacing-4x));
        width: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
    }
`;

function getIconPosition(props: IsMobileProps): SimpleInterpolation {
    if (props.$isMobile) {
        return css`
            align-self: flex-start;
`;
    }

    return css`
        align-self: initial;
`;
}

const StyledIcon = styled(Icon)<SVGProps<SVGSVGElement> & IsMobileProps>`
    ${getIconPosition};
`;

const Text = styled.span`
    letter-spacing: 0.015rem;
    margin: 0;
`;

interface ButtonProps {
    bannerType: GlobalBannerType;
}

function getActionButtonHoverColor({ bannerType, theme }: StyledProps<ButtonProps>): string {
    /* TODO change colors when updating thematization */
    switch (bannerType) {
        case 'alert':
            return theme.component['global-banner-action-button-alert-hover-color'];
        case 'warning':
            return theme.component['global-banner-action-button-warning-hover-color'];
        case 'info':
            return theme.component['global-banner-action-button-info-hover-color'];
        case 'default':
            return theme.component['global-banner-action-button-default-hover-color'];
    }
}

const ActionButtonComponent = styled(Button).attrs({ buttonType: 'secondary', inverted: true })<ButtonProps>`
    ${({ bannerType, theme }) => (bannerType === 'warning') && css`
        border-color: ${theme.component['global-banner-action-button-warning-background-color']};
        color: ${theme.component['global-banner-action-button-warning-color']};
`};
    &:hover {
        border-color: ${getActionButtonHoverColor};
        color: ${getActionButtonHoverColor};
    }

    &:focus {
        background-color: ${getContainerBackgroundColor};
        ${({ bannerType, theme }) => bannerType === 'warning' && css`
            color: ${theme.component['global-banner-action-button-warning-color']};
`}
    }
`;

function getTertiaryButtonHoverBackgroundColor({ bannerType, theme }: StyledProps<ButtonProps>): string {
    /* TODO change colors when updating thematization */
    switch (bannerType) {
        case 'alert':
            return theme.component['global-banner-tertiary-button-alert-hover-background-color'];
        case 'warning':
            return theme.component['global-banner-tertiary-button-warning-hover-background-color'];
        case 'info':
            return theme.component['global-banner-tertiary-button-info-hover-background-color'];
        case 'default':
            return theme.component['global-banner-tertiary-button-default-hover-background-color'];
    }
}

function getTertiaryButtonColor({ bannerType, theme }: StyledProps<ButtonProps>): string | null {
    return bannerType === 'warning' ? theme.component['global-banner-tertiary-button-color'] : null;
}

function getTertiaryButtonFocusColor({ bannerType, theme }: StyledProps<ButtonProps>): string | null {
    return bannerType === 'warning' ? theme.component['global-banner-tertiary-button-focus-color'] : null;
}

function getTertiaryButtonHoverColor({ bannerType, theme }: StyledProps<ButtonProps>): string | null {
    return bannerType === 'warning' ? theme.component['global-banner-tertiary-button-hover-color'] : null;
}

const TertiaryButton = styled(Button).attrs({ buttonType: 'tertiary', inverted: true })<PropsWithChildren<ButtonProps>>`
    color: ${(getTertiaryButtonColor)};

    &:focus {
        background-color: ${getContainerBackgroundColor};
        color: ${getTertiaryButtonFocusColor};
    }

    &:hover {
        background-color: ${getTertiaryButtonHoverBackgroundColor};
        color: ${getTertiaryButtonHoverColor};
    }
`;

const ButtonContainer = styled.div<{ isMobile: boolean }>`
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    width: ${({ isMobile }) => (isMobile ? '100%' : 'unset')};

    > button {
        margin-left: ${({ isMobile }) => (isMobile ? '0' : 'var(--spacing-1x)')};
        margin-top: ${({ isMobile }) => (isMobile ? 'var(--spacing-1x)' : '0')};
    }
`;

const getIconName = (bannerType: GlobalBannerType): IconName => {
    switch (bannerType) {
        case 'alert':
            return 'alertOctagon';
        case 'warning':
        case 'default':
            return 'alertTriangle';
        case 'info':
            return 'info';
    }
};

export interface ActionButton {
    label: string;

    onClick(event: MouseEvent<HTMLButtonElement>): void;
}

interface Props {
    actionButton?: ActionButton;
    secondaryActionButton?: ActionButton;
    className?: string;
    children: ReactNode;
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
    dismissable = false,
    label,
    onDismiss,
    secondaryActionButton,
    type = 'default',
}: Props, ref: Ref<HTMLElement>): ReactElement | null => {
    const { isMobile } = useDeviceContext();
    const [visible, setVisible] = useState(!hidden);
    const { t } = useTranslation('global-banner');
    const hasDismissButton = type !== 'alert' && dismissable;
    const hasButtons = hasDismissButton || actionButton || secondaryActionButton;

    const handleDismiss: MouseEventHandler = useCallback(() => {
        onDismiss?.();
        setVisible(false);
    }, [onDismiss]);

    return visible ? (
        <Container
            ref={ref}
            aria-atomic="true"
            aria-live="polite"
            className={className}
            data-testid="container"
            isMobile={isMobile}
            bannerType={type}
            role="status"
        >
            <Content isMobile={isMobile}>
                <StyledIcon
                    aria-label={type}
                    focusable={undefined}
                    $isMobile={isMobile}
                    name={getIconName(type)}
                    role="img"
                    size={isMobile ? '24' : '16'}
                />
                <Text>
                    <Label isMobile={isMobile}>{label}</Label>
                    <Message>{children}</Message>
                </Text>
            </Content>

            {hasButtons && (
                <ButtonContainer isMobile={isMobile}>
                    {actionButton && (
                        <ActionButtonComponent
                            data-testid="action-button"
                            bannerType={type}
                            onClick={actionButton.onClick}
                            type="button"
                        >
                            {actionButton.label}
                        </ActionButtonComponent>
                    )}

                    {secondaryActionButton && (
                        <TertiaryButton
                            data-testid="secondary-action-button"
                            bannerType={type}
                            onClick={secondaryActionButton.onClick}
                            type="button"
                        >
                            {secondaryActionButton.label}
                        </TertiaryButton>
                    )}

                    {hasDismissButton && (
                        <TertiaryButton
                            data-testid="dismiss-button"
                            bannerType={type}
                            onClick={handleDismiss}
                            type="button"
                        >
                            {t('ignore')}
                        </TertiaryButton>
                    )}
                </ButtonContainer>
            )}
        </Container>
    ) : null;
});

GlobalBanner.displayName = 'GlobalBanner';
