import {
    FocusEventHandler,
    forwardRef,
    KeyboardEvent,
    MouseEvent,
    PropsWithChildren,
    ReactElement,
    ReactNode,
    Ref,
} from 'react';
import styled from 'styled-components';
import {
    Icon,
    IconName,
} from '../icon/icon';
import { ResolvedTheme } from '../../themes/theme';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { AbstractButton, ButtonType, getButtonTypeStyles } from './abstract-button';

export type Size = 'small' | 'medium';

export type Type = 'submit' | 'button' | 'reset';

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
    /**
     * Size variant
     * @default medium
     */
    size?: Size;
    title?: string;
    type?: Type;

    onClick?(event: MouseEvent<HTMLButtonElement>): void;
    onFocus?: FocusEventHandler<HTMLButtonElement>;
    onBlur?: FocusEventHandler<HTMLButtonElement>;
    onKeyDown?(event: KeyboardEvent<HTMLButtonElement>): void;
}

export interface NormalButtonProps extends ButtonProps {
    leftIconName?: IconName;
    rightIconName?: IconName;
}

const LeftIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

const RightIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
`;

const StyledButton = styled(AbstractButton)<{ theme: ResolvedTheme } & NormalButtonProps>`
    ${getButtonTypeStyles}
`;

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<NormalButtonProps>>(({
    autofocus,
    buttonType,
    children,
    className,
    disabled,
    focusable = true,
    label,
    onClick,
    onFocus,
    onBlur,
    onKeyDown,
    title,
    leftIconName,
    rightIconName,
    type = 'button',
    ...props
}: PropsWithChildren<NormalButtonProps>, ref: Ref<HTMLButtonElement>): ReactElement => {
    const { isMobile } = useDeviceContext();

    function renderIcon(iconName: IconName, displayToTheRight?: boolean | undefined): ReactNode {
        const args = {
            'aria-hidden': 'true',
            name: iconName,
            size: props?.size === 'small' && !isMobile ? '16' : '24',
            'data-testid': !displayToTheRight ? 'left-icon' : 'right-icon',
        };

        if (!displayToTheRight) {
            return <LeftIcon {...args /* eslint-disable-line react/jsx-props-no-spreading */} />;
        }

        return <RightIcon {...args /* eslint-disable-line react/jsx-props-no-spreading */} />;
    }

    return (
        <StyledButton
            autoFocus={autofocus}
            ref={ref}
            title={title}
            isMobile={isMobile}
            type={type}
            buttonType={buttonType}
            className={className}
            disabled={disabled}
            focusable={focusable}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            {...props /* eslint-disable-line react/jsx-props-no-spreading *//* To spread aria-* and data-* */}
        >
            {children}
            {leftIconName && renderIcon(leftIconName)}
            {label}
            {rightIconName && renderIcon(rightIconName, true)}
        </StyledButton>
    );
});

Button.displayName = 'Button';
