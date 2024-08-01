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
    valid,
    onBlur,
    onInvalid,
    onChange,
    onFocus,
    ...props
}: InputFieldProps, ref: Ref<HTMLInputElement>): ReactElement => {
    const { inputProps, fieldControlledProps } = parseInputFieldProps(props);
    const inputDataAttributes = useDataAttributes(inputProps);
    const [{ validity }, setValidity] = useState({ validity: valid ?? true });

    const handleBlur: (event: FocusEvent<HTMLInputElement>) => void = useCallback((event) => {
        if (valid === undefined) {
            setValidity({ validity: event.currentTarget.checkValidity() });
        }

        onBlur?.(event);
    }, [onBlur, valid]);

    const handleOnInvalid: (event: FormEvent<HTMLInputElement>) => void = useCallback((event) => {
        if (valid === undefined) {
            setValidity({ validity: false });
        }

        onInvalid?.(event);
    }, [onInvalid, valid]);

    const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = useCallback((event) => {
        onChange?.(event);
    }, [onChange]);

    const handleFocus: (event: FocusEvent<HTMLInputElement>) => void = useCallback((event) => {
        onFocus?.(event);
    }, [onFocus]);

    useEffect(() => {
        if (valid !== undefined) {
            setValidity({ validity: valid });
        }
    }, [valid]);

    return (
        <FieldContainer
            data-testid="field-container"
            {...fieldControlledProps /* eslint-disable-line react/jsx-props-no-spreading */}
            valid={validity}
        >
            <Input
                data-testid="field-input"
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
