import { type FC, HTMLProps, ReactNode, useRef } from 'react';
import styled from 'styled-components';
import { TextInput, textInputClasses, TextInputProps } from '../text-input';
import { type ToggletipProps } from '../toggletip';
import { type TooltipProps } from '../tooltip';
import { useNumericInput, type UseNumericInputParams } from './use-numeric-input';

interface StyledInputProps extends TextInputProps {
    $textAlign: 'left' | 'right';
}

const StyledTextInput = styled(TextInput)<StyledInputProps>`
    .${textInputClasses.control} {
        text-align: ${({ $textAlign }) => $textAlign};
    }

    .${textInputClasses.leftAdornment},
    .${textInputClasses.rightAdornment} {
        color: ${({ theme }) => theme.alias['color-control-value']};
    }
`;

type NativeInputProps = Pick<HTMLProps<HTMLInputElement>, 'disabled' | 'onFocus' | 'placeholder'>;

export interface NumericInputProps extends NativeInputProps {
    adornment?: ReactNode;
    adornmentPosition?: 'start' | 'end';
    className?: string;
    defaultValue?: number | string;
    hint?: string;
    id?: string;
    label?: string;
    max?: number;
    min?: number;
    noMargin?: boolean;
    onBlur?: UseNumericInputParams['onBlur'];
    onChange?: UseNumericInputParams['onChange'];
    precision?: number;
    required?: boolean;
    readOnly?: boolean;
    textAlign?: 'left' | 'right';
    tooltip?: TooltipProps;
    toggletip?: ToggletipProps;
    invalid?: boolean;
    validationErrorMessage?: string;
    value?: number | string;
}

export const NumericInput: FC<NumericInputProps> = ({
    adornment,
    adornmentPosition = 'start',
    className,
    defaultValue,
    disabled,
    hint,
    id,
    label,
    max,
    min,
    noMargin,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    precision,
    required,
    readOnly,
    textAlign = 'left',
    tooltip,
    toggletip,
    invalid,
    validationErrorMessage,
    value,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const numericInput = useNumericInput({
        defaultValue,
        max,
        min,
        onBlur,
        onChange,
        precision,
        required,
        invalid,
        validationErrorMessage,
        value,
    });

    return (
        <StyledTextInput
            $textAlign={textAlign}
            className={className}
            data-testid="numeric-input"
            disabled={disabled}
            hint={hint}
            id={id}
            inputMode="numeric"
            valid={numericInput.invalid === undefined ? undefined : !numericInput.invalid}
            label={label}
            leftAdornment={adornmentPosition === 'start' && adornment}
            noMargin={noMargin}
            onBlur={numericInput.onBlurHandler}
            onChange={numericInput.onChangeHandler}
            onFocus={onFocus}
            onInvalid={numericInput.onInvalid}
            onPaste={numericInput.onPasteHandler}
            placeholder={placeholder}
            readOnly={readOnly}
            required={numericInput.required}
            ref={inputRef}
            rightAdornment={adornmentPosition === 'end' && adornment}
            tooltip={tooltip}
            toggletip={toggletip}
            type="text"
            value={numericInput.value}
            validationErrorMessage={numericInput.validationErrorMessage}
        />
    );
};
