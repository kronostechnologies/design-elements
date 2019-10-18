import React, { ChangeEvent, ReactElement } from 'react';

import CheckMark from 'feather-icons/dist/icons/check.svg';
import styled from 'styled-components';
import uuid from 'uuid/v4';

const Legend = styled.legend`
    font-size: 0.75rem;
    margin-bottom: 8px;
    padding: 0;
`;

const StyledCheckMark = styled(CheckMark)`
    color: #fff;
    height: 100%;
    opacity: 0;
    width: 100%;
`;

const StyledLabel = styled.label `
    ${(props: {disabled?: boolean}) => props.disabled ? null : 'cursor: pointer;'}
    display: block;
    font-size: 0.875rem;
    padding-left: 24px;
    position: relative;
    user-select: none;

    &:not(:first-of-type) {
        margin-top: 16px;
    }

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
        background-color: ${(props: {disabled?: boolean}) => props.disabled ? '#f1f2f2' : '#fff'};
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
    checkedValues?: string[];
    checkboxGroup: {
        label: string,
        name: string,
        value: string,
        defaultChecked?: boolean,
        disabled?: boolean,
    }[];
    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export function CheckboxGroup({ label, checkedValues, checkboxGroup, onChange }: CheckboxProps): ReactElement  {
    return (
        <>
            {label && <Legend>{label}</Legend>}
            {checkboxGroup.map((checkbox) => (
                <StyledLabel
                    disabled={checkbox.disabled}
                    key={uuid()}
                > {checkbox.label}
                    <input
                        type="checkbox"
                        name={checkbox.name}
                        value={checkbox.value}
                        checked={checkedValues ? checkedValues.includes(checkbox.value) : undefined}
                        defaultChecked={checkbox.defaultChecked}
                        disabled={checkbox.disabled}
                        onChange={onChange}
                    />
                    <span className="box"><StyledCheckMark className="checkMark"/></span>
                </StyledLabel>
            ))}
        </>
    );
}
