import { focus } from '@design-elements/utils/css-state';
import React, { MouseEvent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const Container = styled.div`
    display: flex;

    button {
        &:first-child {
            border-radius: 24px 0 0 24px;
        }

        &:last-child {
            border-radius: 0 24px 24px 0;
        }
    }
`;

interface ToggleButtonProps {
    pressed: boolean;
    isMobile: boolean;
}

const ToggleButton = styled.button<ToggleButtonProps>`
    align-items: center;
    background-color: ${(props) => (props.pressed ? props.theme.main['primary-1.1'] : props.theme.greys.white)};
    border: 1px solid;
    border-color: ${(props) => (props.pressed ? props.theme.main['primary-1.1'] : props.theme.greys.grey)};
    border-left-color: ${(props) => (props.pressed ? props.theme.main['primary-1.1'] : 'transparent')};
    box-sizing: border-box;
    color: ${(props) => (props.pressed ? props.theme.greys.white : props.theme.greys['dark-grey'])};
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    font-size: ${(props) => (props.isMobile ? '1rem' : '0.875rem')};
    height: ${(props) => (props.isMobile ? '48px' : '40px')};
    letter-spacing: 0.46px;
    padding: 0 var(--spacing-2x);

    &:disabled {
        background-color: ${(props) => props.theme.greys['light-grey']};
        color: ${(props) => props.theme.greys['mid-grey']};
    }

    &:first-child {
        border-color: ${(props) => props.theme.greys.grey};
        margin: 0;
    }

    &:focus {
        z-index: 1;
    }

    ${focus};

    &:hover {
        ${(props) => (props.pressed || props.disabled ? '' : `background-color: ${props.theme.greys.grey};`)}
    }
`;

interface ToggleButtonGroupProps {
    /**
     * Takes an array of objects containing all the buttons needed
     */
    buttonGroup: {
        defaultPressed?: boolean;
        disabled?: boolean;
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
                    disabled={button.disabled}
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
