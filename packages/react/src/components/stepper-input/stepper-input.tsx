import React, { DetailedHTMLProps, InputHTMLAttributes, ReactElement, RefObject, useRef, useMemo } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { Theme } from '@design-elements/themes/theme';
import { useTranslation } from '@design-elements/i18n/i18n';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { responsiveInputsStyle } from '../text-input/styles/inputs';
import { StepperButtons } from './stepper-buttons';

const Wrapper = styled.div`
    display: flex;
    max-width: fit-content;
`;

interface StyledInputProps {
    device: DeviceContextProps;
    theme: Theme;
}

const StyledInput = styled.input<StyledInputProps>`
    ${({ theme, device }) => responsiveInputsStyle({ theme, device })}

    border-radius: ${({ device }) => (device.isMobile ? 'var(--border-radius)' : 'var(--border-radius) 0 0 var(--border-radius)')};
    height: ${({ device }) => (device.isMobile ? 40 : 32)}px;
    width: ${({ device }) => (device.isMobile ? 164 : 56)}px;
    z-index: 1;

    /* stylelint-disable */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    /* stylelint-enable */

    &[type=number] {
        -moz-appearance: textfield; /* stylelint-disable-line */
    }
`;

type PartialStepperInputProps = Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'defaultValue' | 'disabled' | 'max' | 'min' | 'onChange' | 'onFocus' | 'onBlur' | 'step'>;

interface StepperInputProps extends PartialStepperInputProps {
    hint?: string;
    id?: string;
    label?: string;
    noMargin?: boolean;
    valid?: boolean;
    validationErrorMessage?: string;
}

function triggerChangeEventOnRef(ref: RefObject<HTMLInputElement>): void {
    ref.current?.dispatchEvent(new Event('change', { bubbles: true }));
}

export function StepperInput({
    defaultValue,
    disabled,
    hint,
    id,
    label,
    max,
    min,
    noMargin,
    step,
    valid = true,
    validationErrorMessage,
    onBlur,
    onChange,
    onFocus,
}: StepperInputProps): ReactElement {
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation('stepper-input');
    const device = useDeviceContext();
    const fieldId = useMemo(() => id || uuid(), [id]);

    function handleIncrement(): void {
        inputRef.current?.stepUp();
        triggerChangeEventOnRef(inputRef);
    }

    function handleDecrement(): void {
        inputRef.current?.stepDown();
        triggerChangeEventOnRef(inputRef);
    }

    return (
        <FieldContainer
            fieldId={fieldId}
            hint={hint}
            label={label}
            noMargin={noMargin}
            valid={valid}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
        >
            <Wrapper>
                <StyledInput
                    data-testid="stepper-input"
                    defaultValue={defaultValue}
                    device={device}
                    disabled={disabled}
                    id="points"
                    max={max}
                    min={min}
                    name="points"
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    ref={inputRef}
                    step={step}
                    type="number"
                />
                {!device.isMobile && (
                    <StepperButtons
                        disabled={disabled}
                        onDecrement={handleDecrement}
                        onIncrement={handleIncrement}
                    />
                )}
            </Wrapper>
        </FieldContainer>
    );
}
