import React, {
    ChangeEvent,
    DetailedHTMLProps,
    FocusEvent,
    forwardRef,
    InputHTMLAttributes,
    ReactElement,
    Ref,
    useCallback,
    useMemo,
    useState,
} from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { v4 as uuid } from '../../utils/uuid';
import { FieldContainer } from '../field-container/field-container';
import { inputsStyle } from './styles/inputs';
import { useDeviceContext } from "@design-elements/components/device-context-provider/device-context-provider";

const Input = styled.input<{isMobile: boolean, inputWidth: string | undefined, inputHeight: string | undefined}>`
    ${({ theme, isMobile, inputWidth, inputHeight }) => inputsStyle(theme, isMobile, inputWidth, inputHeight)}
`;

type PartialInputProps = Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'inputMode' | 'name' | 'value' | 'autoComplete'>;

interface TextInputProps extends PartialInputProps {
    className?: string;
    defaultValue?: string;
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    id?: string;
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

export const TextInput = forwardRef(({
    className,
    defaultValue,
    disabled,
    hint,
    id: providedId,
    inputMode,
    label,
    name,
    noMargin,
    pattern,
    placeholder,
    required,
    type,
    validationErrorMessage,
    value,
    autoComplete,
    onBlur,
    onChange,
    onFocus,
}: TextInputProps, ref: Ref<HTMLInputElement>): ReactElement => {
    const { t } = useTranslation('text-input');
    const [{ validity }, setValidity] = useState({ validity: true });
    const id = useMemo(() => providedId || uuid(), [providedId]);

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
                autoComplete={autoComplete}
                data-testid="text-input"
                isMobile={isMobile}
                inputWidth={inputWidth}
                inputHeight={inputHeight}
                defaultValue={defaultValue}
                disabled={disabled}
                id={id}
                inputMode={inputMode}
                name={name}
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
