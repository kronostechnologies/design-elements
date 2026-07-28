import { ChangeEvent, type FC } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { Checkbox } from '../checkbox';

const Legend = styled.legend`
    font-size: 0.75rem;
    line-height: 1.25rem;
    margin-bottom: var(--spacing-1x);
    padding: 0;
`;

export interface CheckboxGroupItem {
    label: string,
    name: string,
    value: string,
    defaultChecked?: boolean,
    disabled?: boolean,
}

export interface CheckboxGroupProps {
    label?: string;
    checkedValues?: string[];
    checkboxGroup: CheckboxGroupItem[];

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
    label,
    checkedValues,
    checkboxGroup,
    onChange,
    ...props
}) => {
    const dataAttributes = useDataAttributes(props);
    const dataTestId = dataAttributes['data-testid'] ?? 'checkboxGroup';

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
                    data-testid={`${dataTestId}-${value}`}
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
};

CheckboxGroup.displayName = 'CheckboxGroup';
