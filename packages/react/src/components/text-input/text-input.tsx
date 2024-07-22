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
    ReactNode,
    Ref,
    useCallback,
    useEffect, useImperativeHandle,
    useMemo, useRef,
    useState,
} from 'react';
import styled, { css } from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { TooltipProps } from '../tooltip/tooltip';
import { inputsStyle } from './styles/inputs';
import { useAriaConditionalIds } from '../../hooks/use-aria-conditional-ids';
import { useId } from '../../hooks/use-id';
import { focus } from '../../utils/css-state';

interface StyledInputProps {
    isMobile: boolean;
    $textAlign?: 'left' | 'right';
}

const StyleInput = styled.input<StyledInputProps>`
    ${({ theme, isMobile }) => inputsStyle({ theme, isMobile, isFocusable: false })};
    border: 0;
    flex: 1 1 auto;
    min-height: 100%;
    text-align: ${({ $textAlign }) => $textAlign};
    &:focus,
    &:disabled {
        border: 0;
        box-shadow: none;
    }
`;

const Adornment = styled.span<{ $position: 'start' | 'end' }>`
    align-self: center;
    display: flex;
    padding-left: ${({ $position }) => ($position === 'start' ? 'var(--spacing-1x)' : undefined)};
    padding-right: ${({ $position }) => ($position === 'end' ? 'var(--spacing-1x)' : undefined)};
`;

interface StyledWrapperProps {
    $disabled?: boolean;
    $invalid?: boolean;
}

const Wrapper = styled.div<StyledWrapperProps>`
    background: ${({ theme }) => theme.component['numeric-input-background-color']};
    border: 1px solid ${({ theme }) => theme.component['numeric-input-border-color']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    display: flex;
    height: var(--size-2x);

    ${({ theme }) => focus({ theme }, { focusType: 'focus-within' })};

    ${({ $invalid, theme }) => $invalid && css`
        border-color: ${theme.component['numeric-input-error-border-color']};
`};
    ${({ $disabled, theme }) => $disabled && css`
        background-color: ${theme.component['numeric-input-disabled-background-color']};
        border-color: ${theme.component['numeric-input-disabled-border-color']};

        ${Adornment} {
            color: ${theme.component['numeric-input-disabled-adornment-text-color']};
        }
    `};
`;

type PartialInputProps = Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'inputMode' | 'name' | 'value' | 'autoComplete'>;

interface TextInputProps extends PartialInputProps {
    adornment?: ReactNode;
    adornmentPosition?: 'start' | 'end';
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
    adornment,
    adornmentPosition = 'start',
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
    const fieldId = useId(providedId);
    const dataAttributes = useDataAttributes(otherProps);
    const inputRef = useRef<HTMLInputElement>(null);

    const processedAriaDescribedBy = useAriaConditionalIds([
        { id: ariaDescribedBy },
        { id: `${fieldId}_invalid`, include: !validity },
        { id: `${fieldId}_hint`, include: !!hint },
    ]);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const handleAdornmentClick = (): void => {
        inputRef.current?.focus();
    };

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

    const adornmentContent = useMemo(() => (
        adornment ? (
            <Adornment
                onClick={handleAdornmentClick}
                $position={adornmentPosition}
            >
                {adornment}
            </Adornment>
        ) : null
    ), [adornment, adornmentPosition]);

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
            label={label}
            required={required}
            tooltip={tooltip}
            valid={validity}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            hint={hint}
            data-testid="field-container"
        >
            <Wrapper $disabled={disabled} $invalid={validity}>
                {(adornment && adornmentPosition === 'start') && adornmentContent}
                <StyleInput
                    $textAlign={adornmentPosition === 'end' ? 'right' : 'left'}
                    aria-describedby={processedAriaDescribedBy || undefined}
                    aria-invalid={ariaInvalid}
                    autoComplete={autoComplete}
                    data-testid="text-input"
                    isMobile={isMobile}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    id={fieldId}
                    inputMode={inputMode}
                    name={name}
                    ref={inputRef}
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
                {(adornment && adornmentPosition === 'end') && adornmentContent}
            </Wrapper>
        </FieldContainer>
    );
});

TextInput.displayName = 'TextInput';
