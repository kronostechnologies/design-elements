import { type FC } from 'react';
import styled, { css } from 'styled-components';
import { devConsole } from '../../utils/dev-console';
import { IconName } from '../icon/icon';
import { Button } from './button';
import { IconButton } from './icon-button';

interface IconOnlyProps {
    iconName: IconName;
    ariaLabel: string;
}

interface LabelOnlyProps {
    label: string;
    ariaLabel?: string;
}

interface IconWithLabelProps extends LabelOnlyProps {
    iconName: IconName;
}

export type ToggleButtonProps = {
    disabled?: boolean;
    onChange?(pressed: boolean): void;
    pressed: boolean;
} & (IconOnlyProps | LabelOnlyProps | IconWithLabelProps);

const InnerButtonStyle = css`
    border: ${({ theme }) => theme.component['toggle-button-border-color']};

    &[aria-pressed='true'] {
        background-color: ${({ theme }) => theme.component['toggle-button-pressed-background-color']};
        color: ${({ theme }) => theme.component['toggle-button-pressed-text-color']};
        font-weight: ${({ theme }) => theme.component['toggle-button-pressed-font-weight']};

        &:hover {
            background-color: ${({ theme }) => theme.component['toggle-button-pressed-hover-background-color']};
            color: ${({ theme }) => theme.component['toggle-button-pressed-hover-text-color']};
        }
    }

    &[aria-pressed='false'] {
        background-color: ${({ theme }) => theme.component['toggle-button-background-color']};
        color: ${({ theme }) => theme.component['toggle-button-text-color']};
        font-weight: ${({ theme }) => theme.component['toggle-button-font-weight']};

        &:hover {
            background-color: ${({ theme }) => theme.component['toggle-button-hover-background-color']};
            color: ${({ theme }) => theme.component['toggle-button-hover-text-color']};
        }
    }

    // Disabled styles must override pressed/unpressed states
    &[aria-disabled='true'] {
        background-color: ${({ theme }) => theme.component['toggle-button-disabled-background-color']};
        color: ${({ theme }) => theme.component['toggle-button-disabled-text-color']};
    }
`;

const InnerIconButton = styled(IconButton)`
    ${InnerButtonStyle};
`;

const InnerButton = styled(Button)`
    ${InnerButtonStyle};
    font-size: ${({ theme }) => theme.component['toggle-button-font-size']};
    letter-spacing: ${({ theme }) => theme.component['toggle-button-letter-spacing']};
    padding: var(--spacing-half) var(--spacing-2x);
    text-transform: ${({ theme }) => theme.component['toggle-button-text-transform']};
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

    const hasIconName = Boolean(iconName);
    const hasLabel = Boolean(label);
    const hasAriaLabel = Boolean(ariaLabel);

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
            iconName={iconName!}
            onClick={handleClick}
            type='button'
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
            type='button'
        />
    );
};

ToggleButton.displayName = 'ToggleButton';
