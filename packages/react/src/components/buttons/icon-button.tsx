import React, { ReactElement, Ref, forwardRef } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';
import { AbstractButton, getButtonTypeStyles } from './abstract-button';

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'destructive';

type Type = 'submit' | 'button' | 'reset';

interface ButtonProps {
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
    label: string;
    type?: Type;

    onClick?(): void;
}

const StyledButton = styled(AbstractButton)`
    ${getButtonTypeStyles}

    padding: 0;
    width: ${({ isMobile }) => (isMobile ? '48px' : '32px')};
`;

export const IconButton = forwardRef(({
    className,
    iconName,
    label,
    onClick,
    type = 'submit',
    buttonType,
    disabled,
    ...props
}: ButtonProps, ref: Ref<HTMLButtonElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const handleClick = (): void => onClick?.();

    return (
        <StyledButton
            ref={ref}
            aria-label={label}
            className={className}
            onClick={handleClick}
            isMobile={isMobile}
            type={type}
            buttonType={buttonType}
            disabled={disabled}
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            <Icon
                aria-hidden="true"
                name={iconName}
                size={isMobile ? '20' : '16'}
            />
        </StyledButton>
    );
});
