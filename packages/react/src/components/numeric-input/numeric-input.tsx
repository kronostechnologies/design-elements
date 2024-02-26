import {
    HTMLProps,
    ReactNode,
    useMemo,
    useRef,
    VoidFunctionComponent,
} from 'react';
import styled, { css } from 'styled-components';
import { useId } from '../../hooks/use-id';
import { focus } from '../../utils/css-state';
import { ResolvedTheme } from '../../themes/theme';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { inputsStyle } from '../text-input/styles/inputs';
import { TooltipProps } from '../tooltip/tooltip';
import { useNumericInput, UseNumericInputParams } from './use-numeric-input';

interface StyledInputProps {
    device: DeviceContextProps;
    theme: ResolvedTheme;
    $textAlign: 'left' | 'right';
}

const StyledInput = styled.input<StyledInputProps>`
    ${({ theme, device }) => inputsStyle(theme, device.isMobile, false)}
    border: 0;
    flex: 1 1 auto;
    min-height: 100%;
    text-align: ${({ $textAlign }) => $textAlign};

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
    ${({ theme }) => focus({ theme }, false, undefined, true, false, false, 'focus-within')};
    ${({ $invalid, theme }) => $invalid && css`
        border-color: ${theme.component['numeric-input-invalid-border-color']};
`};
    ${({ $disabled, theme }) => $disabled && css`
        background-color: ${theme.component['numeric-input-disabled-background-color']};
        border-color: ${theme.component['numeric-input-disabled-border-color']};
        ${Adornment} {
            color: ${theme.component['numeric-input-disabled-adornment-text-color']};
        }
`};
`;

type NativeInputProps = Pick<HTMLProps<HTMLInputElement>, 'disabled' | 'onFocus' | 'placeholder'>;

interface NumericInputProps extends NativeInputProps {
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
    textAlign?: 'left' | 'right';
    tooltip?: TooltipProps;
    invalid?: boolean;
    validationErrorMessage?: string;
    value?: number | string;
}

export const NumericInput: VoidFunctionComponent<NumericInputProps> = ({
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
    textAlign = 'left',
    tooltip,
    invalid,
    validationErrorMessage,
    value,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const device = useDeviceContext();
    const fieldId = useId(id);

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

    const adornmentContent = useMemo(() => (
        adornment ? <Adornment $position={adornmentPosition}>{adornment}</Adornment> : null
    ), [adornment, adornmentPosition]);

    return (
        <FieldContainer
            className={className}
            fieldId={fieldId}
            hint={hint}
            label={label}
            tooltip={tooltip}
            noMargin={noMargin}
            valid={!numericInput.invalid}
            noInvalidFieldIcon={!numericInput.validationErrorMessage}
            validationErrorMessage={numericInput.validationErrorMessage ?? ''}
        >
            <Wrapper $disabled={disabled} $invalid={numericInput.invalid}>
                {(adornment && adornmentPosition === 'start') && adornmentContent}
                <StyledInput
                    $textAlign={textAlign}
                    data-testid="numeric-input"
                    device={device}
                    disabled={disabled}
                    id={fieldId}
                    inputMode="numeric"
                    onBlur={numericInput.onBlurHandler}
                    onChange={numericInput.onChangeHandler}
                    onFocus={onFocus}
                    onPaste={numericInput.onPasteHandler}
                    placeholder={placeholder}
                    ref={inputRef}
                    type="text"
                    value={numericInput.value}
                />
                {(adornment && adornmentPosition === 'end') && adornmentContent}
            </Wrapper>
        </FieldContainer>
    );
};
