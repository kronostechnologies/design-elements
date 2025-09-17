import {
    FocusEventHandler,
    forwardRef,
    KeyboardEvent,
    type KeyboardEventHandler,
    MouseEvent,
    type MouseEventHandler,
    PropsWithChildren,
    ReactElement,
    Ref,
} from 'react';
import { useTranslation } from '../../i18n/use-translation';
import { useDeviceContext } from '../device-context-provider';
import { type IconName } from '../icon';
import { type ButtonSize } from './abstract';
import { LeftIcon, RightIcon, StyledButton, StyledSpinner } from './styled';

export type Type = 'submit' | 'button' | 'reset';

export type ButtonType =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'destructive-primary'
    | 'destructive-secondary'
    | 'destructive-tertiary';

export interface ButtonProps {
    id?: string;
    autofocus?: boolean;
    /**
     * Visual style
     * @default primary
     */
    buttonType: ButtonType;
    className?: string;
    disabled?: boolean;
    /**
     * @default true
     */
    focusable?: boolean;
    inverted?: boolean;
    label?: string;
    loading?: boolean;
    /**
     * @default Loading...
     */
    loadingLabel?: string;
    /**
     * Size variant
     * @default medium
     */
    size?: ButtonSize;
    tabIndex?: number;
    title?: string;
    type?: Type;

    leftIconName?: IconName;
    rightIconName?: IconName;

    onClick?: MouseEventHandler<HTMLButtonElement>;
    onFocus?: FocusEventHandler<HTMLButtonElement>;
    onBlur?: FocusEventHandler<HTMLButtonElement>;
    onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
}

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(({
    autofocus,
    buttonType,
    children,
    className,
    disabled,
    focusable = true,
    label,
    loading,
    loadingLabel,
    onClick,
    onFocus,
    onBlur,
    onKeyDown,
    title,
    leftIconName,
    rightIconName,
    type = 'button',
    ...props
}: PropsWithChildren<ButtonProps>, ref: Ref<HTMLButtonElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('button');
    const iconSize = props?.size === 'small' && !isMobile ? '16' : '24';

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
        if (disabled) {
            event.preventDefault();
            event.stopPropagation();
        } else if (onClick) {
            onClick(event);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
        if (disabled) {
            event.preventDefault();
            event.stopPropagation();
        } else if (onKeyDown) {
            onKeyDown(event);
        }
    };

    return (
        <StyledButton
            autoFocus={autofocus}
            ref={ref}
            title={title}
            isMobile={isMobile}
            type={type}
            buttonType={buttonType}
            className={className}
            aria-disabled={disabled ? 'true' : undefined}
            focusable={focusable}
            onClick={handleClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            {...props /* eslint-disable-line react/jsx-props-no-spreading *//* To spread aria-* and data-* */}
        >
            {children}
            {loading ? (
                <>
                    <StyledSpinner />
                    {loadingLabel || t('loadingLabel')}
                </>
            ) : (
                <>
                    {leftIconName && (
                        <LeftIcon
                            aria-hidden="true"
                            data-testid="left-icon"
                            name={leftIconName}
                            size={iconSize}
                        />
                    )}
                    {label}
                    {rightIconName && (
                        <RightIcon
                            aria-hidden="true"
                            data-testid="right-icon"
                            name={rightIconName}
                            size={iconSize}
                        />
                    )}
                </>
            )}
        </StyledButton>
    );
});

Button.displayName = 'Button';
