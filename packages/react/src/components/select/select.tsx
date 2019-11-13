import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';

import styled from 'styled-components';
import uuid from 'uuid/v4';
import { ChooseInput } from '../choose-input/choose-input';
import { FieldContainer } from '../field-container/field-container';
import { inputsStyle } from '../text-input/styles/inputs';

const StyledSelect = styled.select`
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 0.75rem;
  ${props => inputsStyle(props.theme)}
  position: relative;
`;

interface SelectProps {
    options: { label: string; value?: string }[];
    label?: string;
    required?: boolean;
    /** Optional parameter to allow user to skip question */
    skipOption?: { label: string; value?: string };
    /**
    * Message displayed in case of validation error
    * @default You must select an option
    **/
    validationErrorMessage?: string;
    name?: string;
    /** Only use to control input value externally */
    value?: string;

    onChange(event: ChangeEvent<HTMLSelectElement | HTMLInputElement>): void;
}

export function Select({ onChange, options, ...props }: SelectProps): ReactElement {
    const [{ valid }, setValid] = useState({ valid: true });
    const id = uuid();

    const selectRef = useRef<HTMLSelectElement | null>(null);
    const [skipSelected, setSkipSelected] = useState(false);

    const selectOptions = options.map((option, i) => {
        const key = `${option.value}-${i}`;
        return <option key={key} value={option.value}>{option.label}</option>;
    });

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
        setSkipSelected(false);
        setValid({ valid: event.target.checkValidity() });

        if (onChange) {
            onChange(event);
        }
    }

    function handleSkipChange(event: ChangeEvent<HTMLInputElement>): void {
        const selectElement = selectRef.current;
        if (selectElement) {
            const checked = !skipSelected;
            if (checked) {
                selectElement.value = '';
                setValid({ valid: true });
            }

            setSkipSelected(checked);
            if (onChange) {
                onChange(event);
            }
        }
    }

    const { label, name, required, skipOption, validationErrorMessage, value } = props;

    return (
        <>
            <FieldContainer
                fieldId={id}
                label={label}
                valid={valid}
                validationErrorMessage={validationErrorMessage || 'You must select an option'}
            >
                <StyledSelect
                    id={id}
                    onChange={handleSelectChange}
                    name={name}
                    required={required}
                    ref={selectRef}
                    value={value}
                >
                    {selectOptions}
                </StyledSelect>
            </FieldContainer>
            {skipOption && (
                <ChooseInput
                    groupName={`${id}_skip`}
                    onChange={handleSkipChange}
                    checked={skipSelected}
                    type="radio"
                    value={skipOption.value}
                >
                    {skipOption.label}
                </ChooseInput>
            )}
        </>
    );
}
