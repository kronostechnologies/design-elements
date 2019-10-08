import React, { ChangeEvent, Fragment, ReactElement } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label `
    ${(props: {disabled?: boolean}) => props.disabled ? null : 'cursor: pointer;'}
    display: block;
    font-size: 0.875rem;
    padding-left: 25px;
    position: relative;
    margin: 15px 0 0 0;
    user-select: none;
    input {
        display: none;
        &:checked + .circle {
            background-color: #0080a5;
            border: 1px solid #0080a5;
            &:after {
                background-color: white;
                border-radius: 50%;
                content: "";
                height: 7px;
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 7px;
            }
        }
    }
    .circle {
        align-self: center;
        background-color: ${(props: {disabled?: boolean}) => props.disabled ? '#f1f2f2' : '#ffffff'};
        border: 1px solid ${(props: {disabled?: boolean}) => props.disabled ? '#d9dde2' : '#57666e'};
        border-radius: 50%;
        display: inline-block;
        height: 16px;
        left: 0;
        margin-top: 2px;
        position: absolute;
        top: 0;
        width: 16px;
    }
    &:hover .circle {
        border: 1px solid ${(props: {disabled?: boolean}) => props.disabled ? '#d9dde2' : '#0080a5'};
    }
`;

interface RadioButtonProps {
    label?: string;
    /** Sets the name property of all buttons */
    groupName: string;
    buttons: {
        label: string,
        value: string,
        defaultChecked?: boolean,
        disabled?: boolean,
    }[];
    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export function RadioButton({ buttons, groupName, label, onChange }: RadioButtonProps): ReactElement  {
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <Fragment>
            <label style={{ fontSize: '0.75rem' }}>{label}</label>
            {buttons.map((button, key) => (
                <StyledLabel
                    disabled={button.disabled}
                    key={groupName + '-' + key}
                    style={key === 0 ? { marginTop: '7px' } : {}}
                > {button.label}
                    <input
                        type="radio"
                        name={groupName}
                        value={button.value}
                        defaultChecked={button.defaultChecked}
                        disabled={button.disabled}
                        onChange={handleChange}
                    />
                    <span className="circle" />
                </StyledLabel>
            ))}
        </Fragment>
    );
}
