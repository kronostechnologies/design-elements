import React, { ChangeEvent, Fragment, ReactElement } from 'react';
import styled from 'styled-components';

import CheckMark from '../../../icons/check.svg';

const StyledCheckMark = styled(CheckMark)`
    color: white;
    opacity: 0;
    font-weight: bold;
    height: 16px;
    width: 16px;
`;

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
        &:checked + .box {
            background-color: #0080a5;
            border: 1px solid #0080a5;
            ${StyledCheckMark} {
                opacity: 1;
            }
        }
    }
    .box {
        align-self: center;
        background-color: ${(props: {disabled?: boolean}) => props.disabled ? '#f1f2f2' : '#ffffff'};
        border: 1px solid ${(props: {disabled?: boolean}) => props.disabled ? '#d9dde2' : '#57666e'};
        border-radius: 5px;
        display: inline-block;
        height: 16px;
        left: 0;
        margin-top: 2px;
        position: absolute;
        top: 0;
        width: 16px;
    }
    &:hover .box {
        border: 1px solid ${(props: {disabled?: boolean}) => props.disabled ? '#d9dde2' : '#0080a5'};
    }
`;

interface CheckboxProps {
    label?: string;
    checkboxes: {
        label: string,
        name: string,
        value: string,
        defaultChecked?: boolean,
        disabled?: boolean,
    }[];
    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export function Checkbox({ label, checkboxes, onChange }: CheckboxProps): ReactElement  {
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <Fragment>
            <label style={{ fontSize: '0.75rem' }}>{label}</label>
            {checkboxes.map((checkbox, key) => (
                <StyledLabel
                    disabled={checkbox.disabled}
                    key={checkbox.name + '-' + key}
                    style={key === 0 ? { marginTop: '7px' } : {}}
                > {checkbox.label}
                    <input
                        type="checkbox"
                        name={checkbox.name}
                        value={checkbox.value}
                        defaultChecked={checkbox.defaultChecked}
                        disabled={checkbox.disabled}
                        onChange={handleChange}
                    />
                    <span className="box"><StyledCheckMark className="checkMark"/></span>
                </StyledLabel>
            ))}
        </Fragment>
    );
}
