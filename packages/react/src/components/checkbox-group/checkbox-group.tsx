import { ChangeEvent, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
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

export const CheckboxGroup: VoidFunctionComponent<CheckboxProps> = ({
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
