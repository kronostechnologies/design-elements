import { type FC, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { IconName } from '../icon';
import { Button } from './button';
import { IconButton } from './icon-button';
import { Tooltip } from '../tooltip';
import { devConsole } from '../../utils/dev-console';
import type { ResolvedTheme } from '../../themes';

type IconOnly = { iconName: IconName, ariaLabel: string }
type LabelOnly = { label: string, ariaLabel?: string }
type IconWithLabel = { iconName: IconName, label: string, ariaLabel?: string }

export type ToggleButtonProps = {
    disabled?: boolean;
    onChange?(pressed: boolean): void;
    pressed: boolean;
} & (IconOnly | LabelOnly | IconWithLabel);

interface InnerButtonProps {
    theme: ResolvedTheme;
    $pressed: boolean;
}

const InnerButtonStyle = css<InnerButtonProps>`
    background-color: ${({ theme, $pressed }) => ($pressed ? theme.component['toggle-button-pressed-background-color'] : theme.component['toggle-button-background-color'])};
    border: ${({ theme }) => theme.component['toggle-button-border-color']};
    color: ${({ theme, $pressed }) => ($pressed ? theme.component['toggle-button-pressed-text-color'] : theme.component['toggle-button-text-color'])};
    
    &:hover {
        background-color: ${({ theme, $pressed }) => ($pressed ? theme.component['toggle-button-pressed-hover-background-color'] : theme.component['toggle-button-hover-background-color'])};
        color: ${({ theme, $pressed }) => ($pressed ? theme.component['toggle-button-pressed-hover-text-color'] : theme.component['toggle-button-hover-text-color'])};
    }

    &[aria-disabled='true'] {
        background-color: ${({ theme }) => theme.component['toggle-button-disabled-background-color']};
        color: ${({ theme }) => theme.component['toggle-button-disabled-text-color']};
    }
`;

const InnerIconButton = styled(IconButton)`
    ${InnerButtonStyle}
`;

const InnerButton = styled(Button)`
    ${InnerButtonStyle}
`;

export const ToggleButton: FC<ToggleButtonProps> = ({
    ariaLabel,
    disabled,
    onChange,
    pressed,
    ...props
}) => {
    const iconName = 'iconName' in props ? props.iconName : undefined;
    const label = 'label' in props ? props.label : undefined;

    const [isPressed, setIsPressed] = useState(pressed);
    const handleClick = useCallback((): void => {
        setIsPressed(!isPressed);
        onChange?.(!isPressed);
    }, [isPressed, onChange]);

    const hasIconName = iconName;
    const hasLabel = label;
    const hasAriaLabel = ariaLabel;

    if (!hasIconName && !hasLabel) {
        devConsole.error(('ToggleButton requires either iconName or label prop'));
    }

    const isIconOnly = hasIconName && !hasLabel;

    if (isIconOnly && !hasAriaLabel) {
        devConsole.error(('ToggleButton with iconName only requires ariaLabel prop'));
    }

    return isIconOnly && hasAriaLabel ? (
        <Tooltip label={ariaLabel}>
            <InnerIconButton
                label={ariaLabel}
                aria-pressed={isPressed}
                buttonType='primary'
                disabled={disabled}
                iconName={iconName}
                onClick={handleClick}
                $pressed={isPressed}
            />
        </Tooltip>
    ) : (
        <InnerButton
            aria-label={ariaLabel ?? label}
            aria-pressed={isPressed}
            buttonType='primary'
            disabled={disabled}
            label={label}
            leftIconName={hasIconName ? iconName : undefined}
            onClick={handleClick}
            $pressed={isPressed}
        />
    );
};
