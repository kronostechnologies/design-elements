import React, { ComponentProps, ComponentType, FunctionComponent, useMemo, VoidFunctionComponent } from 'react';
import styled, { css, ThemedCssFunction } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { Theme } from '../../themes';
import { Button } from '../buttons/button';
import { IconButton } from '../buttons/icon-button';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';

type MobileDeviceContext = Pick<DeviceContextProps, 'isMobile'>
type MessageType = 'info' | 'success' | 'warning' | 'alert';
type Role = 'status' | 'alert';
type Live = 'polite' | 'assertive';

interface AbstractContainerProps extends MobileDeviceContext {
    className?: string;
    role: Role;
}

function getLineHeight(isMobile: boolean): number {
    return isMobile ? 28 : 24;
}

const BannerIcon = styled(Icon)<ComponentProps<typeof Icon> & { $marginTop: number }>`
    grid-area: icon;
    margin-top: ${({ $marginTop }) => `${$marginTop}px`};
`;

function getLayout({ isMobile }: AbstractContainerProps): ReturnType<ThemedCssFunction<Theme>> {
    if (isMobile) {
        return css`
            display: grid;
            grid-template-areas:
                "icon content"
                "button button";
            grid-template-columns: auto 1fr;`;
    }
    return css`
        display: flex;`;
}

function abstractContainer(
    bgColor: string,
    color?: keyof Theme['notifications'],
    iconColor: keyof Theme['notifications'] | undefined = color,
): FunctionComponent<AbstractContainerProps> {
    return styled.div<AbstractContainerProps>`
        background-color: ${bgColor};
        border: 1px solid ${(props) => (color ? props.theme.notifications[color] : props.theme.main['primary-3'])};
        box-sizing: border-box;
        line-height: ${({ isMobile }) => getLineHeight(isMobile)}px;
        padding: ${(props) => (props.isMobile ? 'var(--spacing-3x) var(--spacing-2x)' : 'var(--spacing-2x)')};
        position: relative;
        width: 100%;

        ${getLayout};

        ${BannerIcon} {
            color: ${(props) => (iconColor ? props.theme.notifications[iconColor] : props.theme.main['primary-3'])};
            flex: 0 0 auto;
        }`;
}

const InfoContainer = abstractContainer('#f9f7fb', 'info-1.1');
const SuccessContainer = abstractContainer('#f6fbf8', 'success-1.1');
const WarningContainer = abstractContainer('#fffbf5', 'warning-3.1', 'warning-3.4');
const AlertContainer = abstractContainer('#fdf6f7', 'alert-2.1');

const TextWrapper = styled.div<MobileDeviceContext>`
    box-sizing: border-box;
    grid-area: content;
    padding-left: var(--spacing-2x);

    > p {
        font-size: ${(props) => (props.isMobile ? '1rem' : '0.875rem')};
        margin: ${(props) => (props.isMobile ? 'var(--spacing-2x)' : 'var(--spacing-1x)')} 0 0 0;
    }
`;

type DismissButtonProps = MobileDeviceContext & { $marginTop: number }

function getDismissButtonRight({ isMobile }: DismissButtonProps): string {
    return isMobile ? 'var(--spacing-half)' : 'var(--spacing-1x)';
}

function getDismissButtonTop({ $marginTop }: DismissButtonProps): string {
    return `calc(var(--spacing-2x) - ${2 * $marginTop}px)`;
}

const DismissIconButton = styled(IconButton)
    .attrs({ buttonType: 'tertiary', iconName: 'x' })<DismissButtonProps>`
    position: absolute;
    right: ${getDismissButtonRight};
    top: ${getDismissButtonTop};
`;

const Heading = styled.span<MobileDeviceContext>`
    font-size: ${(props) => (props.isMobile ? '1.125rem' : '1rem')};
    font-weight: var(--font-bold);
`;

const StyledActionButton = styled(Button)`
    grid-area: button;
    margin-top: var(--spacing-2x);
`;

type ActionButtonProps = {
    label: string;
    isErrorType: boolean;
    onClick?(): void;
}

const ActionButton: VoidFunctionComponent<ActionButtonProps> = ({
    label,
    isErrorType,
    onClick,
}) => (
    <StyledActionButton
        buttonType={isErrorType ? 'destructive' : 'primary'}
        data-testid="button"
        label={label}
        type="button"
        onClick={onClick}
    />
);

interface MessageTypeProps {
    ariaLive: Live;
    container: ComponentType<AbstractContainerProps>;
    iconName: IconName;
    role: Role;
    title: 'Info' | 'Success' | 'Warning' | 'Alert';
}

function handleType(type: MessageType): MessageTypeProps {
    switch (type) {
        case 'info':
            return {
                container: InfoContainer,
                iconName: 'star',
                ariaLive: 'polite',
                role: 'status',
                title: 'Info',
            };
        case 'success':
            return {
                container: SuccessContainer,
                iconName: 'check',
                ariaLive: 'polite',
                role: 'status',
                title: 'Success',
            };
        case 'warning':
            return {
                container: WarningContainer,
                iconName: 'alertTriangle',
                ariaLive: 'assertive',
                role: 'alert',
                title: 'Warning',
            };
        case 'alert':
            return {
                container: AlertContainer,
                iconName: 'alertOctagon',
                ariaLive: 'assertive',
                role: 'alert',
                title: 'Alert',
            };
    }
}

interface SectionalBannerProps {
    buttonLabel?: string;
    className?: string;
    /** Sets custom message title */
    title?: string;
    /** Sets message type */
    type: MessageType;

    onButtonClicked?(): void;

    onDismiss?(): void;
}

function isAlert(messageType: MessageType): messageType is 'alert' {
    return messageType === 'alert';
}

export const SectionalBanner: FunctionComponent<SectionalBannerProps> = ({
    buttonLabel,
    className,
    children,
    title,
    type,
    onButtonClicked,
    onDismiss,
}) => {
    const { t } = useTranslation('sectional-banner');
    const { isMobile } = useDeviceContext();
    const messageType: MessageTypeProps = useMemo(() => handleType(type), [type]);
    const Container = messageType.container;
    const isErrorType = isAlert(type);

    const iconSize = isMobile ? 24 : 20;
    const lineHeight = getLineHeight(isMobile);
    const marginTop = (lineHeight - iconSize) / 2;

    return (
        <Container
            className={className}
            isMobile={isMobile}
            aria-live={messageType.ariaLive}
            aria-atomic="true"
            role={messageType.role}
        >
            <BannerIcon
                name={messageType.iconName}
                size={iconSize.toString()}
                aria-hidden="true"
                $marginTop={marginTop}
            />

            <TextWrapper isMobile={isMobile}>
                <Heading isMobile={isMobile}>{title || t(messageType.title)}</Heading>
                <p>{children}</p>
                {!isMobile && buttonLabel && (
                    <ActionButton
                        isErrorType={isErrorType}
                        label={buttonLabel}
                        onClick={onButtonClicked}
                        data-testid="desktop-button"
                    />
                )}
            </TextWrapper>

            {isMobile && buttonLabel && (
                <ActionButton
                    isErrorType={isErrorType}
                    label={buttonLabel}
                    onClick={onButtonClicked}
                    data-testid="mobile-button"
                />
            )}

            {!isErrorType && onDismiss && (
                <DismissIconButton
                    onClick={onDismiss}
                    label={t('dismissLabel')}
                    isMobile={isMobile}
                    $marginTop={marginTop}
                    data-testid="dismiss-button"
                />
            )}
        </Container>
    );
};
