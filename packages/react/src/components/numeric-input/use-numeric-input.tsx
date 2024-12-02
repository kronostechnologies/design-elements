import {
    ChangeEvent,
    ChangeEventHandler,
    ClipboardEvent,
    ClipboardEventHandler,
    FocusEvent,
    FocusEventHandler,
    FormEventHandler,
    useCallback,
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
    onInvalid?: FormEventHandler<HTMLInputElement>;
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

type ValidationErrorType = 'required' | 'max' | 'min';

interface GetValidationErrorTypeOptions {
    max?: number;
    min?: number;
    required?: boolean;
    skipRequired?: boolean;
}

function getValidationErrorType(value: string, {
    max, min, required, skipRequired,
}: GetValidationErrorTypeOptions): ValidationErrorType | undefined {
    if (value === '' && required && !skipRequired) {
        return 'required';
    }
    if (value !== '') {
        if (max !== undefined && Number(value) > max) {
            return 'max';
        }
        if (min !== undefined && Number(value) < min) {
            return 'min';
        }
    }
    return undefined;
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
    invalid: providedInvalid,
    validationErrorMessage: providedValidationErrorMessage,
    value: providedValue,
}: UseNumericInputParams): UseNumericInputReturn {
    const { t } = useTranslation('numeric-input');
    const [inputValue, setInputValue] = useState(
        validateProvidedValue(providedValue ?? defaultValue ?? ''),
    );

    const [validationErrorType, setValidationErrorType] = useState<ValidationErrorType | undefined>(
        getValidationErrorType(inputValue, {
            max, min, required, skipRequired: true,
        }),
    );

    const validate = useCallback((value: string): void => {
        const errorType = getValidationErrorType(value, { max, min, required });
        setValidationErrorType(errorType);
    }, [max, min, required]);

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

        if (!(required && value === '')) {
            validate(value);
        } else {
            setValidationErrorType(undefined);
        }

        onBlur?.(event, createCallbackData(value));
    }, [onBlur, required, validate]);

    const handleOnInvalid: FormEventHandler<HTMLInputElement> = useCallback(() => {
        if (providedInvalid === undefined) {
            validate(inputValue);
        }
    }, [inputValue, providedInvalid, validate]);

    if (providedValue !== undefined) {
        const validatedProvidedValue = validateProvidedValue(providedValue);
        if (validatedProvidedValue !== inputValue) {
            setInputValue(validatedProvidedValue);
            validate(validatedProvidedValue);
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
