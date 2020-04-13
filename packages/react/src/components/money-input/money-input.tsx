import { useStateCallback } from '@design-elements/hooks/use-state-callback';
import { formatCurrency } from '@design-elements/utils/currency';
import React, { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TextInput } from '../text-input/text-input';

const InputWrapper = styled.div<{language: Language}>`
    input {
        text-align: ${({ language }) => language === 'en' ? 'left' : 'right'};
        transition: width 300ms;
        width: 132px;
    }
`;

function safeFormatCurrency(
    value: number | null = null,
    precision: number,
    locale: string,
    currency: string,
): string {
    return value === null ? '' : formatCurrency(value, precision, locale, currency);
}

type Language = 'en' | 'fr';

interface Props {
    disabled?: boolean;
    required?: boolean;
    /**
     * Message displayed in case of validation error
     * @default Invalid number.
     **/
    validationErrorMessage?: string;
    label?: string;
    value?: number | null;
    /**
     * Sets input locale and changes visual format accordingly
     * @default fr-CA
     **/
    locale?: string;
    /**
     * Sets currency
     * @default CAD
     **/
    currency?: string;
    /**
     * Sets number of decimal
     * @default 2
     **/
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
    locale = 'fr-CA',
    currency = 'CAD',
 }: Props): ReactElement {
    const inputElement = useRef<HTMLInputElement>(null);
    const language: Language = locale.split('-')[0] as Language;
    const [displayValue, setDisplayValue] = useState(safeFormatCurrency(value, precision, locale, currency));
    const [maskedValue, setMaskedValue] = useState(safeFormatCurrency(value, precision, locale, currency));
    const [, setHasFocus] = useStateCallback(false, hasFocus => {
        if (inputElement.current != null) {
            if (hasFocus) {
                inputElement.current.select();
            } else if (displayValue !== maskedValue) {
                updateFormattedValue(inputElement.current.value);
            }
        }
    });

    useEffect(() => {
        const newValue = safeFormatCurrency(value, precision, locale, currency);
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

    const getRoundedValue = (val: string): number | null => {
        return val === '' ? null : roundValueToPrecision(Number(val.replace(',', '.')));
    };

    function handleChangeEvent(event: ChangeEvent<HTMLInputElement>): void {
        event.preventDefault();

        const rawValue = event.target.value;
        const roundedValue = getRoundedValue(rawValue);

        let nextDisplayValue: string;
        if (roundedValue !== null && rawValue.charAt(rawValue.length - 1) !== '.') {
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
        const roundedValue = getRoundedValue(rawValue.replace(',', '.'));
        const newMaskedValue: string = safeFormatCurrency(roundedValue, precision, locale, currency);

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
                placeholder={safeFormatCurrency(0, precision, locale, currency)}
                onChange={handleChangeEvent}
                onBlur={handleBlurEvent}
                onFocus={handleFocusEvent}
                validationErrorMessage={validationErrorMessage || (language === 'en' ? 'Invalid number.' : 'Nombre invalide.')}
            />
        </InputWrapper>
    );
}
