import React, { useState } from 'react';
import styled from 'styled-components';

import style from '../styles/inputs';

import FieldContainer from '../field-container';

const Input = styled.input`
  ${style}
`;

const TextInput = ({ defaultValue, disabled, id, label, onBlur, onChange, onFocus, pattern, placeholder, required, type, validMsg }) => {
    const [{ value }, setValue] = useState({ value: defaultValue || '' });
    const [{ validity }, setValidity] = useState({ validity: true });

    const handleBlur = event => {
        const newValue = event.target.value;

        setValue({ value: newValue });
        setValidity({ validity: event.target.checkValidity() });

        if (typeof onBlur === 'function') {
            onBlur(newValue);
        }
    };

    const handleChange = event => {
        const newValue = event.target.value;
        setValue({ value: newValue });

        if (typeof onChange === 'function') {
            onChange(newValue);
        }
    };

    const handleFocus = () => {
        if (typeof onFocus === 'function') {
            onFocus(value);
        }
    };

    return (
        <FieldContainer
            fieldId={id}
            label={label}
            valid={validity}
            validMsg={validMsg || 'This text input is invalid'}
        >
            <Input
                disabled={disabled}
                id={id}
                onBlur={event => handleBlur(event)}
                onChange={event => handleChange(event)}
                onFocus={event => handleFocus(event)}
                pattern={pattern}
                placeholder={placeholder}
                required={required}
                type={type || 'text'}
                value={value}
            />
        </FieldContainer>
    );
};

export default TextInput;
