import { ChangeEvent, useCallback, useEffect, useRef, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { InputField } from '../input/input-field';
import { MoneyInputProps } from './types';
import { parseAndRound, roundValueToPrecision, safeFormatCurrency } from './utils';

type Language = 'en' | 'fr';

const StyledInputField = styled(InputField)<{ language: Language }>`
    input {
        text-align: ${({ language }) => (language === 'en' ? 'left' : 'right')};
        width: 132px;
    }
`;

export const MoneyInput: VoidFunctionComponent<MoneyInputProps> = ({
    onChange,
    precision = 2,
    value = null,
    validationErrorMessage,
    locale = 'fr-CA',
    currency = 'CAD',
    ...otherProps
}) => {
    const { t } = useTranslation('money-input');
    const inputElement = useRef<HTMLInputElement>(null);
    const language: Language = locale.split('-')[0] as Language;
    const [displayValue, setDisplayValue] = useState(safeFormatCurrency(value, precision, locale, currency));
    const [maskedValue, setMaskedValue] = useState(safeFormatCurrency(value, precision, locale, currency));
    const [hasFocus, setHasFocus] = useState<boolean>(false);
    const dataAttributes = useDataAttributes(otherProps);

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
        <StyledInputField
            ref={inputElement}
            type="text"
            inputMode="numeric"
            value={displayValue}
            placeholder="$"
            language={language}
            onChange={handleChangeEvent}
            onBlur={handleBlurEvent}
            onFocus={handleFocusEvent}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            {...otherProps /* eslint-disable-line react/jsx-props-no-spreading */}
            {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
        />
    );
};
