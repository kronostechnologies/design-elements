import React, { useState } from 'react';
import styled from 'styled-components';

import style from '../styles/inputs';

import { FieldContainer } from '../field-container';

const StyledTextArea = styled.textarea`
  ${style}
  min-height: 6.5rem;
  min-width: 100%;
  outline: none;
  overflow: auto;
  resize: vertical;
`;

export interface TextAreaProps {
    defaultValue?: string;
    disabled?: boolean;
    id: string;
    label: string;
    onBlur?: ((...args: any[]) => void);
    onChange?: ((...args: any[]) => void);
    onFocus?: ((...args: any[]) => void);
    required?: boolean;
    validationErrorMessage?: string;
    value?: string;

    onBlur?(event: FocusEvent<HTMLTextAreaElement>): void;

    onChange?(event: ChangeEvent<HTMLTextAreaElement>): void;

    onFocus?(event: FocusEvent<HTMLTextAreaElement>): void;
}

interface ValueProps { value: string; }
interface ValidityProps { validity: boolean; }

const TextArea = ({ defaultValue, disabled, id, label, onBlur, onChange, onFocus, required, validMsg }: TextAreaProps) => {
    const [{ value }, setValue] = useState<ValueProps>({ value: defaultValue || '' });
    const [{ validity }, setValidity] = useState<ValidityProps>({ validity: true });

    const handleBlur = (event: any) => {
        const newValue = event.target.value;

        setValue({ value: newValue });
        setValidity({ validity: event.target.checkValidity() });

        if (typeof onBlur === 'function') {
            onBlur(newValue);
        }
    };

    const handleChange = (event: any) => {
        const newValue = event.target.value;
        setValue({ value: newValue });

        if (typeof onChange === 'function') {
            onChange(newValue);
        }
    };

    const { defaultValue, disabled, label, placeholder, required, validationErrorMessage, value } = props;

    return (
        <FieldContainer
            fieldId={id}
            label={label}
            valid={validity}
            validationErrorMessage={validationErrorMessage || 'This text area input is invalid'}
        >
            <StyledTextArea
                disabled={disabled}
                id={id}
                onBlur={event => handleBlur(event)}
                onChange={event => handleChange(event)}
                onFocus={handleFocus}
                required={required}
                value={value}
            />
        </FieldContainer>
    );
};

export { TextArea };
