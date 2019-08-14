import React, { useState } from 'react';

import styled from 'styled-components';
import styles from '../styles/inputs.js';
import FieldContainer from '../field-container';

const StyledSelect = styled.select`
  ${styles}
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 0.75rem;
  position: relative;
`;

const Select = ({ id, label, onChange, options, required, valid, validMsg, ...props }) => {
    const [validity, setValidity] = useState(true);

    const selectOptions = options.map((option, i) => {
        const key = `${option.value}-${i}`;
        return <option key={key} value={option.value}>{option.label}</option>;
    });

    const handleChange = event => {
        if (typeof onChange === 'function') {
            onChange(event.target.selectedOptions[0].value);
        }
    };

    const handleCheckValidity = event => {
        setValidity(event.target.checkValidity());
    };

    return (
        <FieldContainer
            fieldId={id}
            label={label}
            valid={validity}
            validMsg={validMsg || 'You must select an option'}
        >
            <StyledSelect
                {...props}
                id={id}
                onBlur={event => handleCheckValidity(event)}
                onChange={event => handleChange(event)}
                required={required}
            >
                {selectOptions}
            </StyledSelect>
        </FieldContainer>
    );
};

export default Select;
