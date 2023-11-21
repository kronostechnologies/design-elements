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
    background-color: ${(props) => (props.pressed ? props.theme.ref['color-informative-05'] : props.theme.ref['color-white'])};
    border: 1px solid;
    border-color: ${(props) => (props.pressed ? props.theme.ref['color-brand-80'] : props.theme.ref['color-neutral-50'])};
    border-right: ${(props) => (props.pressed ? '1px solid' : 0)};
    box-sizing: border-box;
    color: ${(props) => (props.pressed ? props.theme.ref['color-brand-80'] : props.theme.ref['color-neutral-65'])};
    cursor: pointer;
    font-size: ${(props) => (props.isMobile ? '1rem' : '0.875rem')};
    letter-spacing: 0.02875rem;
    min-height: ${(props) => (props.isMobile ? 'var(--size-3x)' : 'var(--size-2x)')};
    padding: 0 var(--spacing-2x);

    ${(props) => props.pressed && css`
        & + button { border-left: 0; }
    `}

    &:last-child {
        border-right: 1px solid ${(props) => (props.pressed ? props.theme.ref['color-brand-80'] : props.theme.ref['color-neutral-50'])};
        margin: 0;
    }

    &:focus {
        z-index: 1;
    }

    ${(theme) => focus(theme, true)};

    ${(props) => !props.pressed && css`
        &:hover {
            background-color: ${props.theme.ref['color-neutral-15']};
            border-color: ${props.theme.ref['color-neutral-65']};
            color: ${props.theme.ref['color-black']};

            & + button {
                border-left-color: ${props.theme.ref['color-neutral-65']};
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
        label: string;
        value: string;
    }[];
    className?: string;
    /**
     * Sets common name for all buttons
     */
    groupName: string;

    onClick?(event: MouseEvent<HTMLButtonElement>): void;
}

export const ToggleButtonGroup: VoidFunctionComponent<ToggleButtonGroupProps> = ({
    buttonGroup, className, groupName, onClick,
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
                >
                    {button.label}
                </ToggleButton>
            ))}
        </Container>
    );
};
