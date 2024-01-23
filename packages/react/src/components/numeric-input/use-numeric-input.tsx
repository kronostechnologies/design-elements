import {
    ChangeEvent,
    ChangeEventHandler,
    ClipboardEvent,
    ClipboardEventHandler,
    FocusEvent,
    FocusEventHandler,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { isNumber, isWithinPrecision, truncateAtPrecision } from '../../utils/math';
import { useTranslation } from '../../i18n/use-translation';
import {
    cleanIncompleteNumber,
    cleanPastedContent,
    isValidValueForInput,
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
    precision?: number;
    required?: boolean;
    invalid: boolean;
    validationErrorMessage?: string;
    value: number | string;
}

function validateProvidedValue(newValue: number | string): string {
    if (isNumber(newValue)) {
        return newValue.toString();
    }
    if (typeof newValue === 'string' && isValidValueForInput(newValue)) {
        return newValue;
    }

    console.warn(`Invalid value passed to NumericInput: ${newValue}`);
    return '';
}

const createCallbackData = (inputValue: string): NumericInputCallbackData => ({
    value: inputValue,
    valueAsNumber: inputValue === '' ? null : Number(inputValue),
});

export function useNumericInput({
    defaultValue,
    max,
    min,
    onBlur,
    onChange,
    precision,
    required,
    invalid,
    validationErrorMessage: providedValidationErrorMessage,
    value: providedValue,
}: UseNumericInputParams): UseNumericInputReturn {
    const { t } = useTranslation('numeric-input');
    const [inputValue, setInputValue] = useState(
        validateProvidedValue(providedValue ?? defaultValue ?? ''),
    );
    const [validationErrorMessage, setValidationErrorMessage] = useState<string | undefined>();

    const validate = useCallback((value: string): void => {
        let error: string | undefined;

        if (required && value === '') {
            error = t('requiredValidationErrorMessage');
        } else if (value !== '') {
            if (max !== undefined && Number(value) > max) {
                error = t('maxValidationErrorMessage', { max });
            } else if (min !== undefined && Number(value) < min) {
                error = t('minValidationErrorMessage', { min });
            }
        }

        setValidationErrorMessage(error);
    }, [max, min, required, t]);

    const handlePaste = useCallback((event: ClipboardEvent<HTMLInputElement>): void => {
        event.preventDefault();
        let newValue = event.clipboardData.getData('text/plain');

        newValue = cleanPastedContent(newValue);

        if (precision !== undefined) {
            newValue = truncateAtPrecision(newValue, precision);
        }

        // When the content is invalid, we will clear the field so the user has a feedback that the paste didn't work
        if (!isValidValueForInput(newValue)) {
            newValue = '';
        }

        setInputValue(newValue);
    }, [precision]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        if (value !== '') {
            if (!isValidValueForInput(value)) {
                return;
            }
            if (precision !== undefined && !isWithinPrecision(value, precision)) {
                return;
            }
        }

        setInputValue(value);
        onChange?.(event, createCallbackData(value));
    }, [onChange, precision]);

    const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>): void => {
        const value = cleanIncompleteNumber(event.target.value);
        setInputValue(value);
        validate(value);
        onBlur?.(event, createCallbackData(value));
    }, [onBlur, validate]);

    useEffect(() => {
        if (inputValue !== '') {
            validate(inputValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (providedValue !== undefined) {
        const validatedProvidedValue = validateProvidedValue(providedValue);
        if (validatedProvidedValue !== inputValue) {
            setInputValue(validatedProvidedValue);
            validate(validatedProvidedValue);
        }
    }

    const isInvalid = invalid ?? (providedValidationErrorMessage !== undefined || validationErrorMessage !== undefined);
    const errorMessage = (providedValidationErrorMessage ?? validationErrorMessage);

    return {
        max,
        min,
        onBlurHandler: handleBlur,
        onChangeHandler: handleChange,
        onPasteHandler: handlePaste,
        precision,
        required,
        invalid: isInvalid,
        validationErrorMessage: errorMessage,
        value: inputValue,
    };
}
