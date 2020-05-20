import React, { ChangeEvent, DetailedHTMLProps, FocusEvent, InputHTMLAttributes, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { i18n } from '../../i18n/i18n';
import { FieldContainer } from '../field-container/field-container';
import { inputsStyle } from './styles/inputs';

const Input = styled.input`
    ${props => inputsStyle(props.theme)}
`;

type inputModeType = 'none' | 'numeric' | 'tel' | 'decimal' | 'email' | 'url' | 'search';

type PartialInputProps = Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'inputMode' | 'value'>;

interface TextInputProps extends PartialInputProps {
    defaultValue?: string;
    disabled?: boolean;
    inputMode?: inputModeType;
    label?: string;
    pattern?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    validationErrorMessage?: string;

    onBlur?(event: FocusEvent<HTMLInputElement>): void;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;

    onFocus?(event: FocusEvent<HTMLInputElement>): void;
}

export const TextInput = React.forwardRef(
    ({ onBlur, onChange, onFocus, ...props }: TextInputProps, ref: React.Ref<HTMLInputElement>): ReactElement => {
        const { t } = useTranslation('text-input', { useSuspense: false });
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

        const {
            defaultValue,
            disabled,
            inputMode,
            label,
            pattern,
            placeholder,
            required,
            type,
            validationErrorMessage,
            value,
        } = props;

        return (
            <FieldContainer
                fieldId={id}
                label={label}
                valid={validity}
                validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            >
                <Input
                    defaultValue={defaultValue}
                    disabled={disabled}
                    id={id}
                    inputMode={inputMode}
                    ref={ref}
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
    },
);

const Translation = {
    en: {
        validationErrorMessage: 'This input is invalid',
    },
    fr: {
        validationErrorMessage: 'Ce champ est invalide',
    },
};

i18n.addResources('en', 'text-input', Translation.en);
i18n.addResources('fr', 'text-input', Translation.fr);
