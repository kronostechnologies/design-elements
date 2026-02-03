import { ChangeEvent, type FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { formatCurrency } from '../../utils/currency';
import { TextInput, textInputClasses } from '../text-input';
import { ToggletipProps } from '../toggletip';
import { toLocale } from './toLocale';

type TextAlignment = 'left' | 'right';

const StyledTextInput = styled(TextInput)<{ $textAlignment: TextAlignment }>`
    .${textInputClasses.control} {
        text-align: ${({ $textAlignment }) => $textAlignment};
        width: 132px;
    }
`;

function safeFormatCurrency(
    value: number | null,
    precision: number,
    locale: string,
    currency: string,
): string {
    return value === null ? '' : formatCurrency(value, precision, locale, currency);
}

export interface MoneyInputProps {
    id?: string;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
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
     * Defaults to the locale provided to the DesignSystem provider
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
    noMargin?: boolean;
    textAlignment?: TextAlignment;
    toggletip?: ToggletipProps;

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

export const MoneyInput: FC<MoneyInputProps> = ({
    id: providedId,
    className,
    readOnly,
    required,
    disabled,
    label,
    onChange,
    precision = 2,
    value = null,
    validationErrorMessage,
    locale: providedLocale,
    currency = 'CAD',
    hint,
    noMargin,
    textAlignment = 'left',
    toggletip,
    ...otherProps
}) => {
    const { i18n, t } = useTranslation('money-input');
    const locale = providedLocale ?? toLocale(i18n.language, currency);
    const inputElement = useRef<HTMLInputElement>(null);
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
            onChange?.(roundedValue, newMaskedValue);
        }
    }, [currency, locale, maskedValue, onChange, precision]);

    if (value && !hasFocus && displayValue !== safeFormatCurrency(value, precision, locale, currency)) {
        updateFormattedValue(value.toString());
    }

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

        const roundedValue = parseAndRound(nextDisplayValue, precision);
        const newMaskedValue: string = safeFormatCurrency(roundedValue, precision, locale, currency);
        onChange?.(roundedValue, newMaskedValue);
    }, [currency, locale, onChange, precision]);

    return (
        <StyledTextInput
            $textAlignment={textAlignment}
            id={providedId}
            className={className}
            readOnly={readOnly}
            required={required}
            disabled={disabled}
            ref={inputElement}
            type="text"
            inputMode="numeric"
            value={displayValue}
            label={label}
            onChange={handleChangeEvent}
            onBlur={handleBlurEvent}
            onFocus={handleFocusEvent}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            hint={hint}
            noMargin={noMargin}
            toggletip={toggletip}
            {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
        />
    );
};

MoneyInput.displayName = 'MoneyInput';
