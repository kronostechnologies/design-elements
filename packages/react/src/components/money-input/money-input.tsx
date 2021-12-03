import { ChangeEvent, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { formatCurrency } from '../../utils/currency';
import { TextInput } from '../text-input/text-input';

type Language = 'en' | 'fr';

const InputWrapper = styled.div<{ language: Language }>`
    input {
        text-align: ${({ language }) => (language === 'en' ? 'left' : 'right')};
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

interface Props {
    className?: string;
    disabled?: boolean;
    required?: boolean;
    /**
     * Message displayed in case of validation error
     * @default Invalid number.
     */
    validationErrorMessage?: string;
    label?: string;
    value?: number | null;
    /**
     * Sets input locale and changes visual format accordingly
     * @default fr-CA
     */
    locale?: string;
    /**
     * Sets currency
     * @default CAD
     */
    currency?: string;
    /**
     * Sets number of decimals
     * @default 2
     */
    precision?: number;
    hint?: string;

    onChange?(value: number | null, formattedValue: string): void;
}

function roundValueToPrecision(amount: number | null, precision: number): number | null {
    return amount !== null && !Number.isNaN(amount)
        ? Math.round(amount * (10 ** precision)) / (10 ** precision)
        : null;
}

function parseAndRound(val: string, precision: number): number | null {
    return val === '' ? null : roundValueToPrecision(Number(val.replace(',', '.')), precision);
}

export function MoneyInput({
    className,
    required,
    disabled,
    label,
    onChange,
    precision = 2,
    value = null,
    validationErrorMessage,
    locale = 'fr-CA',
    currency = 'CAD',
    hint,
}: Props): ReactElement {
    const { t } = useTranslation('money-input');
    const inputElement = useRef<HTMLInputElement>(null);
    const language: Language = locale.split('-')[0] as Language;
    const [displayValue, setDisplayValue] = useState(safeFormatCurrency(value, precision, locale, currency));
    const [maskedValue, setMaskedValue] = useState(safeFormatCurrency(value, precision, locale, currency));
    const [hasFocus, setHasFocus] = useState<boolean>(false);

    const updateFormattedValue: (rawValue: string) => void = useCallback((rawValue) => {
        const roundedValue = parseAndRound(rawValue, precision);
        const newMaskedValue: string = safeFormatCurrency(roundedValue, precision, locale, currency);

        setDisplayValue(newMaskedValue);
        if (maskedValue !== newMaskedValue) {
            setMaskedValue(newMaskedValue);
            if (onChange) {
                onChange(roundedValue, newMaskedValue);
            }
        }
    }, [currency, locale, maskedValue, onChange, precision]);

    useEffect(() => {
        if (inputElement.current != null) {
            if (!hasFocus && displayValue !== maskedValue) {
                updateFormattedValue(inputElement.current.value);
            }
        }
    }, [hasFocus, displayValue, maskedValue, updateFormattedValue]);

    useEffect(() => {
        if (hasFocus) {
            inputElement.current?.select();
        }
    }, [hasFocus]);

    useEffect(() => {
        const newValue = safeFormatCurrency(value, precision, locale, currency);
        setDisplayValue(newValue);
        setMaskedValue(newValue);
    }, [currency, locale, precision, value]);

    const handleBlurEvent: () => void = useCallback(() => {
        setHasFocus(false);
    }, [setHasFocus]);

    const handleFocusEvent: () => void = useCallback(() => {
        const roundedValue = roundValueToPrecision(value, precision);
        const roundedValueAsString = roundedValue === null ? '' : roundedValue.toString();
        setDisplayValue(roundedValueAsString);
        setHasFocus(true);
    }, [setHasFocus, precision, value]);

    const handleChangeEvent: (event: ChangeEvent<HTMLInputElement>) => void = useCallback((event) => {
        const rawValue = event.target.value;
        const mask = /[^0-9.,]/g;
        const nextDisplayValue = rawValue.replace(mask, '');

        event.preventDefault();
        setDisplayValue(nextDisplayValue);
    }, []);

    return (
        <InputWrapper language={language}>
            <TextInput
                className={className}
                required={required}
                disabled={disabled}
                ref={inputElement}
                type="text"
                inputMode="numeric"
                value={displayValue}
                label={label}
                placeholder="$"
                onChange={handleChangeEvent}
                onBlur={handleBlurEvent}
                onFocus={handleFocusEvent}
                validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
                hint={hint}
            />
        </InputWrapper>
    );
}
