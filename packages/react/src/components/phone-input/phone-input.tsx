import InputMask, { Props } from 'react-input-mask';
import React, { ChangeEvent, FocusEvent, ReactElement } from 'react';

import { TextInput } from '../text-input/text-input';
import { useDeviceContext } from "@design-elements/components/device-context-provider/device-context-provider";

interface PhoneInputProps {
    defaultValue?: string;
    value?: string;
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    label?: string;
    required?: boolean;
    validationErrorMessage?: string;
    hint?: string;

    onBlur?(event: FocusEvent<HTMLInputElement>): void;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;

    onFocus?(event: FocusEvent<HTMLInputElement>): void;
}

export function PhoneInput({
        defaultValue,
        disabled,
        hint,
        label,
        noMargin,
        onBlur,
        onChange,
        onFocus,
        required,
        validationErrorMessage,
        value
}: PhoneInputProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const requiredInputPattern = "([(][0-9]{3}[)]\\s[0-9]{3}[-][0-9]{4})";
    const optionalInputPattern = "([(][0-9]{3}[)]\\s[0-9]{3}[-][0-9]{4})|([(][_]{3}[)]\\s[_]{3}[-][_]{4})";

    function onInputMaskChange(event: ChangeEvent<HTMLInputElement>): void {
        onChange?.(event);
    }

    return (
        <InputMask
            mask="(999) 999-9999"
            alwaysShowMask={true}
            onChange={onInputMaskChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
        >
            {(maskProps: Props) => <TextInput
                type="tel"
                inputWidth={ isMobile ? '10.25rem' : '7.5rem' }
                inputHeight={ isMobile ? '2.5rem' : '2rem' }
                required={required}
                label={label}
                hint={hint}
                pattern={ required ? requiredInputPattern : optionalInputPattern }
                validationErrorMessage={validationErrorMessage}
                noMargin={noMargin}
                disabled={disabled}
                value={maskProps.value}
                defaultValue={maskProps.defaultValue}
            />}
        </InputMask>
    );
}
