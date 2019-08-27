import React, { ChangeEvent, useState } from 'react';
import uuid from 'uuid/v4';

import styled from 'styled-components';
import { FieldContainer } from '../field-container';
import { inputsStyle } from '../styles/inputs';
import { TextAreaProps } from './text-area';

const Input = styled.input`
  ${inputsStyle}
`;

interface TextInputProps extends TextAreaProps {
    pattern?: string;
    placeholder?: string;
    type?: string;
}

const TextInput = ({ defaultValue, disabled, label, blurCallback, changeCallback, focusCallback, pattern, placeholder, required, type, validMsg }: TextInputProps) => {
    const [{ value }, setValue] = useState({ value: defaultValue || '' });
    const [{ validity }, setValidity] = useState({ validity: true });
    const id = uuid();

    const handleBlur = (event: any) => {
        const newValue = event.target.value;

        setValue({ value: newValue });
        setValidity({ validity: event.target.checkValidity() });

        if (blurCallback) {
            blurCallback(newValue);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue({ value: newValue });

        if (changeCallback) {
            changeCallback(newValue);
        }
    };

    const handleFocus = () => {
        if (focusCallback) {
            focusCallback(value);
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
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                pattern={pattern}
                placeholder={placeholder}
                required={required}
                type={type || 'text'}
                value={value}
            />
        </FieldContainer>
    );
};

export { TextInput };
