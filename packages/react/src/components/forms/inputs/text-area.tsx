import React, { ChangeEvent, FocusEvent, useState } from 'react';
import styled from 'styled-components';

import { styles } from '../styles/inputs';

import { FieldContainer } from '../field-container';

const StyledTextArea = styled.textarea`
  ${styles}
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
    onBlur?: ((event: FocusEvent<HTMLTextAreaElement>) => void);
    onChange?: ((event: ChangeEvent<HTMLInputElement> | string) => void);
    onFocus?: ((...args: any[]) => void);
    required?: boolean;
    validMsg: string;
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

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
            validMsg={validMsg || 'This text area input is invalid'}
        >
            <StyledTextArea
                disabled={disabled}
                id={id}
                onBlur={(event: FocusEvent<HTMLTextAreaElement>) => {handleBlur(event); }}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {handleChange(event); }}
                onFocus={handleFocus}
                required={required}
                value={value}
            />
        </FieldContainer>
    );
};

export { TextArea };
