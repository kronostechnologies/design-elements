import {
    ChangeEvent,
    DetailedHTMLProps,
    FocusEvent,
    FormEventHandler,
    forwardRef,
    InputHTMLAttributes,
    KeyboardEvent,
    MouseEvent,
    ReactElement,
    Ref,
    useCallback,
    useEffect,
    useState,
} from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { TooltipProps } from '../tooltip/tooltip';
import { inputsStyle } from './styles/inputs';
import { AriaLabelsProps, useAriaLabels } from '../../hooks/use-aria';
import { useId } from '../../hooks/use-id';

const Input = styled.input<{ isMobile: boolean; }>`
    ${({ theme, isMobile }) => inputsStyle(theme, isMobile)}
`;

type PartialInputProps = Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'inputMode' | 'name' | 'value' | 'autoComplete'>;

interface TextInputProps extends PartialInputProps, AriaLabelsProps {
    id?: string;
    ariaInvalid?: boolean;
    className?: string;
    defaultValue?: string;
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    tooltip?: TooltipProps;
    pattern?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    valid?: boolean;
    validationErrorMessage?: string;
    hint?: string;

    onBlur?(event: FocusEvent<HTMLInputElement>): void;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;

    onFocus?(event: FocusEvent<HTMLInputElement>): void;

    onKeyUp?(event: KeyboardEvent<HTMLInputElement>): void;

    onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;

    onMouseUp?(event: MouseEvent<HTMLInputElement>): void;
}

export const TextInput = forwardRef(({
    id: providedId,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaInvalid,
    className,
    defaultValue,
    disabled,
    hint,
    inputMode,
    label,
    tooltip,
    name,
    noMargin,
    pattern,
    placeholder,
    required,
    type,
    valid,
    validationErrorMessage,
    value,
    autoComplete,
    onBlur,
    onChange,
    onFocus,
    onKeyUp,
    onKeyDown,
    onMouseUp,
    ...otherProps
}: TextInputProps, ref: Ref<HTMLInputElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('text-input');
    const [{ validity }, setValidity] = useState({ validity: valid ?? true });
    const dataAttributes = useDataAttributes(otherProps);
    const fieldId = useId(providedId);
    const { processedLabels } = useAriaLabels({
        inputId: fieldId,
        label,
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy,
        hasHint: !!hint,
        isValid: valid,
    });

    const handleBlur: (event: FocusEvent<HTMLInputElement>) => void = useCallback((event) => {
        if (valid === undefined) {
            setValidity({ validity: event.currentTarget.checkValidity() });
        }

        if (onBlur) {
            onBlur(event);
        }
    }, [onBlur, valid]);

    const handleOnInvalid: FormEventHandler<HTMLInputElement> = useCallback(() => {
        if (valid === undefined) {
            setValidity({ validity: false });
        }
    }, [valid]);

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

    useEffect(() => {
        if (valid !== undefined) {
            setValidity({ validity: valid });
        }
    }, [valid]);

    return (
        <FieldContainer
            className={className}
            noMargin={noMargin}
            fieldId={fieldId}
            label={processedLabels.label}
            required={required}
            tooltip={tooltip}
            valid={validity}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            hint={hint}
            data-testid="field-container"
        >
            <Input
                aria-label={processedLabels.ariaLabel}
                aria-labelledby={processedLabels.ariaLabelledBy}
                aria-describedby={processedLabels.ariaDescribedBy}
                aria-invalid={ariaInvalid}
                autoComplete={autoComplete}
                data-testid="text-input"
                isMobile={isMobile}
                defaultValue={defaultValue}
                disabled={disabled}
                id={fieldId}
                inputMode={inputMode}
                name={name}
                ref={ref}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onMouseUp={onMouseUp}
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown}
                onInvalid={handleOnInvalid}
                pattern={pattern}
                placeholder={placeholder}
                required={required}
                type={type || 'text'}
                value={value}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            />
        </FieldContainer>
    );
});

TextInput.displayName = 'TextInput';
