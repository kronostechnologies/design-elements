import React, { ChangeEvent, FocusEvent, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { i18n } from '../../i18n/i18n';
import { FieldContainer } from '../field-container/field-container';
import { inputsStyle } from '../text-input/styles/inputs';

const StyledTextArea = styled.textarea`
    min-height: 6.5rem;
    min-width: 100%;
    ${props => inputsStyle(props.theme)}
    outline: none;
    overflow: auto;
    resize: vertical;
`;

export interface TextAreaProps {
    label: string;
    defaultValue?: string;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
    /**
    * Message displayed in case of validation error
    * @default This text area input is invalid
    **/
    validationErrorMessage?: string;
    /** Only use if you want to control input value externally */
    value?: string;

    onBlur?(event: FocusEvent<HTMLTextAreaElement>): void;
    onChange?(event: ChangeEvent<HTMLTextAreaElement>): void;
    onFocus?(event: FocusEvent<HTMLTextAreaElement>): void;
}

interface ValidityProps {
    validity: boolean;
}

export function TextArea({ onBlur, onChange, onFocus, ...props }: TextAreaProps): ReactElement {
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

    const { defaultValue, disabled, label, placeholder, required, validationErrorMessage, value } = props;

    return (
        <FieldContainer
            fieldId={id}
            label={label}
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

const Translation = {
    en: {
        validationErrorMessage: 'This text area input is invalid',
    },
    fr: {
        validationErrorMessage: 'Cette zone texte est invalide',
    },
};

i18n.addResources('en', 'text-area', Translation.en);
i18n.addResources('fr', 'text-area', Translation.fr);
