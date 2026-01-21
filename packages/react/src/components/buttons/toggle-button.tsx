import { type FC, MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import { IconName } from '../icon';
import { Button, ButtonProps } from './button';
import { IconButton } from './icon-button';
import { Tooltip } from '../tooltip';

const PressButtonStyle = css<ButtonProps>`
    background-color: ${({ theme, pressed }) => (pressed ? theme.component['toggle-button-pressed-background-color'] : theme.component['toggle-button-background-color'])};
    border: ${({ theme }) => theme.component['toggle-button-border-color']};
    color: ${({ theme, pressed }) => (pressed ? theme.component['toggle-button-pressed-text-color'] : theme.component['toggle-button-text-color'])};
    
    &:hover {
        background-color: ${({ theme, pressed }) => (pressed ? theme.component['toggle-button-pressed-hover-background-color'] : theme.component['toggle-button-hover-background-color'])};
        color: ${({ theme, pressed }) => (pressed ? theme.component['toggle-button-pressed-hover-text-color'] : theme.component['toggle-button-hover-text-color'])};
    }

    &[aria-disabled='true'] {
        background-color: ${({ theme }) => theme.component['toggle-button-disabled-background-color']};
        color: ${({ theme }) => theme.component['toggle-button-disabled-text-color']};
    }
`;

const PressIconButton = styled(IconButton)`
    ${PressButtonStyle}
`;

const PressButton = styled(Button)`
    ${PressButtonStyle}
`;

export interface ToggleButtonProps {
    ariaLabel?: string;
    disabled?: boolean;
    iconName?: IconName;
    label?: string;
    onClick?(event: MouseEvent<HTMLButtonElement>): void;
    pressed: boolean;
    value: string;
}

export const ToggleButton: FC<ToggleButtonProps> = ({
    ariaLabel,
    disabled,
    iconName,
    label,
    onClick,
    pressed,
    value,
}) => {
    if (label) {
        return (
            <PressButton
                ariaLabel={ariaLabel ?? label}
                buttonType="primary"
                disabled={disabled}
                onClick={onClick}
                pressed={pressed}
                value={value}
                label={label}
                leftIconName={iconName}
            />
        );
    }

    if (iconName && ariaLabel) {
        return (
            <Tooltip
                label={ariaLabel}
            >
                <PressIconButton
                    ariaLabel={ariaLabel}
                    buttonType='primary'
                    disabled={disabled}
                    iconName={iconName}
                    onClick={onClick}
                    pressed={pressed}
                    value={value}
                />
            </Tooltip>
        );
    }

    if (iconName) {
        throw new Error('ToggleButton with iconName requires an ariaLabel.');
    }

    throw new Error('ToggleButton requires either a label or both an iconName and an ariaLabel.');
};
