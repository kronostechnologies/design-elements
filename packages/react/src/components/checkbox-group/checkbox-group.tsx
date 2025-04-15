import { ChangeEvent, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { Checkbox } from '../checkbox/checkbox';
import { useTranslation } from '../../i18n/use-translation';
import { useId } from '../../hooks/use-id';
import { InvalidField } from '../feedbacks/invalid-field';

const Legend = styled.legend`
    font-size: 0.75rem;
    line-height: 1.25rem;
    margin-bottom: var(--spacing-1x);
    padding: 0;
`;

const InvalidFieldContainer = styled.div`
    margin: calc(var(--spacing-1x) * -1) 0 0 var(--spacing-1x);
    padding-bottom: var(--spacing-1x);
`;

interface CheckboxProps {
    id?: string;
    label?: string;
    checkedValues?: string[];
    required?: boolean;
    valid?: boolean;
    validationErrorMessage?: string;
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
    id: providedId,
    label,
    checkedValues,
    checkboxGroup,
    required,
    valid = true,
    validationErrorMessage,
    onChange,
    ...props
}) => {
    const { t } = useTranslation('checkbox-group');
    const id = useId(providedId);
    const dataAttributes = useDataAttributes(props);
    const dataTestId = dataAttributes['data-testid'] ?? 'checkboxGroup';

    const [checkedState, setCheckedState] = useState(
        new Array(checkboxGroup.length).fill(false),
    );
    const areAllCheckboxUnchecked = checkedState.every((e) => e === false);

    const handleOnChange = (position: number): void => {
        const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));

        setCheckedState(updatedCheckedState);
    };

    return (
        <>
            {label && <Legend>{label}</Legend>}
            {
                required && !valid && areAllCheckboxUnchecked
                && (
                    <InvalidFieldContainer>
                        <InvalidField
                            controlId={id}
                            feedbackMsg={validationErrorMessage || t('validationErrorMessage')}
                        />
                    </InvalidFieldContainer>
                )
            }
            {checkboxGroup.map(({
                defaultChecked,
                disabled,
                label: checkboxLabel,
                name,
                value,
            }, pos) => (
                <Checkbox
                    key={`${name}-${value}`}
                    checked={checkedValues?.includes(value)}
                    data-testid={`${dataTestId}-${value}`}
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                    label={checkboxLabel}
                    name={name}
                    valid={required ? valid || !areAllCheckboxUnchecked : valid}
                    value={value}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        handleOnChange(pos);
                        onChange?.(event);
                    }}
                />
            ))}
        </>
    );
};
