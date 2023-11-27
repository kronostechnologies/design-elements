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
            return theme.ref['color-alert-50'];
        case 'warning':
            return theme.ref['color-warning-50'];
        case 'info':
            return theme.ref['color-discovery-50'];
        case 'default':
            return theme.ref['color-neutral-65'];
    }
}

function getContainerColor({ bannerType, theme }: StyledProps<ContainerProps>): string {
    switch (bannerType) {
        case 'alert':
        case 'info':
        case 'default':
            return theme.ref['color-white'];
        case 'warning':
            return theme.ref['color-black'];
    }
}

const Label = styled.b<{ isMobile: boolean }>`
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
            return theme.ref['color-alert-20'];
        case 'warning':
            return theme.ref['color-warning-70'];
        case 'info':
            return theme.ref['color-discovery-20'];
        case 'default':
            return theme.ref['color-neutral-30'];
    }
}

const ActionButtonComponent = styled(Button).attrs({ buttonType: 'secondary', inverted: true })<ButtonProps>`
    /* stylelint-disable-next-line declaration-colon-newline-after */
    ${({ bannerType, theme }) => (bannerType === 'warning') && css`
        border-color: ${theme.ref['color-black']};
        color: ${theme.ref['color-black']};
    `};

    &:hover {
        border-color: ${getActionButtonHoverColor};
        color: ${getActionButtonHoverColor};
    }

    &:focus {
        background-color: ${getContainerBackgroundColor};
        ${({ bannerType, theme }) => bannerType === 'warning' && css`
            color: ${theme.ref['color-black']};
        `}
    }
`;

function getTertiaryButtonHoverBackgroundColor({ bannerType, theme }: StyledProps<ButtonProps>): string {
    /* TODO change colors when updating thematization */
    switch (bannerType) {
        case 'alert':
            return theme.ref['color-alert-70'];
        case 'warning':
            return theme.ref['color-warning-70'];
        case 'info':
            return theme.ref['color-discovery-70'];
        case 'default':
            return theme.ref['color-neutral-50'];
    }
}

const TertiaryButton = styled(Button).attrs({ buttonType: 'tertiary', inverted: true })<PropsWithChildren<ButtonProps>>`
    color: ${({ bannerType, theme }) => bannerType === 'warning' && theme.ref['color-black']};

    &:focus {
        background-color: ${getContainerBackgroundColor};
        color: ${({ bannerType, theme }) => bannerType === 'warning' && theme.ref['color-black']};
    }

    &:hover {
        background-color: ${getTertiaryButtonHoverBackgroundColor};
        color: ${({ bannerType, theme }) => bannerType === 'warning' && theme.ref['color-white']};
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
