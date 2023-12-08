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
import { useTranslation } from '../../i18n/use-translation';
import {
    cleanIncompleteNumber,
    cleanPastedContent,
    isValidValueForInput,
    isWithinPrecision,
    truncateAtPrecision,
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
    if (typeof newValue === 'number' && !Number.isNaN(newValue)) {
        return newValue.toString();
    } if (typeof newValue === 'string' && isValidValueForInput(newValue)) {
        return newValue;
    }

    console.warn(`Invalid value passed to NumericInput: ${newValue}`);
    return '';
}

export function useNumericInput({
    defaultValue,
    max,
    min,
    onBlur,
    onChange,
    precision,
    required,
    invalid,
    validationErrorMessage,
    value,
}: UseNumericInputParams): UseNumericInputReturn {
    const { t } = useTranslation('numeric-input');
    const [stateValue, setStateValue] = useState(
        validateProvidedValue(value?.toString() ?? defaultValue?.toString() ?? ''),
    );
    const [stateErrorMessage, setStateErrorMessage] = useState<string | undefined>();

    const isInvalid = invalid ?? (validationErrorMessage !== undefined || stateErrorMessage !== undefined);
    const errorMessage = (validationErrorMessage ?? stateErrorMessage);

    const validate = useCallback((inputValue: string): void => {
        let error: string | undefined;

        if (required && inputValue === '') {
            error = t('requiredValidationErrorMessage');
        } else if (inputValue !== '') {
            if (max !== undefined && Number(inputValue) > max) {
                error = t('maxValidationErrorMessage', { max });
            } else if (min !== undefined && Number(inputValue) < min) {
                error = t('minValidationErrorMessage', { min });
            }
        }

        setStateErrorMessage(error);
    }, [max, min, required, t]);

    const createCallbackData = (inputValue: string): NumericInputCallbackData => ({
        value: inputValue,
        valueAsNumber: inputValue === '' ? null : Number(inputValue),
    });

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

        setStateValue(newValue);
    }, [precision]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const inputValue = event.target.value;
        if (inputValue !== '') {
            if (!isValidValueForInput(inputValue)) {
                return;
            }
            if (precision !== undefined && !isWithinPrecision(inputValue, precision)) {
                return;
            }
        }

        setStateValue(inputValue);
        onChange?.(event, createCallbackData(inputValue));
    }, [onChange, precision]);

    const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>): void => {
        const inputValue = cleanIncompleteNumber(event.target.value);
        setStateValue(inputValue);
        validate(inputValue);

        onBlur?.(event, createCallbackData(inputValue));
    }, [onBlur, validate]);

    useEffect(() => {
        if (value !== undefined) {
            setStateValue(validateProvidedValue(value));
        }
    }, [value]);

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
        value: stateValue,
    };
}
