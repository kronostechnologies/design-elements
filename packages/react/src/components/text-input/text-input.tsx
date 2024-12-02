import {
    ChangeEvent,
    ClipboardEvent,
    DetailedHTMLProps,
    FocusEvent,
    FormEvent,
    FormEventHandler,
    forwardRef,
    InputHTMLAttributes,
    KeyboardEvent,
    MouseEvent,
    ReactElement,
    ReactNode,
    Ref,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
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
import { textInputClasses } from './text-input-classes';

const StyleInput = styled.input<{ isMobile: boolean }>`
    ${({ theme, isMobile }) => inputsStyle({ theme, isMobile, isFocusable: false })};

    border: 0;
    flex: 1 1 auto;
    min-height: 100%;

    &:focus,
    &:disabled {
        border: 0;
        box-shadow: none;
    }
`;

interface AdornmentProps {
    $isMobile: boolean;
}

const Adornment = styled.span<AdornmentProps>`
    align-self: center;
    color: ${({ theme }) => theme.component['text-input-adornment-color']};
    display: flex;
    flex-shrink: 0;

    > svg {
        height: ${({ $isMobile }) => ($isMobile ? '24px' : '16px')};
        width: ${({ $isMobile }) => ($isMobile ? '24px' : '16px')};
    }
`;

const LeftAdornment = styled(Adornment)`
    padding-left: var(--spacing-1x);
`;
const RightAdornment = styled(Adornment)`
    padding-right: var(--spacing-1x);
`;

interface StyledWrapperProps {
    $disabled?: boolean;
    $valid?: boolean;
}

const StyleWrapper = styled.div<StyledWrapperProps>`
    background: ${({ theme }) => theme.component['text-input-background-color']};
    border: 1px solid ${({ theme }) => theme.component['text-input-border-color']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    display: flex;
    height: var(--size-2x);

    ${({ theme }) => focus({ theme }, { focusType: 'focus-within' })};

    ${({ $valid, theme }) => !$valid && css`
        border-color: ${theme.component['text-input-error-border-color']};
    `};
    ${({ $disabled, theme }) => $disabled && css`
        background-color: ${theme.component['text-input-disabled-background-color']};
        border-color: ${theme.component['text-input-disabled-border-color']};

        ${Adornment} {
            color: ${theme.component['text-input-disabled-adornment-text-color']};
        }
    `};
`;

type PartialInputProps = Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'inputMode' | 'name' | 'value' | 'autoComplete'>;

export interface TextInputProps extends PartialInputProps {
    ariaDescribedBy?: string;
    ariaInvalid?: boolean;
    className?: string;
    defaultValue?: string;
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    id?: string;
    label?: string;
    leftAdornment?: ReactNode;
    tooltip?: TooltipProps;
    pattern?: string;
    placeholder?: string;
    required?: boolean;
    rightAdornment?: ReactNode;
    type?: string;
    valid?: boolean;
    validationErrorMessage?: string;
    hint?: string;

    onBlur?(event: FocusEvent<HTMLInputElement>): void;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;

    onFocus?(event: FocusEvent<HTMLInputElement>): void;

    onInvalid?(event: FormEvent<HTMLInputElement>): void;

    onKeyUp?(event: KeyboardEvent<HTMLInputElement>): void;

    onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;

    onMouseUp?(event: MouseEvent<HTMLInputElement>): void;

    onPaste?(event: ClipboardEvent<HTMLInputElement>): void;
}

export const TextInput = forwardRef(({
    ariaDescribedBy,
    ariaInvalid,
    autoComplete,
    className,
    defaultValue,
    disabled,
    hint,
    id: providedId,
    inputMode,
    label,
    leftAdornment,
    tooltip,
    name,
    noMargin,
    pattern,
    placeholder,
    required,
    rightAdornment,
    type,
    valid,
    validationErrorMessage,
    value,
    onBlur,
    onChange,
    onFocus,
    onInvalid,
    onKeyUp,
    onKeyDown,
    onMouseUp,
    onPaste,
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

    const handleBlur: (event: FocusEvent<HTMLInputElement>) => void = useCallback((event) => {
        if (valid === undefined) {
            if (required && event.currentTarget.value === '') {
                setValidity({ validity: true });
            } else {
                setValidity({ validity: event.currentTarget.checkValidity() });
            }
        }

        onBlur?.(event);
    }, [onBlur, valid, required]);

    const handleOnInvalid: FormEventHandler<HTMLInputElement> = useCallback((event) => {
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

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const handleAdornmentClick = (): void => {
        inputRef.current?.focus();
    };

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
            <StyleWrapper
                className={textInputClasses.control}
                $disabled={disabled}
                $valid={validity}
            >
                {leftAdornment && (
                    <LeftAdornment
                        className={textInputClasses.leftAdornment}
                        onClick={handleAdornmentClick}
                        $isMobile={isMobile}
                    >
                        {leftAdornment}
                    </LeftAdornment>
                )}

                <StyleInput
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
                    onPaste={onPaste}
                    pattern={pattern}
                    placeholder={placeholder}
                    required={required}
                    type={type || 'text'}
                    value={value}
                    {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                />
                {rightAdornment && (
                    <RightAdornment
                        className={textInputClasses.rightAdornment}
                        onClick={handleAdornmentClick}
                        $isMobile={isMobile}
                    >
                        {rightAdornment}
                    </RightAdornment>
                )}

            </StyleWrapper>
        </FieldContainer>
    );
});

TextInput.displayName = 'TextInput';
