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
    ReactEventHandler,
    Ref,
    useCallback,
    useMemo,
    useState,
} from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { v4 as uuid } from '../../utils/uuid';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { TooltipProps } from '../tooltip/tooltip';
import { inputsStyle } from './styles/inputs';

const Input = styled.input<{ isMobile: boolean; }>`
    ${({ theme, isMobile }) => inputsStyle(theme, isMobile)}
`;

type PartialInputProps = Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'inputMode' | 'name' | 'value' | 'autoComplete'>;

interface TextInputProps extends PartialInputProps {
    ariaDescribedBy?: string;
    ariaInvalid?: boolean;
    className?: string;
    defaultValue?: string;
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    id?: string;
    label?: string;
    tooltip?: TooltipProps;
    pattern?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    validationErrorMessage?: string;
    hint?: string;

    onBlur?(event: FocusEvent<HTMLInputElement>): void;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;

    onFocus?(event: FocusEvent<HTMLInputElement>): void;

    onKeyUp?(event: KeyboardEvent<HTMLInputElement>): void;

    onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;

    onMouseUp?(event: MouseEvent<HTMLInputElement>): void;

    onSelect?: ReactEventHandler<HTMLInputElement>;
}

export const TextInput = forwardRef(({
    ariaDescribedBy,
    ariaInvalid,
    className,
    defaultValue,
    disabled,
    hint,
    id: providedId,
    inputMode,
    label,
    tooltip,
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
    onKeyUp,
    onKeyDown,
    onMouseUp,
    onSelect,
    ...otherProps
}: TextInputProps, ref: Ref<HTMLInputElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('text-input');
    const [{ validity }, setValidity] = useState({ validity: true });
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const dataAttributes = useDataAttributes(otherProps);

    const handleBlur: (event: FocusEvent<HTMLInputElement>) => void = useCallback((event) => {
        setValidity({ validity: event.currentTarget.checkValidity() });

        if (onBlur) {
            onBlur(event);
        }
    }, [onBlur]);

    const handleOnInvalid: FormEventHandler<HTMLInputElement> = useCallback(() => {
        setValidity({ validity: false });
    }, []);

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

    const handleOnSelect: ReactEventHandler<HTMLInputElement> = useCallback((event) => {
        if (onSelect) {
            onSelect(event);
        }
    }, [onSelect]);

    return (
        <FieldContainer
            className={className}
            noMargin={noMargin}
            fieldId={id}
            label={label}
            tooltip={tooltip}
            valid={validity}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            hint={hint}
            data-testid="field-container"
        >
            <Input
                aria-describedby={ariaDescribedBy}
                aria-invalid={ariaInvalid}
                autoComplete={autoComplete}
                data-testid="text-input"
                isMobile={isMobile}
                defaultValue={defaultValue}
                disabled={disabled}
                id={id}
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
                onSelect={handleOnSelect}
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
