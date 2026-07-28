import {
    ChangeEvent,
    ChangeEventHandler,
    ClipboardEvent,
    ClipboardEventHandler,
    FocusEvent,
    FocusEventHandler,
    FormEventHandler,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { useTranslation } from '../../i18n/use-translation';
import { isNumber, isWithinPrecision, truncateAtPrecision } from '../../utils/math';
import {
    cleanIncompleteNumber,
    convertDecimalSeparator,
    DEFAULT_DECIMAL_SEPARATOR,
    getDecimalSeparator,
    isValidValueForInput,
    replacePastedValue,
    toStandardFormat,
} from './utils';

interface NumericInputCallbackData {
    value: string;
    valueAsNumber: number | null;
}

export interface UseNumericInputParams {
    defaultValue?: number | string;
    max?: number;
    min?: number;
    onBlur?(event: FocusEvent<HTMLInputElement>, data: NumericInputCallbackData): void;
    onChange?(event: ChangeEvent<HTMLInputElement>, data: NumericInputCallbackData): void;
    precision?: number;
    required?: boolean;
    invalid?: boolean;
    validationErrorMessage?: string;
    value?: number | string;
}

export interface UseNumericInputReturn {
    max?: number;
    min?: number;
    onBlurHandler: FocusEventHandler<HTMLInputElement>;
    onChangeHandler: ChangeEventHandler<HTMLInputElement>;
    onPasteHandler: ClipboardEventHandler<HTMLInputElement>;
    onInvalid?: FormEventHandler<HTMLInputElement>;
    precision?: number;
    required?: boolean;
    invalid: boolean;
    validationErrorMessage?: string;
    value: number | string;
}

type ValidationErrorType = 'required' | 'max' | 'min';

interface GetValidationErrorTypeOptions {
    skipRequired?: boolean;
}

const createCallbackData = (inputValue: string): NumericInputCallbackData => ({
    value: inputValue,
    valueAsNumber: inputValue === '' ? null : Number(toStandardFormat(inputValue)),
});

function convertClipboardToChangeEvent(
    event: ClipboardEvent<HTMLInputElement>,
    newValue: string,
): ChangeEvent<HTMLInputElement> {
    return {
        ...event,
        currentTarget: {
            ...event.currentTarget,
            value: newValue,
        },
        target: {
            ...event.currentTarget,
            ...event.target,
            value: newValue,
        },
    };
}

export function useNumericInput({
    defaultValue,
    max,
    min,
    onBlur,
    onChange,
    precision,
    required,
    invalid: providedInvalid,
    validationErrorMessage: providedValidationErrorMessage,
    value: providedValue,
}: UseNumericInputParams): UseNumericInputReturn {
    const { t, i18n } = useTranslation('numeric-input');
    const decimalSeparator = useMemo(() => getDecimalSeparator(i18n.language), [i18n.language]);

    const toLocaleFormat = useCallback(
        (val: string): string => convertDecimalSeparator(val, decimalSeparator),
        [decimalSeparator],
    );

    const validateProvidedValue = useCallback((newValue: unknown): string => {
        if (isNumber(newValue)) {
            return toLocaleFormat(newValue.toString());
        }
        if (typeof newValue === 'string') {
            const standardValue = toStandardFormat(newValue);
            if (isValidValueForInput(standardValue, DEFAULT_DECIMAL_SEPARATOR)) {
                return toLocaleFormat(standardValue);
            }
        }

        console.warn(`Invalid value passed to NumericInput: ${newValue}`);
        return '';
    }, [toLocaleFormat]);

    const [inputValue, setInputValue] = useState(
        validateProvidedValue(providedValue ?? defaultValue ?? ''),
    );

    const getValidationErrorType = useCallback((
        value: string,
        options?: GetValidationErrorTypeOptions,
    ): ValidationErrorType | undefined => {
        if (value === '' && required && options?.skipRequired !== true) {
            return 'required';
        }
        if (value !== '') {
            const standardValue = toStandardFormat(value);
            const numValue = Number(standardValue);
            if (max !== undefined && numValue > max) {
                return 'max';
            }
            if (min !== undefined && numValue < min) {
                return 'min';
            }
        }
        return undefined;
    }, [max, min, required]);

    const [validationErrorType, setValidationErrorType] = useState<ValidationErrorType | undefined>(
        getValidationErrorType(inputValue, { skipRequired: true }),
    );

    const validate = useCallback((valueToValidate: string): void => {
        const errorType = getValidationErrorType(valueToValidate);
        setValidationErrorType(errorType);
    }, [getValidationErrorType]);

    const handlePaste = useCallback((event: ClipboardEvent<HTMLInputElement>): void => {
        event.preventDefault();
        let newValue = convertDecimalSeparator(replacePastedValue(event), decimalSeparator);

        if (!isValidValueForInput(newValue, decimalSeparator)) {
            newValue = inputValue;
        } else if (precision !== undefined) {
            const standardValue = toStandardFormat(newValue);
            const truncatedStandard = truncateAtPrecision(standardValue, precision);
            newValue = toLocaleFormat(truncatedStandard);
        }

        if (!isValidValueForInput(newValue, decimalSeparator)) {
            newValue = '';
        }

        setInputValue(newValue);
        onChange?.(convertClipboardToChangeEvent(event, newValue), createCallbackData(newValue));
        validate(newValue);
    }, [onChange, precision, decimalSeparator, inputValue, toLocaleFormat, validate]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        if (value !== '') {
            if (!isValidValueForInput(value, decimalSeparator)) {
                return;
            }
            if (precision !== undefined) {
                const standardValue = toStandardFormat(value);
                if (!isWithinPrecision(standardValue, precision)) {
                    return;
                }
            }
        }

        setInputValue(value);
        onChange?.(event, createCallbackData(value));
        if (providedInvalid === undefined) {
            validate(value);
        }
    }, [onChange, precision, decimalSeparator, validate, providedInvalid]);

    const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>): void => {
        let value = cleanIncompleteNumber(event.target.value, decimalSeparator);

        if (precision !== undefined && value !== '') {
            const standardValue = toStandardFormat(value);
            const truncatedStandard = truncateAtPrecision(standardValue, precision);
            value = toLocaleFormat(truncatedStandard);
        }
        setInputValue(value);

        if (!(required && value === '')) {
            validate(value);
        } else {
            setValidationErrorType(getValidationErrorType(value));
        }

        onBlur?.(event, createCallbackData(value));
    }, [onBlur, required, validate, decimalSeparator, precision, toLocaleFormat, getValidationErrorType]);

    const handleOnInvalid: FormEventHandler<HTMLInputElement> = useCallback(() => {
        if (providedInvalid === undefined) {
            validate(inputValue);
        }
    }, [inputValue, providedInvalid, validate]);

    if (providedValue !== undefined) {
        const validatedProvidedValue = validateProvidedValue(providedValue);
        if (validatedProvidedValue !== inputValue) {
            setInputValue(validatedProvidedValue);
            if (providedInvalid === undefined) {
                validate(validatedProvidedValue);
            }
        }
    }

    const getErrorMessage = (): string | undefined => {
        switch (validationErrorType) {
            case 'required':
                return t('requiredValidationErrorMessage');
            case 'max':
                return t('maxValidationErrorMessage', { max });
            case 'min':
                return t('minValidationErrorMessage', { min });
            default:
                return undefined;
        }
    };

    const isInvalid = providedInvalid ?? validationErrorType !== undefined;
    const errorMessage = providedValidationErrorMessage ?? getErrorMessage();

    return {
        max,
        min,
        onBlurHandler: handleBlur,
        onChangeHandler: handleChange,
        onPasteHandler: handlePaste,
        onInvalid: handleOnInvalid,
        precision,
        required,
        invalid: isInvalid,
        validationErrorMessage: errorMessage,
        value: inputValue,
    };
}
