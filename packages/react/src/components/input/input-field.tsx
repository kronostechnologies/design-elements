import {
    ChangeEvent,
    FocusEvent,
    FormEvent,
    forwardRef,
    ReactElement,
    Ref,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { FieldContainer } from '../field/field-container';
import { Input } from './input';
import { InputFieldProps } from './types';
import { parseInputFieldProps } from './utils';

export const InputField = forwardRef(({
    ...props
}: InputFieldProps, ref: Ref<HTMLInputElement>): ReactElement => {
    const { inputProps, fieldControlledProps } = parseInputFieldProps(props);
    const inputDataAttributes = useDataAttributes(inputProps);
    const [{ validity }, setValidity] = useState({ validity: fieldControlledProps.valid ?? true });

    const handleBlur: (event: FocusEvent<HTMLInputElement>) => void = useCallback((event) => {
        if (fieldControlledProps.valid === undefined) {
            setValidity({ validity: event.currentTarget.checkValidity() });
        }

        inputProps.onBlur?.(event);
    }, [fieldControlledProps.valid, inputProps]);

    const handleOnInvalid: (event: FormEvent<HTMLInputElement>) => void = useCallback((event) => {
        if (fieldControlledProps.valid === undefined) {
            setValidity({ validity: false });
        }

        inputProps.onInvalid?.(event);
    }, [fieldControlledProps.valid, inputProps]);

    const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = useCallback((event) => {
        inputProps.onChange?.(event);
    }, [inputProps]);

    const handleFocus: (event: FocusEvent<HTMLInputElement>) => void = useCallback((event) => {
        inputProps.onFocus?.(event);
    }, [inputProps]);

    useEffect(() => {
        if (fieldControlledProps.valid !== undefined) {
            setValidity({ validity: fieldControlledProps.valid });
        }
    }, [fieldControlledProps.valid]);

    return (
        <FieldContainer
            data-testid="field-container"
            {...fieldControlledProps /* eslint-disable-line react/jsx-props-no-spreading */}
            valid={validity}
        >
            <Input
                {...inputProps /* eslint-disable-line react/jsx-props-no-spreading */}
                {...inputDataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                ref={ref}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onInvalid={handleOnInvalid}
            />
        </FieldContainer>
    );
});

InputField.displayName = 'InputField';
