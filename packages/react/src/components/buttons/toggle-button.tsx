import { type FC, MouseEvent, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { IconName } from '../icon';
import { Button } from './button';
import { IconButton } from './icon-button';
import { Tooltip } from '../tooltip';

type IconOnly = { iconName: IconName, ariaLabel: string }
type LabelOnly = { label: string, ariaLabel?: string }
type IconWithLabel = { iconName: IconName, label: string, ariaLabel?: string }

export type ToggleButtonProps = {
    disabled?: boolean;
    onClick?(event: MouseEvent<HTMLButtonElement>): void;
    pressed: boolean;
} & (IconOnly | LabelOnly | IconWithLabel);

const PressButtonStyle = css<ToggleButtonProps>`
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

export const ToggleButton: FC<ToggleButtonProps> = (props) => {
    const {
        disabled, onClick, pressed,
    } = props;
    const [isPressed, setIsPressed] = useState<boolean>(pressed);
    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>): void => {
        setIsPressed((prev) => !prev);

        if (onClick) {
            onClick(event);
        }
    }, [onClick]);

    const hasIconName = 'iconName' in props;
    const hasLabel = 'label' in props;
    const hasAriaLabel = 'ariaLabel' in props;

    if (!hasIconName && !hasLabel) {
        throw new Error('ToggleButton requires either iconName or label prop');
    }

    const isIconOnly = hasIconName && !hasLabel;

    if (isIconOnly && !hasAriaLabel) {
        throw new Error('ToggleButton with iconName only requires ariaLabel prop');
    }

    return isIconOnly ? (
        <Tooltip label={props.ariaLabel}>
            <PressIconButton
                label={props.ariaLabel}
                aria-pressed={isPressed}
                buttonType='primary'
                disabled={disabled}
                iconName={props.iconName}
                onClick={handleClick}
                pressed={isPressed}
            />
        </Tooltip>
    ) : (
        <PressButton
            aria-label={props.ariaLabel ?? props.label}
            aria-pressed={isPressed}
            buttonType="primary"
            disabled={disabled}
            label={props.label}
            leftIconName={hasIconName ? props.iconName : undefined}
            onClick={handleClick}
            pressed={isPressed}
        />
    );
};
