import { forwardRef, ReactElement, Ref } from 'react';
import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { type ResolvedTheme } from '../../themes';
import { type AvatarProps } from '../avatar';
import { useDeviceContext } from '../device-context-provider';
import { Icon, type IconName, type IconProps } from '../icon';
import { AbstractButton, type ButtonSize } from './abstract';
import { type ButtonProps } from './button';
import { getButtonTypeStyles } from './styled';

export interface IconButtonProps extends Omit<ButtonProps, 'leftIconName' | 'rightIconName'> {
    children?: ReactElement<IconProps | AvatarProps>;
    /**
     * Name of the desired icon (refer to icon library)
     */
    iconName: IconName;
}

const getButtonSizeStyles = (
    { isMobile, size }: { isMobile: boolean, size?: ButtonSize },
): FlattenInterpolation<ThemeProps<ResolvedTheme>> => {
    switch (size) {
        case 'small':
            return css`
                ${!isMobile && 'min-width: var(--size-1halfx)'};

                padding: 0;
                width: ${isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)'};
            `;
        case 'medium':
        default:
            return css`
                padding: 0;
                width: var(--size-2x);
            `;
    }
};

const StyledButton = styled(AbstractButton)`
    ${getButtonTypeStyles};
    ${getButtonSizeStyles};
`;

export const IconButton = forwardRef(({
    autofocus,
    children,
    className,
    iconName,
    label,
    type = 'submit',
    buttonType,
    disabled,
    focusable = true,
    title,
    onClick,
    onFocus,
    onBlur,
    onKeyDown,
    size = 'medium',
    ...props
}: IconButtonProps, ref: Ref<HTMLButtonElement>): ReactElement => {
    const { isMobile } = useDeviceContext();

    return (
        <StyledButton
            ref={ref}
            autoFocus={autofocus}
            aria-label={label}
            className={className}
            isMobile={isMobile}
            title={title}
            type={type}
            buttonType={buttonType}
            disabled={disabled}
            focusable={focusable}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            size={size}
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            { children || (
                <Icon
                    aria-hidden="true"
                    name={iconName}
                    size={isMobile ? '20' : '16'}
                />
            )}
        </StyledButton>
    );
});

IconButton.displayName = 'IconButton';
