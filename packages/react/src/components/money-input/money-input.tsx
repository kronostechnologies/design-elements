import { useStateCallback } from '@design-elements/hooks/use-state-callback';
import { formatCurrency } from '@design-elements/utils/currency';
import React, { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TextInput } from '../text-input/text-input';

const InputWrapper = styled.div<{language: Language}>`
    input {
        text-align: ${({ language }) => language === 'en' ? 'left' : 'right'};
    }
`;

function safeFormatCurrency(value: number | null = null, precision: number, language: Locale): string {
    return value === null ? '' : formatCurrency(value, precision, language);
}

type Locale = 'en-CA' | 'fr-CA';
type Language = 'en' | 'fr';

interface Props {
    disabled?: boolean;
    required?: boolean;
    validationErrorMessage?: string;
    label?: string;
    value?: number | null;
    language?: Language;
    precision?: number;

    onChange?(value: number | null, formattedValue: string): void;
}

export function MoneyInput({
    required,
    disabled,
    label,
    onChange,
    precision = 2,
    value = null,
    validationErrorMessage,
    language = 'fr' }: Props): ReactElement {
    const locale: Locale = `${language}-CA` as Locale;
    const inputElement = useRef<HTMLInputElement>(null);
    const [displayValue, setDisplayValue] = useState(safeFormatCurrency(value, precision, locale));
    const [maskedValue, setMaskedValue] = useState(safeFormatCurrency(value, precision, locale));
    const [, setHasFocus] = useStateCallback(false, hasFocus => {
        if (inputElement.current != null) {
            if (hasFocus) {
                inputElement.current.select();
            } else if (displayValue !== maskedValue) {
                updateFormattedValue(inputElement.current.value);
            }
        }
    });
    const getPlaceholder = (lang: Language, decimal: number) => {
        let placeholder = '0';
        if (precision > 0) {
            placeholder += ',';
            for (let i = 0; i < decimal; i++) {
                placeholder += '0';
            }
        }
        return lang === 'en' ? `$ ${placeholder}` : `${placeholder} $`;
    };

    useEffect(() => {
        const newValue = safeFormatCurrency(value, precision, locale);
        setDisplayValue(newValue);
        setMaskedValue(newValue);
    }, [value]);

    function handleBlurEvent(): void {
        setHasFocus(false);
    }

    function handleFocusEvent(): void {
        const roundedValue = roundValueToPrecision(value);
        const roundedValueAsString = roundedValue === null ? '' : roundedValue.toString();
        setDisplayValue(roundedValueAsString);
        setHasFocus(true);
    }

    function handleChangeEvent(event: ChangeEvent<HTMLInputElement>): void {
        event.preventDefault();

        const rawValue: string = event.target.value;
        const roundedValue: number | null = rawValue === '' ? null : roundValueToPrecision(Number(rawValue));

        let nextDisplayValue: string;
        if (roundedValue !== null) {
            nextDisplayValue = roundedValue.toString();
        } else {
            const mask: RegExp = precision > 0 ? /[^0-9.,]/g : /[^0-9]/g;
            nextDisplayValue = rawValue.replace(mask, '');
        }

        setDisplayValue(nextDisplayValue);
    }

    function roundValueToPrecision(amount: number | null): number | null {
        return amount !== null && !isNaN(amount)
            ? Math.round(amount * (10 ** precision)) / (10 ** precision)
            : null;
    }

    function updateFormattedValue(rawValue: string): void {
        const amount: number | null = rawValue === '' ? null : Number(rawValue.replace(',', '.'));
        const roundedValue = roundValueToPrecision(amount);
        const newMaskedValue: string = safeFormatCurrency(roundedValue, precision, locale);

        setDisplayValue(newMaskedValue);
        if (maskedValue !== newMaskedValue) {
            setMaskedValue(newMaskedValue);
            if (onChange) {
                onChange(roundedValue, newMaskedValue);
            }
        }
    }

    return (
        <InputWrapper language={language}>
            <TextInput
                required={required}
                disabled={disabled}
                ref={inputElement}
                type="text"
                inputMode="numeric"
                value={displayValue}
                label={label}
                placeholder={getPlaceholder(language, precision)}
                onChange={handleChangeEvent}
                onBlur={handleBlurEvent}
                onFocus={handleFocusEvent}
                validationErrorMessage={validationErrorMessage || (language === 'en' ? 'Invalid number.' : 'Nombre invalide.')}
            />
        </InputWrapper>
    );
}
