import { useMemo, VoidFunctionComponent } from 'react';
import styled, {
    css,
    FlattenInterpolation,
    keyframes,
    ThemedStyledProps,
    ThemeProps,
} from 'styled-components';
import { useToasts } from '../../hooks/use-toasts';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes/theme';
import { IconButton, IconButtonProps } from '../buttons/icon-button';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName, IconProps } from '../icon/icon';
import { ToastPosition } from './toast-position';
import { ToastType } from './toast-type';

interface ToastWrapperProps {
    isMobile: boolean;
    position: ToastPosition;
    theme: ResolvedTheme;
    type: ToastType;
}

function getToastTextColor(
    { theme, type }: ToastWrapperProps,
): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    return css`
        color: ${theme.component[`toast-${type ?? 'neutral'}-text-color`]};
    `;
}

function getToastContainerBackground(
    { theme, type }: ToastWrapperProps,
): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    return css`
        background: ${theme.component[`toast-${type ?? 'neutral'}-background-color`]};
    `;
}

const toastInLeft = keyframes`
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0);
    }
`;

const toastInRight = keyframes`
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
`;

function getToastPosition({ position }: ToastWrapperProps): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    switch (position) {
        case 'top-right':
            return css`
                animation: ${toastInRight} 0.25s ease-out;
            `;
        case 'bottom-right':
            return css`
                animation: ${toastInRight} 0.25s ease-out;
            `;
        case 'top-left':
            return css`
                animation: ${toastInLeft} 0.25s ease-out;
            `;
        case 'bottom-left':
            return css`
                animation: ${toastInLeft} 0.25s ease-out;
            `;
    }
}

const ToastWrapper = styled.div<ToastWrapperProps>`
    align-items: center;
    border-radius: var(--border-radius);
    box-shadow: 0 16px 32px 0 rgb(0 0 0 / 5%);
    box-sizing: border-box;
    display: flex;
    padding: ${({ isMobile }) => (isMobile ? 'var(--spacing-2halfx)' : 'var(--spacing-2x)')};
    transition: 0.3s ease;
    width: ${({ isMobile }) => (isMobile ? '100vw' : '400px')};

    ${getToastPosition};
    ${getToastContainerBackground};
    ${getToastTextColor};
`;

const StyledMessage = styled.p<{ $isMobile: boolean }>`
    flex: 1;
    font-size: ${({ $isMobile }) => ($isMobile ? 1.125 : 1)}rem;
    line-height: ${({ $isMobile }) => ($isMobile ? 1.75 : 1.5)}rem;
    margin: 0 var(--spacing-1halfx);
`;

type DismissIconProps = ThemedStyledProps<Pick<IconButtonProps, 'label' | 'onClick'>, ResolvedTheme> & {
    $isMobile: boolean;
    $type: ToastType;
};

function getDismissIconMarginTop({ $isMobile }: DismissIconProps): string {
    return $isMobile ? 'calc(-1 * var(--spacing-1x))' : 'calc(-1 * var(--spacing-half))';
}

const DismissIcon = styled(IconButton).attrs<DismissIconProps, Partial<IconButtonProps>>({
    buttonType: 'tertiary',
    iconName: 'x',
    inverted: true,
})<DismissIconProps>`
    align-self: flex-start;
    color: ${({ theme, $type }) => theme.component[`toast-${$type}-icon-color`]};
    margin: ${getDismissIconMarginTop} calc(-1 * var(--spacing-half)) ${getDismissIconMarginTop} 0;
`;

function getMessageLabel(type: ToastType): string {
    switch (type) {
        case 'discovery':
            return 'discovery';
        case 'success':
            return 'success';
        case 'warning':
            return 'warning';
        case 'alert':
            return 'alert';
        case 'neutral':
        default:
            return 'information';
    }
}

type MessageIconProps = IconProps & Pick<ToastWrapperProps, 'type'> & Pick<DeviceContextProps, 'isMobile'>;
const MessageIcon = styled(Icon).attrs(({ type }: MessageIconProps) => ({
    focusable: true,
    'aria-label': getMessageLabel(type),
}))<MessageIconProps>`
    align-self: flex-start;
    height: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
    margin-top: 0.25rem;
    width: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
`;

function getToastIconName(type: ToastType): IconName {
    switch (type) {
        case 'discovery':
            return 'lightbulb';
        case 'success':
            return 'check';
        case 'warning':
            return 'alertTriangle';
        case 'alert':
            return 'alertOctagon';
        case 'neutral':
        default:
            return 'info';
    }
}

interface ToastContainerProps {
    id: string;
    className?: string;
    type?: ToastType;
    message: string;
    position: ToastPosition;
}

export const ToastContainer: VoidFunctionComponent<ToastContainerProps> = ({
    id,
    className,
    type = 'neutral',
    message,
    position,
}) => {
    const { t } = useTranslation('toast');
    const toastIconName = useMemo(() => getToastIconName(type), [type]);
    const { removeToast } = useToasts();
    const { isMobile } = useDeviceContext();

    return (
        <ToastWrapper isMobile={isMobile} className={className} type={type} position={position} role="status">
            <MessageIcon
                name={toastIconName}
                size="16"
                role="img"
                type={type}
                isMobile={isMobile}
            />
            <StyledMessage $isMobile={isMobile}>
                {message}
            </StyledMessage>
            <DismissIcon
                label={t('dismissButtonLabel')}
                $isMobile={isMobile}
                $type={type}
                onClick={() => removeToast(id)}
                buttonType="tertiary"
                inverted={type !== 'warning'}
                data-testid="dismiss"
                type="button"
            />
        </ToastWrapper>
    );
};

ToastContainer.displayName = 'ToastContainer';
