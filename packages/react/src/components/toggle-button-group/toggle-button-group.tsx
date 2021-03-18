import React, { MouseEvent, ReactElement, useState } from 'react';
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

const outOfThemeColor = '#e0f0f9'; // TODO: Eventually put somewhere in theme
const ToggleButton = styled.button<ToggleButtonProps>`
    align-items: center;
    background-color: ${(props) => (props.pressed ? outOfThemeColor : props.theme.greys.white)};
    border: 1px solid;
    border-color: ${(props) => (props.pressed ? props.theme.main['primary-2'] : '#878f9a')}; /* TODO change colors when updating thematization */
    border-right: ${(props) => (props.pressed ? '1px solid' : 0)};
    box-sizing: border-box;
    color: ${(props) => (props.pressed ? props.theme.main['primary-2'] : props.theme.greys['dark-grey'])};
    cursor: pointer;
    font-size: ${(props) => (props.isMobile ? '1rem' : '0.875rem')};
    letter-spacing: 0.02875rem;
    min-height: ${(props) => (props.isMobile ? '48px' : '32px')};
    padding: 0 var(--spacing-2x);

    ${(props) => props.pressed && css`
        & + button { border-left: 0; }
    `}

    &:last-child {
        border-right: 1px solid ${(props) => (props.pressed ? props.theme.main['primary-2'] : '#878f9a')}; /* TODO change colors when updating thematization */
        margin: 0;
    }

    &:focus {
        z-index: 1;
    }

    ${(theme) => focus(theme, true)};

    ${(props) => !props.pressed && css`
        &:hover {
            background-color: ${props.theme.greys.grey};
            border-color: ${props.theme.greys['dark-grey']};
            color: ${props.theme.greys.black};

            & + button {
                border-left-color: ${props.theme.greys['dark-grey']};
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

export function ToggleButtonGroup({
    buttonGroup, className, groupName, onClick,
}: ToggleButtonGroupProps): ReactElement {
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
}
