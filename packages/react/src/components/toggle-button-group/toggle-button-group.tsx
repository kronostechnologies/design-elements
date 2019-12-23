import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;

  div:first-child,
  input:first-child {
    border-radius: 100px 0 0 100px;
  }

  div:last-child,
  input:last-child {
    border-radius: 0 100px 100px 0;
  }
`;

interface ToggleButtonProps {
    checked: boolean;
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
  height: 40px;
  padding: 0 16px;
  position: relative;
  width: fit-content;

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

  &:hover {
    ${props => props.checked || props.disabled ? '' : `background-color: ${props.theme.greys.grey}`}
  }
`;

interface Button {
    disabled?: boolean;
    label: string;
    value: string;
}

interface ToggleButtonGroupProps {
    groupName: string;
    buttonGroup: Button[];
    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const ToggleButtonGroup = ({ buttonGroup, groupName, onChange }: ToggleButtonGroupProps) => {
    const [selectedValue, setSelectedValue] = useState();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
        onChange && onChange(event);
    };

    return (
        <Container>
            {buttonGroup.map(button => (
                <ToggleButton
                    checked={button.value === selectedValue}
                    disabled={button.disabled}
                    key={`${groupName}-${button.value}`}
                >
                    <input
                        checked={button.value === selectedValue}
                        disabled={button.disabled}
                        name={groupName}
                        onChange={handleChange}
                        type="radio"
                        value={button.value}
                    />{button.label}
                </ToggleButton>
            ))}
        </Container>
    );
};
