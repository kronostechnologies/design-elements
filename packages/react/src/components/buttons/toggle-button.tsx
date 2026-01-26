import { type FC } from 'react';
import styled, { css } from 'styled-components';
import { IconName } from '../icon';
import { Button } from './button';
import { IconButton } from './icon-button';
import { devConsole } from '../../utils/dev-console';

type IconOnlyProps = { iconName: IconName, ariaLabel: string }
type LabelOnlyProps = { label: string, ariaLabel?: string }
type IconWithLabelProps = { iconName: IconName, label: string, ariaLabel?: string }

export type ToggleButtonProps = {
    disabled?: boolean;
    onChange?(pressed: boolean): void;
    pressed?: boolean;
} & (IconOnlyProps | LabelOnlyProps | IconWithLabelProps);

const InnerButtonStyle = css`
    border: ${({ theme }) => theme.component['toggle-button-border-color']};

    &[aria-disabled='true'] {
        background-color: ${({ theme }) => theme.component['toggle-button-disabled-background-color']};
        color: ${({ theme }) => theme.component['toggle-button-disabled-text-color']};
    }

    &[aria-pressed='true'] {
        background-color: ${({ theme }) => theme.component['toggle-button-pressed-background-color']};
        color: ${({ theme }) => theme.component['toggle-button-pressed-text-color']};

        &:hover {
            background-color: ${({ theme }) => theme.component['toggle-button-pressed-hover-background-color']};
            color: ${({ theme }) => theme.component['toggle-button-pressed-hover-text-color']};
        }
    }

    &[aria-pressed='false'] {
        background-color: ${({ theme }) => theme.component['toggle-button-background-color']};
        color: ${({ theme }) => theme.component['toggle-button-text-color']};

        &:hover {
            background-color: ${({ theme }) => theme.component['toggle-button-hover-background-color']};
            color: ${({ theme }) => theme.component['toggle-button-hover-text-color']};
        }
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
    pressed = false,
    ...props
}) => {
    const iconName = 'iconName' in props ? props.iconName : undefined;
    const label = 'label' in props ? props.label : undefined;

    const hasIconName = iconName;
    const hasLabel = label;
    const hasAriaLabel = ariaLabel;

    if (!hasIconName && !hasLabel) {
        devConsole.error('ToggleButton requires either iconName or label prop');
    }

    const isIconOnly = hasIconName && !hasLabel;

    if (isIconOnly && !hasAriaLabel) {
        devConsole.error('ToggleButton with iconName only requires ariaLabel prop');
    }

    const handleClick: () => void = () => {
        onChange?.(!pressed);
    };

    return isIconOnly && hasAriaLabel ? (
        <InnerIconButton
            label={ariaLabel}
            aria-pressed={pressed}
            buttonType='primary'
            disabled={disabled}
            iconName={iconName}
            onClick={handleClick}
        />
    ) : (
        <InnerButton
            aria-label={ariaLabel ?? label}
            aria-pressed={pressed}
            buttonType='primary'
            disabled={disabled}
            label={label}
            leftIconName={hasIconName ? iconName : undefined}
            onClick={handleClick}
        />
    );
};

ToggleButton.displayName = 'ToggleButton';
