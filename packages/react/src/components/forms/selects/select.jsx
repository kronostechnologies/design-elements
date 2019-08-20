import React, { useRef, useState } from 'react';

import styled from 'styled-components';
import styles from '../styles/inputs.js';

import FieldContainer from '../field-container';
import ChooseInput from '../../choosers/controls/choose-input';

const StyledSelect = styled.select`
  ${styles}
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 0.75rem;
  position: relative;
`;

const Select = ({ id, label, onChange, options, required, skipLabel, validMsg }) => {
    const [{ validity }, setValidity] = useState({ validity: true });

    const selectRef = useRef(null);
    const skipRef = useRef(null);

    const selectOptions = options.map((option, i) => {
        const key = `${option.value}-${i}`;
        return <option key={key} value={option.value}>{option.label}</option>;
    });

    const handleSelectChange = event => {
        skipRef.current.checked = false;
        setValidity({ validity: event.target.checkValidity() });

        if (typeof onChange === 'function') {
            onChange(event.target.value);
        }
    };

    const handleSkipChange = () => {
        if (skipRef.current.checked) {
            selectRef.current.value = '';
            setValidity({ validity: true });
        }

        onChange(skipRef.current.checked ? 'skip' : selectRef.current.value);
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
                    id={`${id}_skip`}
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

export default Select;
