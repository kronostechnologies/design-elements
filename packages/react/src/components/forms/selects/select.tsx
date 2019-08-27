import React, { ChangeEvent, ReactNode, useRef, useState } from 'react';
import uuid from 'uuid/v4';

import styled from 'styled-components';
import { ChooseInput } from '../../choosers/controls/choose-input';
import { FieldContainer } from '../field-container';
import { inputsStyle } from '../styles/inputs';

const StyledSelect = styled.select`
  ${inputsStyle}
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 0.75rem;
  position: relative;
`;

interface SelectProps {
    children?: ReactNode;
    label: string;
    options: any[];
    required?: boolean;
    skipLabel?: string;
    valid?: boolean;
    validMsg?: string;
    onChange(value: string): void;
}

const Select = ({ label, onChange, options, required, skipLabel, validMsg }: SelectProps) => {
    const [{ validity }, setValidity] = useState({ validity: true });
    const id = uuid();

    const selectRef = useRef<HTMLSelectElement>(null);
    const skipRef = useRef<HTMLInputElement>(null);

    const selectOptions = options.map((option, i) => {
        const key = `${option.value}-${i}`;
        return <option key={key} value={option.value}>{option.label}</option>;
    });

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        if (skipRef.current) {
            skipRef.current.checked = false;
        }
        setValidity({ validity: event.target.checkValidity() });

        if (typeof onChange === 'function') {
            onChange(event.target.value);
        }
    };

    const handleSkipChange = () => {
        if (selectRef.current && skipRef.current) {
            if (skipRef.current.checked) {
                selectRef.current.value = '';
                setValidity({ validity: true });
            }

            onChange(skipRef.current.checked ? 'skip' : selectRef.current.value);
        }
    };

    return (
        <>
            <FieldContainer
                fieldId={id}
                label={label}
                valid={validity}
                validMsg={validMsg || 'You must select an option'}
            >
                <StyledSelect
                    id={id}
                    onChange={handleSelectChange}
                    required={required}
                    ref={selectRef}
                >
                    {selectOptions}
                </StyledSelect>
            </FieldContainer>
            { skipLabel && (
                <ChooseInput
                    groupName="provinces"
                    onChange={handleSkipChange}
                    ref={skipRef}
                    type="checkbox"
                    value="skip"
                >
                    {skipLabel}
                </ChooseInput>
            )}
        </>
    );
};

export { Select };
