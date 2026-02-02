import { MouseEvent, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';
import { Icon, IconName } from '../icon/icon';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const Container = styled.div`
    background-color: ${({ theme }) => (theme.component['segmented-control-list-background-color'])};
    border-radius: var(--border-radius);
    display: flex;
    width: fit-content;
`;

interface ToggleButtonProps {
    pressed: boolean;
    isMobile: boolean;
}

const ToggleButton = styled.button<ToggleButtonProps>`
    align-items: center;
    background-color: ${({ theme, pressed }) => (pressed ? theme.component['segmented-control-pressed-background-color'] : theme.component['segmented-control-background-color'])};
    border: 1px solid ${({ theme, pressed }) => (pressed ? theme.component['segmented-control-pressed-border-color'] : theme.component['segmented-control-border-color'])};
    border-radius: var(--border-radius);
    color: ${({ theme, pressed }) => (pressed ? theme.component['segmented-control-pressed-text-color'] : theme.component['segmented-control-text-color'])};
    display: flex;
    font-family: var(--font-family);
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};
    font-weight: ${({ pressed }) => (pressed ? 'var(--font-semi-bold)' : 'var(--font-normal)')};
    gap: var(--spacing-1x);
    justify-content: center;
    line-height: 1.25rem;
    min-height: ${({ isMobile }) => (isMobile ? 'var(--size-3x)' : 'var(--size-2x)')};
    padding: 0 var(--spacing-1halfx);
    position: relative;

    &:hover {
        background-color: ${({ theme, pressed }) => (pressed ? theme.component['segmented-control-pressed-hover-background-color'] : 'transparent')};
        color: ${({ theme, pressed }) => (pressed ? theme.component['segmented-control-pressed-hover-text-color'] : theme.component['segmented-control-hover-text-color'])};

        &::before {
            background-color: ${({ theme }) => (theme.component['segmented-control-hover-background-color'])};
            border-radius: var(--border-radius);
            content: ${({ pressed }) => (pressed ? 'none' : '" "')};
            display: block;
            height: calc(100% - 0.375rem);
            left: 0.1875rem;
            min-height: 1.5rem;
            position: absolute;
            top: 0.1875rem;
            width: calc(100% - 0.375rem);
        }
    }

    &:focus {
        z-index: 1;
    }

    ${focus};

    &[aria-disabled='true'],
    &[aria-disabled='true']:hover {
        color: ${({ theme }) => theme.component['segmented-control-disabled-text-color']};
        pointer-events: none;
    }

    // Prevent layout shift when the label changes from normal to bold upon selection.
    span::after {
        content: attr(data-text);
        display: block;
        font-weight: var(--font-semi-bold);
        height: 0;
        overflow: hidden;
        pointer-events: none;
        user-select: none;
        visibility: hidden;
    }
`;

interface SegmentedControlProps {
    /**
     * Takes an array of objects containing all the buttons needed
     */
    buttonGroup: {
        defaultPressed?: boolean;
        icon?: IconName;
        ariaLabel?: string;
        disabled?: boolean;
        label?: string;
        value: string
    }[];
    className?: string;
    /**
     * Sets common name for all buttons
     */
    groupName: string;
    toggleable?: boolean;
    onClick?(event: MouseEvent<HTMLButtonElement>): void;
}

export const SegmentedControl: VoidFunctionComponent<SegmentedControlProps> = ({
    buttonGroup,
    className,
    groupName,
    toggleable = true,
    onClick,
}) => {
    const { isMobile } = useDeviceContext();
    const defaultPressedButton = buttonGroup.find((button) => button.defaultPressed);
    const [selectedButton, setSelectedButton] = useState<string>(
        defaultPressedButton ? defaultPressedButton.value : '',
    );

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
        const newValue = event.currentTarget.value;
        const clickedButton = buttonGroup.find((btn) => btn.value === newValue);

        if (clickedButton?.disabled) {
            return;
        }

        if (!toggleable) {
            if (selectedButton !== newValue) {
                setSelectedButton(newValue);
            }
        } else {
            setSelectedButton(newValue === selectedButton ? '' : newValue);
        }

        onClick?.(event);
    };

    return (
        <Container className={className} role="group" aria-label={groupName}>
            {buttonGroup.map((button, i) => (
                <ToggleButton
                    aria-label={button.ariaLabel || undefined}
                    aria-disabled={button.disabled ? true : undefined}
                    aria-pressed={button.value === selectedButton}
                    pressed={button.value === selectedButton}
                    data-testid={`test-toggle-button-${i}`}
                    isMobile={isMobile}
                    key={`${groupName}-${button.value}`}
                    onClick={handleClick}
                    type="button"
                    value={button.value}
                >
                    {button.icon && (
                        <Icon
                            aria-hidden="true"
                            name={button.icon}
                            size="16"
                        />
                    )}
                    {button.label && (
                        <span data-text={button.label}>
                            {button.label}
                        </span>
                    )}
                </ToggleButton>
            ))}
        </Container>
    );
};

SegmentedControl.displayName = 'SegmentedControl';
