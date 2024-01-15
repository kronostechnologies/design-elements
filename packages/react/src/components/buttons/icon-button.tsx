import { forwardRef, KeyboardEvent, MouseEvent, ReactElement, Ref } from 'react';
import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { Theme } from '../../themes/interface/theme';
import { AvatarProps } from '../avatar/avatar';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName, IconProps } from '../icon/icon';
import { AbstractButton, ButtonType, getButtonTypeStyles } from './abstract-button';

type Size = 'small' | 'medium';

type Type = 'submit' | 'button' | 'reset';

export interface IconButtonProps {
    autofocus?: boolean;
    children?: ReactElement<IconProps | AvatarProps>;
    /**
     * Visual style
     * @default primary
     */
    buttonType: ButtonType;
    className?: string;
    disabled?: boolean;
    inverted?: boolean;
    /**
     * Name of the desired icon (refer to icon library)
     */
    iconName: IconName;
    /**
     * Sets aria-label
     */
    label?: string;
    /**
     * Size variant
     * @default medium
     */
    size?: Size;
    title?: string;
    type?: Type;

    onClick?(event: MouseEvent<HTMLButtonElement>): void;

    onKeyDown?(event: KeyboardEvent<HTMLButtonElement>): void;
}

const getButtonSizeStyles = (
    { isMobile, size }: { isMobile: boolean, size?: Size },
): FlattenInterpolation<ThemeProps<Theme>> => {
    switch (size) {
        case 'small':
            return css`
                ${!isMobile && 'min-width: var(--size-1halfx)'};

                padding: 0;
                width: ${isMobile ? 'var(--size-3x)' : 'var(--size-1halfx)'};
            `;
        case 'medium':
        default:
            return css`
                padding: 0;
                width: ${isMobile ? 'var(--size-3x)' : 'var(--size-2x)'};
            `;
    }
};

const StyledButton = styled(AbstractButton)`
    ${getButtonTypeStyles};
    ${getButtonSizeStyles};

    > svg {
        height: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
        width: ${({ isMobile }) => (isMobile ? 'var(--size-1halfx)' : 'var(--size-1x)')};
    }
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
    title,
    onClick,
    onKeyDown,
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
            onClick={onClick}
            onKeyDown={onKeyDown}
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            { children || (
                <Icon
                    aria-hidden="true"
                    name={iconName}
                    size={isMobile ? '24' : '16'}
                />
            )}
        </StyledButton>
    );
});

IconButton.displayName = 'IconButton';
