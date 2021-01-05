import { useTranslation } from '@design-elements/i18n/use-translation';
import { v4 as uuid } from '@design-elements/utils/uuid';
import React, {
    ChangeEvent,
    DetailedHTMLProps,
    FocusEvent,
    InputHTMLAttributes,
    ReactElement,
    useCallback,
    useMemo,
    useState,
} from 'react';
import styled from 'styled-components';

import { FieldContainer } from '../field-container/field-container';
import { inputsStyle } from './styles/inputs';

const Input = styled.input`
    ${({ theme }) => inputsStyle(theme)}
`;

type inputModeType = 'none' | 'numeric' | 'tel' | 'decimal' | 'email' | 'url' | 'search';

type PartialInputProps = Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'inputMode' | 'value'>;

interface TextInputProps extends PartialInputProps {
    className?: string;
    defaultValue?: string;
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    inputMode?: inputModeType;
    label?: string;
    pattern?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    validationErrorMessage?: string;
    hint?: string;

    onBlur?(event: FocusEvent<HTMLInputElement>): void;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;

    onFocus?(event: FocusEvent<HTMLInputElement>): void;
}

export const TextInput = React.forwardRef(({
    className,
    noMargin,
    onBlur,
    onChange,
    onFocus,
    ...props
}: TextInputProps, ref: React.Ref<HTMLInputElement>): ReactElement => {
    const { t } = useTranslation('text-input');
    const [{ validity }, setValidity] = useState({ validity: true });
    const id = useMemo(uuid, []);

    const handleBlur: (event: FocusEvent<HTMLInputElement>) => void = useCallback((event) => {
        setValidity({ validity: event.currentTarget.checkValidity() });

        if (onBlur) {
            onBlur(event);
        }
    }, [onBlur]);

    const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = useCallback((event) => {
        if (onChange) {
            onChange(event);
        }
    }, [onChange]);

    const handleFocus: (event: FocusEvent<HTMLInputElement>) => void = useCallback((event) => {
        if (onFocus) {
            onFocus(event);
        }
    }, [onFocus]);

    const {
        defaultValue,
        disabled,
        inputMode,
        label,
        pattern,
        placeholder,
        required,
        type,
        validationErrorMessage,
        value,
        hint,
    } = props;

    return (
        <FieldContainer
            className={className}
            noMargin={noMargin}
            fieldId={id}
            label={label}
            valid={validity}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            hint={hint}
        >
            <Input
                defaultValue={defaultValue}
                disabled={disabled}
                id={id}
                inputMode={inputMode}
                ref={ref}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                pattern={pattern}
                placeholder={placeholder}
                required={required}
                type={type || 'text'}
                value={value}
            />
        </FieldContainer>
    );
});
