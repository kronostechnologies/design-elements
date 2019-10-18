import React, { ChangeEvent, ReactElement } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';

const Legend = styled.legend`
    font-size: 0.75rem;
    margin-bottom: 8px;
    padding: 0;
`;

const StyledLabel = styled.label `
    ${(props: {disabled?: boolean}) => props.disabled ? null : 'cursor: pointer;'};
    display: block;
    font-size: 0.875rem;
    padding-left: 24px;
    position: relative;
    user-select: none;

    &:not(:first-of-type) {
        margin-top: 16px;
    }

    input {
        height: 16px;
        left: 0;
        margin: 0;
        opacity: 0;
        position: absolute;
        top: 2px;
        width: 16px;

        &:checked + .radioInput {
            background-color: #0080a5;
            border: 1px solid #0080a5;

            &::after {
                background-color: #fff;
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

    .radioInput {
        background-color: ${(props: {disabled?: boolean}) => props.disabled ? '#f1f2f2' : '#fff'};
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

    &:hover .radioInput {
        border: 1px solid ${(props: {disabled?: boolean}) => props.disabled ? '#d9dde2' : '#0080a5'};
    }
`;

interface RadioButtonGroupProps {
    label?: string;
    /** Sets the name property of all buttons */
    groupName: string;
    checkedValue?: string;
    buttons: {
        label: string,
        value: string,
        defaultChecked?: boolean,
        disabled?: boolean,
    }[];
    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export function RadioButtonGroup(
    { buttons, groupName, label, onChange, checkedValue }: RadioButtonGroupProps): ReactElement  {
    return (
        <>
            {label && <Legend>{label}</Legend>}
            {buttons.map((button) => (
                <StyledLabel
                    disabled={button.disabled}
                    key={uuid()}
                > {button.label}
                    <input
                        type="radio"
                        name={groupName}
                        value={button.value}
                        checked={checkedValue ? checkedValue === button.value : undefined}
                        defaultChecked={button.defaultChecked}
                        disabled={button.disabled}
                        onChange={onChange}
                    />
                    <span className="radioInput" />
                </StyledLabel>
            ))}
        </>
    );
}
