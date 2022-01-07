import { forwardRef, KeyboardEvent, MouseEvent, ReactElement, Ref } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName, IconProps } from '../icon/icon';
import { AbstractButton, getButtonTypeStyles } from './abstract-button';
import { AvatarProps } from '../avatar/avatar';

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'destructive';

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
    title?: string;
    type?: Type;

    onClick?(event: MouseEvent<HTMLButtonElement>): void;

    onKeyDown?(event: KeyboardEvent<HTMLButtonElement>): void;
}

const StyledButton = styled(AbstractButton)`
    ${getButtonTypeStyles};

    padding: 0;
    width: ${({ isMobile }) => (isMobile ? '48px' : '32px')};
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
