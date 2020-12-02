import { useTranslation } from '@design-elements/i18n/i18n';
import React, { ChangeEvent, FocusEvent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { FieldContainer } from '../field-container/field-container';
import { inputsStyle } from '../text-input/styles/inputs';

const StyledTextArea = styled.textarea`
    min-height: 6.5rem;
    min-width: 100%;
    ${(props) => inputsStyle(props.theme)}
    outline: none;
    overflow: auto;
    resize: vertical;
`;

export interface TextAreaProps {
    label: string;
    defaultValue?: string;
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    placeholder?: string;
    required?: boolean;
    /**
    * Message displayed in case of validation error
    * @default This text area input is invalid
    */
    validationErrorMessage?: string;
    /** Only use if you want to control input value externally */
    value?: string;
    hint?: string;

    onBlur?(event: FocusEvent<HTMLTextAreaElement>): void;
    onChange?(event: ChangeEvent<HTMLTextAreaElement>): void;
    onFocus?(event: FocusEvent<HTMLTextAreaElement>): void;
}

interface ValidityProps {
    validity: boolean;
}

export function TextArea({
    noMargin,
    onBlur,
    onChange,
    onFocus,
    hint,
    ...props
}: TextAreaProps): ReactElement {
    const { t } = useTranslation('text-area');
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

    const {
        defaultValue, disabled, label, placeholder, required, validationErrorMessage, value,
    } = props;

    return (
        <FieldContainer
            noMargin={noMargin}
            fieldId={id}
            label={label}
            hint={hint}
            valid={validity}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
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
