import React, { ChangeEvent, useState } from 'react';
import uuid from 'uuid/v4';

import styled from 'styled-components';
import { FieldContainer } from '../field-container';
import { inputsStyle } from '../styles/inputs';

const StyledTextArea = styled.textarea`
  ${inputsStyle}
  min-height: 6.5rem;
  min-width: 100%;
  outline: none;
  overflow: auto;
  resize: vertical;
`;

export interface TextAreaProps {
    defaultValue?: string;
    disabled?: boolean;
    label: string;
    required?: boolean;
    validMsg?: string;
    blurCallback?(value: string): void;
    changeCallback?(value: string): void;
    focusCallback?(value: string): void;
}

interface ValueProps { value: string; }
interface ValidityProps { validity: boolean; }

const TextArea = ({ defaultValue, disabled, label, blurCallback, changeCallback, focusCallback, required, validMsg }: TextAreaProps) => {
    const [{ value }, setValue] = useState<ValueProps>({ value: defaultValue || '' });
    const [{ validity }, setValidity] = useState<ValidityProps>({ validity: true });
    const id = uuid();

    const handleBlur = (event: any) => {
        const newValue = event.target.value;

        setValue({ value: newValue });
        setValidity({ validity: event.target.checkValidity() });

        if (blurCallback) {
            blurCallback(newValue);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
            validMsg={validMsg || 'This text area input is invalid'}
        >
            <StyledTextArea
                disabled={disabled}
                id={id}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                required={required}
                value={value}
            />
        </FieldContainer>
    );
};

export { TextArea };
