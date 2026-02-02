import {
    ChangeEvent,
    FocusEvent,
    FormEventHandler,
    useCallback,
    useEffect,
    useState,
    VoidFunctionComponent,
} from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useId } from '../../hooks/use-id';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes/theme';
import { FieldContainer } from '../field-container/field-container';
import { inputsStyle } from '../text-input/styles/inputs';
import { ToggletipProps } from '../toggletip/toggletip';
import { TooltipProps } from '../tooltip/tooltip';
import { ScreenReaderOnlyText } from '../screen-reader-only-text/ScreenReaderOnlyText';
import { useAriaConditionalIds } from '../../hooks/use-aria-conditional-ids';

const StyledTextArea = styled.textarea`
    ${inputsStyle};

    min-height: 6.5rem;
    min-width: 100%;
    outline: none;
    overflow: auto;
    resize: vertical;
`;

const Counter = styled.div<{ valid: boolean, theme: ResolvedTheme }>`
    color: ${({ valid, theme }) => (valid ? `${theme.component['text-area-counter-text-color']}` : `${theme.component['text-area-counter-error-text-color']}`)};
    font-size: 0.75rem;
    letter-spacing: 0.02rem;
    line-height: 1.25rem;
`;

export interface TextAreaProps {
    id?: string;
    className?: string;
    label: string;
    tooltip?: TooltipProps;
    toggletip?: ToggletipProps;
    defaultValue?: string;
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    placeholder?: string;
    required?: boolean;
    maxLength?: number;
    /**
     * Message displayed in case of validation error
     * @default This text area input is invalid
     */
    validationErrorMessage?: string;
    /** Only use if you want to control input value externally */
    value?: string;
    hint?: string;
    valid?: boolean;

    onBlur?(event: FocusEvent<HTMLTextAreaElement>): void;

    onChange?(event: ChangeEvent<HTMLTextAreaElement>): void;

    onFocus?(event: FocusEvent<HTMLTextAreaElement>): void;
}

function getInitialValue(value?: string, defaultValue?: string): number {
    if (value) {
        return value.length;
    }
    if (defaultValue) {
        return defaultValue.length;
    }
    return 0;
}

export const TextArea: VoidFunctionComponent<TextAreaProps> = ({
    id: providedId,
    className,
    noMargin,
    onBlur,
    onChange,
    onFocus,
    hint,
    defaultValue,
    disabled,
    label,
    placeholder,
    required,
    tooltip,
    toggletip,
    validationErrorMessage,
    value,
    maxLength,
    valid,
    ...otherProps
}) => {
    const { t } = useTranslation('text-area');
    const [validity, setValidity] = useState(valid ?? true);
    const [inputValueLength, setInputValueLength] = useState(getInitialValue(value, defaultValue));
    const idTextArea = useId(providedId);
    const idCounter = useId();
    const dataAttributes = useDataAttributes(otherProps);

    function handleBlur(event: FocusEvent<HTMLTextAreaElement>): void {
        if (valid === undefined) {
            if (required && inputValueLength === 0) {
                setValidity(true);
            } else if (maxLength === undefined || inputValueLength <= maxLength) {
                setValidity(event.currentTarget.checkValidity());
            }
        }

        onBlur?.(event);
    }

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        const valueLength = event.currentTarget.value.length;
        setInputValueLength(valueLength);

        if (valid === undefined) {
            if (maxLength && valueLength > maxLength) {
                setValidity(false);
            } else if (!validity) {
                setValidity(true);
            }
        }

        onChange?.(event);
    }

    function handleFocus(event: FocusEvent<HTMLTextAreaElement>): void {
        onFocus?.(event);
    }

    const handleOnInvalid: FormEventHandler<HTMLTextAreaElement> = useCallback(() => {
        if (valid === undefined) {
            setValidity(false);
        }
    }, [valid]);

    function getValidationErrorMessage(): string {
        if (validationErrorMessage) {
            return validationErrorMessage;
        }
        if (maxLength && inputValueLength > maxLength) {
            return t('maxLengthValidationErrorMessage');
        }
        return t('validationErrorMessage');
    }

    const ariaDescribedBy = useAriaConditionalIds([
        { id: `${idTextArea}_hint`, include: !!hint },
        { id: `${idTextArea}_invalid`, include: !validity && !!getValidationErrorMessage() },
        { id: idCounter, include: !!maxLength },
    ]);

    useEffect(() => {
        if (valid !== undefined) {
            setValidity(valid);
        }
    }, [valid]);

    return (
        <FieldContainer
            data-testid="container"
            className={className}
            noMargin={noMargin}
            fieldId={idTextArea}
            label={label}
            required={required}
            tooltip={tooltip}
            toggletip={toggletip}
            hint={hint}
            valid={validity}
            validationErrorMessage={getValidationErrorMessage()}
        >
            <StyledTextArea
                data-testid="textarea"
                defaultValue={defaultValue}
                disabled={disabled}
                id={idTextArea}
                aria-describedby={ariaDescribedBy}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onInvalid={handleOnInvalid}
                placeholder={placeholder}
                required={required}
                value={value}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            />
            {maxLength && (
                <Counter
                    data-testid="char-counter"
                    aria-live="polite"
                    id={idCounter}
                    valid={inputValueLength <= maxLength}
                >
                    <ScreenReaderOnlyText
                        label={t('charactersScreenReader', { length: inputValueLength, max: maxLength })}
                    />
                    <span aria-hidden="true">{t('characters', { length: inputValueLength, max: maxLength })}</span>
                </Counter>
            )}
        </FieldContainer>
    );
};

TextArea.displayName = 'TextArea';
