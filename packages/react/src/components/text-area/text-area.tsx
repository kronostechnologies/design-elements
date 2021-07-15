import React, { ChangeEvent, FocusEvent, ReactElement, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { v4 as uuid } from '../../utils/uuid';
import { FieldContainer } from '../field-container/field-container';
import { inputsStyle } from '../text-input/styles/inputs';
import { Theme } from '../../themes';

const StyledTextArea = styled.textarea`
    ${(props) => inputsStyle(props.theme)};

    min-height: 6.5rem;
    min-width: 100%;
    outline: none;
    overflow: auto;
    resize: vertical;
`;

const Counter = styled.div<{ valid: boolean, theme: Theme }>`
    color: ${({ valid, theme }) => (valid ? `${theme.greys['dark-grey']}` : `${theme.notifications['alert-2.1']}`)};
    font-size: 0.75rem;
    letter-spacing: 0.02rem;
    line-height: 1.25rem;
`;

export interface TextAreaProps {
    className?: string;
    label: string;
    defaultValue?: string;
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    placeholder?: string;
    required?: boolean;
    maxLength?: number;
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

function getInitialValue(value?: string, defaultValue?: string): number {
    if (value) {
        return value.length;
    }
    if (defaultValue) {
        return defaultValue.length;
    }
    return 0;
}

export function TextArea({
    className,
    noMargin,
    onBlur,
    onChange,
    onFocus,
    hint,
    defaultValue,
    disabled,
    label,
    placeholder,
    required,
    validationErrorMessage,
    value,
    maxLength,
}: TextAreaProps): ReactElement {
    const { t } = useTranslation('text-area');
    const [validity, setValidity] = useState(true);
    const [inputValueLength, setInputValueLength] = useState(getInitialValue(value, defaultValue));
    const idTextArea = useMemo(uuid, []);
    const idCounter = useMemo(uuid, []);

    function handleBlur(event: FocusEvent<HTMLTextAreaElement>): void {
        if (maxLength === undefined || inputValueLength <= maxLength) {
            setValidity(event.currentTarget.checkValidity());
        }

        if (onBlur) {
            onBlur(event);
        }
    }

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        const valueLength = event.currentTarget.value.length;
        setInputValueLength(valueLength);

        if (maxLength && valueLength > maxLength) {
            setValidity(false);
        } else if (!validity) {
            setValidity(true);
        }

        if (onChange) {
            onChange(event);
        }
    }

    function handleFocus(event: FocusEvent<HTMLTextAreaElement>): void {
        if (onFocus) {
            onFocus(event);
        }
    }

    function getValidationErrorMessage(): string {
        if (validationErrorMessage) {
            return validationErrorMessage;
        }
        if (maxLength && inputValueLength > maxLength) {
            return t('maxLengthValidationErrorMessage');
        }
        return t('validationErrorMessage');
    }

    return (
        <FieldContainer
            data-testid="container"
            className={className}
            noMargin={noMargin}
            fieldId={idTextArea}
            label={label}
            hint={hint}
            valid={validity}
            validationErrorMessage={getValidationErrorMessage()}
        >
            <StyledTextArea
                data-testid="textarea"
                defaultValue={defaultValue}
                disabled={disabled}
                id={idTextArea}
                aria-describedby={maxLength ? idCounter : undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder={placeholder}
                required={required}
                value={value}
            />
            {maxLength && (
                <Counter
                    data-testid="char-counter"
                    aria-live="polite"
                    aria-hidden="true"
                    id={idCounter}
                    valid={inputValueLength <= maxLength}
                >
                    {t('characters', { current: inputValueLength, max: maxLength })}
                </Counter>
            )}
        </FieldContainer>
    );
}
