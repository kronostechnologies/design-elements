import React, { ChangeEvent, useMemo, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;

  div:first-child,
  input:first-child {
    border-radius: 104px 0 0 104px;
  }

  div:last-child,
  input:last-child {
    border-radius: 0 104px 104px 0;
  }
`;

interface ToggleButtonProps {
    checked: boolean;
    device: 'mobile' | 'desktop';
    disabled?: boolean;
}

const ToggleButton = styled.div<ToggleButtonProps>`
  align-items: center;
  background-color:
    ${(props) => {
        if (props.disabled) {
            return props.theme.greys['light-grey'];
        } else if (props.checked) {
            return props.theme.main['primary-1.1'];
        } else {
            return props.theme.greys.white;
        }
    }};
  border: 1px solid ${props => props.checked ? props.theme.main['primary-1.1'] : props.theme.greys.grey};
  border-left: none;
  box-sizing: border-box;
  color:
    ${(props) => {
        if (props.disabled) {
            return props.theme.greys['mid-grey'];
        } else if (props.checked) {
            return props.theme.greys.white;
        } else {
            return props.theme.greys['dark-grey'];
        }
    }};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  display: flex;
  font-size: ${props => props.device === 'mobile' ? '1rem' : '0.875rem'};
  height: ${props => props.device === 'mobile' ? '48px' : '40px'};
  padding: 0 var(--spacing-2x);
  position: relative;
  width: fit-content;

  &:first-child {
    border-left: 1px solid ${props => props.checked ? props.theme.main['primary-1.1'] : props.theme.greys.grey};
  }

  /* stylelint-disable-next-line */
  input {
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    height: 100%;
    left: 0;
    margin: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  label {
    text-align: center;
  }

  &:hover {
    ${props => props.checked || props.disabled ? '' : `background-color: ${props.theme.greys.grey};`}
  }
`;

interface ToggleButtonGroupProps {
    /**
     * Takes an array of objects containing all the buttons needed
     */
    buttonGroup: {
        defaultChecked?: boolean;
        disabled?: boolean;
        label: string;
        value: string;
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
    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const ToggleButtonGroup = ({ buttonGroup, device = 'desktop', groupName, onChange }: ToggleButtonGroupProps) => {
    const defaultCheck = useMemo(() => buttonGroup.find(button => button.defaultChecked), [buttonGroup]);
    const [selectedValue, setSelectedValue] = useState(defaultCheck ? defaultCheck.value : '');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
        onChange && onChange(event);
    };

    return (
        <Container role="radiogroup">
            {buttonGroup.map(button => (
                <ToggleButton
                    checked={button.value === selectedValue}
                    device={device}
                    disabled={button.disabled}
                    key={`${groupName}-${button.value}`}
                >
                    <input
                        aria-checked={button.value === selectedValue}
                        aria-labelledby={`${groupName}-${button.value}`}
                        checked={button.value === selectedValue}
                        disabled={button.disabled}
                        name={groupName}
                        onChange={handleChange}
                        role="radio"
                        type="radio"
                        value={button.value}
                    />
                    <label id={`${groupName}-${button.value}`}>
                        {button.label}
                    </label>
                </ToggleButton>
            ))}
        </Container>
    );
};
