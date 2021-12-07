import { ChangeEvent, ReactElement } from 'react';
import styled from 'styled-components';
import { Checkbox } from '../checkbox/checkbox';

const Legend = styled.legend`
    font-size: 0.75rem;
    line-height: 1.25rem;
    margin-bottom: var(--spacing-1x);
    padding: 0;
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

export function CheckboxGroup({
    label, checkedValues, checkboxGroup, onChange,
}: CheckboxProps): ReactElement {
    return (
        <>
            {label && <Legend>{label}</Legend>}
            {checkboxGroup.map(({
                defaultChecked,
                disabled,
                label: checkboxLabel,
                name,
                value,
            }) => (
                <Checkbox
                    key={`${name}-${value}`}
                    checked={checkedValues?.includes(value)}
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                    label={checkboxLabel}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            ))}
        </>
    );
}
