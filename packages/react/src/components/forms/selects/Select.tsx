import React, { useState } from 'react';

import styled from 'styled-components';
import { Children } from '../../buttons/abstract-button';
import { FieldContainer } from '../field-container';
import styles from '../styles/inputs.js';

const StyledSelect = styled.select`
  ${styles}
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 0.75rem;
  position: relative;
`;

interface SelectProps {
    children: Children;
    id: string;
    label: string;
    options: any[];
    required?: boolean;
    valid: boolean;
    validMsg: string;
}

const Select = ({ children, id, label, options, required, valid, validMsg, ...props }: SelectProps) => {
    const [validity, setValidity] = useState(true);

    const selectOptions: object = options.map((option, i) => {
        const key = `${option.value}-${i}`;
        return <option key={key} value={option.value}>{option.label}</option>;
    });

    const handleCheckValidity = (event: any) => {
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
                onChange={event => handleCheckValidity(event)}
                required={required}
            >
                {selectOptions}
            </StyledSelect>
        </FieldContainer>
    );
};

export { Select };
