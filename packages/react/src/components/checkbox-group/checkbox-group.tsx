import { focus } from '@design-elements/utils/css-state';
import CheckMark from 'feather-icons/dist/icons/check.svg';
import React, { ChangeEvent, ReactElement } from 'react';
import styled from 'styled-components';
import { Theme } from '../theme-wrapper/theme-wrapper';

const Legend = styled.legend`
    font-size: 0.75rem;
    line-height: 1.25rem;
    margin-bottom: var(--spacing-1x);
    padding: 0;
`;

const StyledCheckMark = styled(CheckMark)`
    color: ${props => props.theme.greys.white};
    height: 100%;
    opacity: 0;
    position: absolute;
    width: 100%;
`;

const StyledLabel = styled.label`
    ${(props: {theme: Theme, disabled: boolean | undefined}) => {
        return `
            ${props.disabled ? '' : 'cursor: pointer;'}
            display: block;
            line-height: 1.5rem;
            padding-left: var(--spacing-3x);
            position: relative;
            user-select: none;

            &:not(:first-of-type) {
                margin-top: var(--spacing-1x);
            }

            input {
                height: 0;
                opacity: 0;
                position: absolute;
                width: 0;

                &:checked + .box {
                    background-color: ${props.theme.main['primary-1.1']};
                    border: 1px solid ${props.theme.main['primary-1.1']};

                    ${StyledCheckMark} {
                        opacity: 1;
                    }
                }

                ${focus(props, true, '&:focus + .box')}
            }

            .box {
                align-self: center;
                background-color: ${props.disabled ? props.theme.greys['light-grey'] : props.theme.greys.white};
                border: 1px solid ${props.disabled ? props.theme.greys.grey : props.theme.greys['dark-grey']};
                border-radius: var(--border-radius);
                box-sizing: border-box;
                display: inline-block;
                height: 16px;
                left: 0;
                position: absolute;
                top: 4px;
                width: 16px;
            }

            &:hover .box {
                border: 1px solid ${props.disabled ? props.theme.greys.grey : props.theme.main['primary-1.1']};
            }
        `;
    }}
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
                    key={checkbox.name + '-' + checkbox.value}
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
