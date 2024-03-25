import { ChangeEvent, FocusEvent, useMemo, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes/theme';
import { v4 as uuid } from '../../utils/uuid';
import { FieldContainer } from '../field-container/field-container';
import { inputsStyle } from '../text-input/styles/inputs';
import { TooltipProps } from '../tooltip/tooltip';
import { ScreenReaderOnlyText } from '../screen-reader-only-text/ScreenReaderOnlyText';
import { AriaLabelsProps, useAriaLabels } from '../../hooks/use-aria';

const StyledTextArea = styled.textarea`
    ${(props) => inputsStyle(props.theme)};

    min-height: 6.5rem;
    min-width: 100%;
    outline: none;
    overflow: auto;
    resize: vertical;
`;

const Counter = styled.div<{ valid: boolean, theme: ResolvedTheme }>`
    color: ${({ valid, theme }) => (valid ? `${theme.greys['dark-grey']}` : `${theme.notifications['alert-2.1']}`)};
    font-size: 0.75rem;
    letter-spacing: 0.02rem;
    line-height: 1.25rem;
`;

export interface TextAreaProps extends AriaLabelsProps {
    className?: string;
    tooltip?: TooltipProps;
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
    className,
    noMargin,
    onBlur,
    onChange,
    onFocus,
    hint,
    defaultValue,
    disabled,
    label,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    placeholder,
    required,
    tooltip,
    validationErrorMessage,
    value,
    maxLength,
    ...otherProps
}) => {
    const { t } = useTranslation('text-area');
    const [validity, setValidity] = useState(true);
    const [inputValueLength, setInputValueLength] = useState(getInitialValue(value, defaultValue));
    const idTextArea = useMemo(uuid, []);
    const idCounter = useMemo(uuid, []);
    const dataAttributes = useDataAttributes(otherProps);

    function handleBlur(event: FocusEvent<HTMLTextAreaElement>): void {
        if (maxLength === undefined || inputValueLength <= maxLength) {
            setValidity(event.currentTarget.checkValidity());
        }

        if (onBlur) {
            onBlur(event);
        }
    }

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        const valueLength = event.currentTarget.value.length;
        setInputValueLength(valueLength);

        if (maxLength && valueLength > maxLength) {
            setValidity(false);
        } else if (!validity) {
            setValidity(true);
        }

        if (onChange) {
            onChange(event);
        }
    }

    function handleFocus(event: FocusEvent<HTMLTextAreaElement>): void {
        if (onFocus) {
            onFocus(event);
        }
    }

    function getValidationErrorMessage(): string {
        if (validationErrorMessage) {
            return validationErrorMessage;
        }
        if (maxLength && inputValueLength > maxLength) {
            return t('maxLengthValidationErrorMessage');
        }
        return t('validationErrorMessage');
    }

    const { processedLabels } = useAriaLabels({
        inputId: idTextArea,
        label,
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy,
        additionalAriaDescribedBy: [
            { id: `${idTextArea}_hint`, include: !!hint },
            { id: `${idTextArea}_invalid`, include: !validity && !!getValidationErrorMessage() },
            { id: idCounter, include: !!maxLength },
        ],
    });

    return (
        <FieldContainer
            data-testid="container"
            className={className}
            noMargin={noMargin}
            fieldId={idTextArea}
            label={processedLabels.label}
            required={required}
            tooltip={tooltip}
            hint={hint}
            valid={validity}
            validationErrorMessage={getValidationErrorMessage()}
        >
            <StyledTextArea
                aria-label={processedLabels.ariaLabel}
                aria-labelledby={processedLabels.ariaLabelledBy}
                aria-describedby={processedLabels.ariaDescribedBy}
                data-testid="textarea"
                defaultValue={defaultValue}
                disabled={disabled}
                id={idTextArea}
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
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
