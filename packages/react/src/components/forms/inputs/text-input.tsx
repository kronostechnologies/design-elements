import React, { ChangeEvent, DetailedHTMLProps, FocusEvent, InputHTMLAttributes, ReactElement, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { FieldContainer } from '../field-container';

import { inputsStyle } from '../styles/inputs';

const Input = styled.input`
  ${inputsStyle}
`;

type PartialInputProps = Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'inputMode' | 'value'>;

interface TextInputProps extends PartialInputProps {
    defaultValue?: string;
    disabled?: boolean;
    label?: string;
    pattern?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    validMsg?: string;

    onBlur?(event: FocusEvent<HTMLInputElement>): void;

const TextInput = ({ defaultValue, disabled, label, blurCallback, changeCallback, focusCallback, pattern, placeholder, required, type, validationErrorMessage }: TextInputProps) => {
    const [{ value }, setValue] = useState({ value: defaultValue || '' });
    const [{ validity }, setValidity] = useState({ validity: true });
    const id = uuid();

    onFocus?(event: FocusEvent<HTMLInputElement>): void;
}

const TextInput = React.forwardRef(
    ({ onBlur, onChange, onFocus, ...props }: TextInputProps, ref: React.Ref<HTMLInputElement>): ReactElement => {
        const [{ validity }, setValidity] = useState({ validity: true });
        const id = uuid();

        function handleBlur(event: FocusEvent<HTMLInputElement>): void {
            setValidity({ validity: event.currentTarget.checkValidity() });

            if (onBlur) {
                onBlur(event);
            }
        }

        function handleChange(event: ChangeEvent<HTMLInputElement>): void {
            if (onChange) {
                onChange(event);
            }
        }

        function handleFocus(event: FocusEvent<HTMLInputElement>): void {
            if (onFocus) {
                onFocus(event);
            }
        }
    };

    return (
        <FieldContainer
            fieldId={id}
            label={label}
            valid={validity}
            validationErrorMessage={validationErrorMessage || 'This text input is invalid'}
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
