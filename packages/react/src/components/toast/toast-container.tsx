import { useMemo, VoidFunctionComponent } from 'react';
import styled, {
    css,
    FlattenInterpolation,
    FlattenSimpleInterpolation,
    keyframes,
    ThemedStyledProps,
    ThemeProps,
} from 'styled-components';
import { useTheme } from '../../hooks/use-theme';
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

function getToastContainerBackground(
    { theme, type }: ToastWrapperProps,
): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    switch (type) {
        case 'information':
            return css`
                background: ${theme.component['toast-container-information-background']};
            `;
        case 'success':
            return css`
                background: ${theme.component['toast-container-success-background']};
            `;
        case 'warning':
            return css`
                background: ${theme.component['toast-container-warning-background']};
            `;
        case 'error':
            return css`
                background: ${theme.component['toast-container-error-background']};
            `;
    }
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

    ${getToastPosition}
    ${getToastContainerBackground}
`;

const StyledMessage = styled.p<{ color: string, $isMobile: boolean }>`
    color: ${({ color }) => color};
    flex: 1;
    font-size: ${({ $isMobile }) => ($isMobile ? 1.125 : 1)}rem;
    line-height: ${({ $isMobile }) => ($isMobile ? 1.75 : 1.5)}rem;
    margin: 0 var(--spacing-1halfx);
`;

type DismissIconProps = ThemedStyledProps<Pick<IconButtonProps, 'label' | 'onClick'>, ResolvedTheme> & {
    $color: string;
    $isMobile: boolean;
    $type: ToastType;
};

function getDismissHoverCss({ $type, theme }: DismissIconProps): FlattenSimpleInterpolation {
    switch ($type) {
        case 'information':
            return css`
                background-color: ${theme.component['toast-container-dismiss-icon-information-hover-background-color']};
                color: ${theme.component['toast-container-dismiss-icon-information-hover-color']};
            `;
        case 'success':
            return css`
                background-color: ${theme.component['toast-container-dismiss-icon-success-hover-background-color']};
                color: ${theme.component['toast-container-dismiss-icon-success-hover-color']};
            `;
        case 'warning':
            return css`
                background-color: ${theme.component['toast-container-dismiss-icon-warning-hover-background-color']};
                color: ${theme.component['toast-container-dismiss-icon-warning-hover-color']};
            `;
        case 'error':
            return css`
                background-color: ${theme.component['toast-container-dismiss-icon-error-hover-background-color']};
                color: ${theme.component['toast-container-dismiss-icon-error-hover-color']};
            `;
    }
}

function getDismissIconMarginTop({ $isMobile }: DismissIconProps): string {
    return $isMobile ? 'calc(-1 * var(--spacing-1x))' : 'calc(-1 * var(--spacing-half))';
}

const DismissIcon = styled(IconButton).attrs<DismissIconProps, Partial<IconButtonProps>>({
    buttonType: 'tertiary',
    iconName: 'x',
})<DismissIconProps>`
    align-self: flex-start;
    color: ${({ $color }) => $color};
    margin: ${getDismissIconMarginTop} calc(-1 * var(--spacing-half)) ${getDismissIconMarginTop} 0;

    &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.component['toast-container-dismiss-icon-focus-box-shadow']};
    }

    &:hover {
        ${getDismissHoverCss}
    }
`;

function getMessageLabel(type: ToastType): string {
    switch (type) {
        case 'information':
            return 'info';
        case 'success':
            return 'success';
        case 'warning':
            return 'warning';
        case 'error':
            return 'error';
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
        case 'information':
            return 'info';
        case 'success':
            return 'check';
        case 'warning':
            return 'alertTriangle';
        case 'error':
            return 'alertOctagon';
    }
}

function getToastTextColor(type: ToastType, theme: ResolvedTheme): string {
    return type === 'warning' ? theme.component['toast-container-warning-text-color']
        : theme.component['toast-container-default-text-color'];
}

interface ToastContainerProps {
    id: string;
    className?: string;
    type: ToastType;
    message: string;
    position: ToastPosition;
}

export const ToastContainer: VoidFunctionComponent<ToastContainerProps> = ({
    id,
    className,
    type,
    message,
    position,
}) => {
    const { t } = useTranslation('toast');
    const toastIconName = useMemo(() => getToastIconName(type), [type]);
    const theme = useTheme();
    const toastTextColor = useMemo(() => getToastTextColor(type, theme), [theme, type]);
    const { removeToast } = useToasts();
    const { isMobile } = useDeviceContext();

    return (
        <ToastWrapper isMobile={isMobile} className={className} type={type} position={position} role="status">
            <MessageIcon
                name={toastIconName}
                color={toastTextColor}
                size="16"
                role="img"
                type={type}
                isMobile={isMobile}
            />
            <StyledMessage color={toastTextColor} $isMobile={isMobile}>
                {message}
            </StyledMessage>
            <DismissIcon
                label={t('dismissButtonLabel')}
                $color={toastTextColor}
                $isMobile={isMobile}
                $type={type}
                onClick={() => removeToast(id)}
                data-testid="dismiss"
                type="button"
            />
        </ToastWrapper>
    );
};
