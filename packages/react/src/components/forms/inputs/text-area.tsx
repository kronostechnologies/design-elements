import React, { ChangeEvent, FocusEvent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';

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
    placeholder?: string;
    required?: boolean;
    validationErrorMessage?: string;
    value?: string;

    onBlur?(event: FocusEvent<HTMLTextAreaElement>): void;

    onChange?(event: ChangeEvent<HTMLTextAreaElement>): void;

    onFocus?(event: FocusEvent<HTMLTextAreaElement>): void;
}

interface ValidityProps {
    validity: boolean;
}

const TextArea = ({ defaultValue, disabled, label, blurCallback, changeCallback, focusCallback, required, validationErrorMessage }: TextAreaProps) => {
    const [{ value }, setValue] = useState<ValueProps>({ value: defaultValue || '' });
    const [{ validity }, setValidity] = useState<ValidityProps>({ validity: true });
    const id = uuid();

    function handleBlur(event: FocusEvent<HTMLTextAreaElement>): void {
        setValidity({ validity: event.currentTarget.checkValidity() });

        if (onBlur) {
            onBlur(event);
        }
    }

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        if (onChange) {
            onChange(event);
        }
    }

    function handleFocus(event: FocusEvent<HTMLTextAreaElement>): void {
        if (onFocus) {
            onFocus(event);
        }
    }

    const { defaultValue, disabled, label, placeholder, required, validMsg, value } = props;

    return (
        <FieldContainer
            fieldId={id}
            label={label}
            valid={validity}
            validationErrorMessage={validationErrorMessage || 'This text area input is invalid'}
        >
            <StyledTextArea
                defaultValue={defaultValue}
                disabled={disabled}
                id={id}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder={placeholder}
                required={required}
                value={value}
            />
        </FieldContainer>
    );
}
