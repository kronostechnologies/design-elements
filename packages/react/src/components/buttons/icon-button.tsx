import { forwardRef, ReactElement, Ref } from 'react';
import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { ResolvedTheme } from '../../themes';
import { AvatarProps } from '../avatar/avatar';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName, IconProps } from '../icon/icon';
import { AbstractButton } from './abstract/abstract-button';
import { Size } from './abstract/types';
import { getButtonTypeStyles } from './styled';
import { ButtonProps } from './types';

export interface IconButtonProps extends ButtonProps {
    children?: ReactElement<IconProps | AvatarProps>;
    /**
     * Name of the desired icon (refer to icon library)
     */
    iconName: IconName;
    size?: Size;
}

const getButtonSizeStyles = (
    { isMobile, size }: { isMobile: boolean, size?: Size },
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
                width: ${isMobile ? 'var(--size-2x)' : 'var(--size-2x)'};
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
