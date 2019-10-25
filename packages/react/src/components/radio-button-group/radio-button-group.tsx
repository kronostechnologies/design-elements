import React, { ChangeEvent, ReactElement } from 'react';

import styled from 'styled-components';
import { equisoftTheme } from '../../themes/equisoft';

const Legend = styled.legend`
  font-size: 0.75rem;
  margin-bottom: 8px;
  padding: 0;
`;

const StyledLabel = styled.label `
    ${(props: {theme?: Theme, disabled?: boolean}) => {
        let theme = props.theme;
        if (theme) {
            if (Object.entries(theme).length === 0 && theme.constructor === Object) {
                theme = equisoftTheme;
            }
        } else {
            theme = equisoftTheme;
        }
        return (`
        ${props.disabled ? '' : 'cursor: pointer;'};
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
                background-color: ${theme.main['primary-1.1']};
                border: 1px solid ${theme.main['primary-1.1']};

                &::after {
                    background-color: ${theme.greys.white};
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
            background-color: ${props.disabled ? theme.greys['light-grey'] : theme.greys.white};
            border: 1px solid ${props.disabled ? theme.greys.grey : theme.greys['dark-grey']};
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
            border: 1px solid ${props.disabled ? theme.greys.grey : theme.main['primary-1.1']};
        }
        `);
    }}
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
                    key={groupName + '-' + button.value}
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
