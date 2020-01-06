import React, { MouseEvent, useMemo, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;

  button:first-child {
    border-radius: 20px 0 0 20px;
  }

  button:last-child {
    border-radius: 0 20px 20px 0;
  }
`;

interface ToggleButtonProps {
    pressed: boolean;
    device: 'mobile' | 'desktop';
}

const ToggleButton = styled.button<ToggleButtonProps>`
  align-items: center;
  background-color: ${props => props.pressed ? props.theme.main['primary-1.1'] : props.theme.greys.white};
  border: 1px solid ${props => props.pressed ? props.theme.main['primary-1.1'] : props.theme.greys.grey};
  border-left: none;
  box-sizing: border-box;
  color: ${props => props.pressed ? props.theme.greys.white : props.theme.greys['dark-grey']};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  font-size: ${props => props.device === 'mobile' ? '1rem' : '0.875rem'};
  height: ${props => props.device === 'mobile' ? '48px' : '40px'};
  padding: 0 var(--spacing-2x);

  &:disabled {
    background-color: ${props => props.theme.greys['light-grey']};
    color: ${props => props.theme.greys['mid-grey']};
  }

  &:first-child {
    border-left: 1px solid ${props => props.pressed ? props.theme.main['primary-1.1'] : props.theme.greys.grey};
  }

  &:hover {
    ${props => props.pressed || props.disabled ? '' : `background-color: ${props.theme.greys.grey};`}
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
    }[];
    /**
     * Applies styles and sizes according to the device
     * @default desktop
     */
    device?: 'mobile' | 'desktop';
    /**
     * Sets common name for all buttons
     */
    groupName: string;
    onClick?(event: MouseEvent<HTMLButtonElement>): void;
}

export const ToggleButtonGroup = ({ buttonGroup, device = 'desktop', groupName, onClick }: ToggleButtonGroupProps) => {
    const defaultPressedButton = useMemo(() => buttonGroup.find(button => button.defaultPressed), []);
    const [selectedButton, setSelectedButton] = useState(defaultPressedButton ? defaultPressedButton.label : '');

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        selectedButton === event.currentTarget.value ?
          setSelectedButton('') :
          setSelectedButton(event.currentTarget.value);
        onClick && onClick(event);
    };

    return (
        <Container role="group" aria-label={groupName}>
            {buttonGroup.map((button, i) => (
                <ToggleButton
                  aria-label={button.label}
                  aria-pressed={button.label === selectedButton}
                  pressed={button.label === selectedButton}
                  data-testid={`test-toggle-button-${i}`}
                  device={device}
                  disabled={button.disabled}
                  key={`${groupName}-${button.label}`}
                  onClick={handleClick}
                  type="button"
                  value={button.label}
                >
                  {button.label}
                </ToggleButton>
            ))}
        </Container>
    );
};
