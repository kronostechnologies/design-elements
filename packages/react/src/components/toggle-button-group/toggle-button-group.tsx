import { MouseEvent, useState, VoidFunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { focus } from '../../utils/css-state';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const Container = styled.div`
    display: flex;

    button {
        &:first-child {
            border-radius: var(--border-radius) 0 0 var(--border-radius);
        }

        &:last-child {
            border-radius: 0 var(--border-radius) var(--border-radius) 0;
        }
    }
`;

interface ToggleButtonProps {
    pressed: boolean;
    isMobile: boolean;
}

const ToggleButton = styled.button<ToggleButtonProps>`
    align-items: center;
    background-color: ${({ theme, pressed }) => (pressed ? theme.component['toggle-button-pressed-background-color'] : theme.component['toggle-button-background-color'])};
    border: 1px solid ${({ theme, pressed }) => (pressed ? theme.component['toggle-button-pressed-border-color'] : theme.component['toggle-button-border-color'])};
    border-right: ${({ pressed }) => (pressed ? '1px solid' : 0)};
    box-sizing: border-box;
    color: ${({ theme, pressed }) => (pressed ? theme.component['toggle-button-pressed-text-color'] : theme.component['toggle-button-text-color'])};
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};
    letter-spacing: 0.02875rem;
    min-height: ${({ isMobile }) => (isMobile ? 'var(--size-3x)' : 'var(--size-2x)')};
    padding: 0 var(--spacing-2x);

    ${({ pressed }) => pressed && css`
        & + button { border-left: 0; }
    `}

    &:last-child {
        border-right: 1px solid ${({ theme, pressed }) => (pressed ? theme.component['toggle-button-pressed-border-color'] : theme.component['toggle-button-border-color'])};
        margin: 0;
    }

    &:focus {
        z-index: 1;
    }

    ${focus};

    ${({ theme, disabled }) => disabled && css`
        &:disabled,
        &:disabled:hover {
            background-color: ${theme.component['toggle-button-disabled-background-color']};
            border-color: ${theme.component['toggle-button-disabled-border-color']};
            color: ${theme.component['toggle-button-disabled-text-color']};
        }
    `}

    ${({ theme, pressed }) => !pressed && css`
        &:hover {
            background-color: ${theme.component['toggle-button-hover-background-color']};
            border-color: ${theme.component['toggle-button-hover-border-color']};
            color: ${theme.component['toggle-button-hover-text-color']};

            & + button {
                border-left-color: ${theme.component['toggle-button-hover-border-color']};
            }
        }
`}
`;

interface ToggleButtonGroupProps {
    /**
     * Takes an array of objects containing all the buttons needed
     */
    buttonGroup: {
        defaultPressed?: boolean;
        disabled?: boolean;
        label: string;
        value: string
    }[];
    className?: string;
    /**
     * Sets common name for all buttons
     */
    groupName: string;

    onClick?(event: MouseEvent<HTMLButtonElement>): void;
}

export const ToggleButtonGroup: VoidFunctionComponent<ToggleButtonGroupProps> = ({
    buttonGroup,
    className,
    groupName,
    onClick,
}) => {
    const { isMobile } = useDeviceContext();
    const defaultPressedButton = buttonGroup.find((button) => button.defaultPressed);
    const [selectedButton, setSelectedButton] = useState(defaultPressedButton ? defaultPressedButton.value : '');

    function handleClick(event: MouseEvent<HTMLButtonElement>): void {
        if (selectedButton === event.currentTarget.value) {
            setSelectedButton('');
        } else {
            setSelectedButton(event.currentTarget.value);
        }

        onClick?.(event);
    }

    return (
        <Container className={className} role="group" aria-label={groupName}>
            {buttonGroup.map((button, i) => (
                <ToggleButton
                    aria-label={button.label}
                    aria-pressed={button.value === selectedButton}
                    pressed={button.value === selectedButton}
                    data-testid={`test-toggle-button-${i}`}
                    isMobile={isMobile}
                    key={`${groupName}-${button.value}`}
                    onClick={handleClick}
                    type="button"
                    value={button.value}
                    disabled={button.disabled}
                >
                    {button.label}
                </ToggleButton>
            ))}
        </Container>
    );
};
