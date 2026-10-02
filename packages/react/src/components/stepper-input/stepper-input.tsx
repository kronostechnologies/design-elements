import {
    type ChangeEvent,
    type DetailedHTMLProps,
    type FC,
    type FocusEvent,
    type FormEventHandler,
    type InputHTMLAttributes,
    type KeyboardEvent,
    type MouseEvent,
    type PointerEvent,
    type RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import styled, { css } from 'styled-components';
import { useId } from '../../hooks/use-id';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes';
import { focus } from '../../utils/css-state';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container';
import { ToggletipProps } from '../toggletip';
import { TooltipProps } from '../tooltip';
import { type RequiredLabelProps } from '../label/label';
import { StepperButton } from './stepper-button';
import {
    stepperSegmentMiddleCornerStyles,
    stepperSegmentSurfaceStyles,
    stepperSegmentTrailingDividerStyles,
} from './stepper-segment-styles';

function getStepperControlWidth(
    theme: ResolvedTheme,
    device: DeviceContextProps,
): string {
    if (device.isMobile) {
        return 'fit-content';
    }

    const buttonSize = theme.component['stepper-button-size'];
    const valueWidth = theme.component['stepper-value-segment-width'];

    return `calc(2 * ${buttonSize} + ${valueWidth})`;
}

function getInputWidth(
    theme: ResolvedTheme,
    device: DeviceContextProps,
    readOnly?: boolean,
): string {
    if (readOnly) {
        if (device.isMobile) {
            return 'auto';
        }

        return '100%';
    }

    return theme.component['stepper-value-segment-width'];
}

function getInputFlex(readOnly?: boolean): string {
    if (readOnly) {
        return '1 1 auto';
    }

    return '0 0 auto';
}

function getInputHeight(
    theme: ResolvedTheme,
    device: DeviceContextProps,
    inErrorSegment?: boolean,
    readOnly?: boolean,
): string {
    if (inErrorSegment) {
        return '100%';
    }

    if (readOnly && device.isMobile) {
        return 'auto';
    }

    return theme.component['stepper-segment-height'];
}

function getStyledInputWidth(
    theme: ResolvedTheme,
    device: DeviceContextProps,
    readOnly?: boolean,
    inErrorSegment?: boolean,
): string {
    if (inErrorSegment) {
        return '100%';
    }

    return getInputWidth(theme, device, readOnly);
}

function getStyledInputFlex(
    readOnly?: boolean,
    inErrorSegment?: boolean,
): string {
    if (inErrorSegment) {
        return '1 1 auto';
    }

    return getInputFlex(readOnly);
}

function getInputBackgroundColor(
    theme: ResolvedTheme,
    device: DeviceContextProps,
    readOnly?: boolean,
): string | undefined {
    if (readOnly) {
        if (device.isMobile) {
            return 'transparent';
        }

        return theme.component['text-input-readonly-background-color'];
    }

    return undefined;
}

function getInputTextColor(theme: ResolvedTheme, readOnly?: boolean): string {
    if (readOnly) {
        return theme.component['text-input-readonly-text-color'];
    }

    return theme.component['text-input-text-color'];
}

function getStyledInputBorder(inErrorSegment?: boolean, readOnly?: boolean): string | undefined {
    if (inErrorSegment || readOnly) {
        return 'none';
    }

    return undefined;
}

interface StepperGroupProps {
    theme: ResolvedTheme;
    $disabled?: boolean;
    $valid?: boolean;
}

function getStepperBorderColor(
    theme: ResolvedTheme,
    { $disabled }: Pick<StepperGroupProps, '$disabled'>,
): string {
    if ($disabled) {
        return theme.component['stepper-button-disabled-border-color'];
    }
    return theme.component['stepper-button-border-color'];
}

const StepperFieldContainer = styled(FieldContainer)<{ $isMobile: boolean }>`
    ${({ $isMobile }) => $isMobile && css`
        max-width: 100%;
        width: fit-content;
    `};
`;

const Wrapper = styled.div<StepperGroupProps & { device: DeviceContextProps }>`
    --stepper-segment-background-color: ${({ theme }) => theme.component['stepper-button-background-color']};
    --stepper-segment-border-color: ${({ theme, $disabled }) => getStepperBorderColor(theme, { $disabled })};
    display: inline-flex;
    isolation: isolate;
    max-width: 100%;
    vertical-align: top;
    width: fit-content;

    ${({ $valid }) => $valid === false && css`
        background-color: transparent;
        border: none;
        overflow: visible;

        > *:not(:last-child) {
            border-right: none;
        }
    `};
`;

/*
 * Flex paints later siblings on top at shared edges ([−][value][+]). Overlap the trailing
 * button by 1px and stack above it so the right error edge stays visible.
 */
const ErrorValueSegment = styled.div`
    background: ${({ theme }) => theme.component['stepper-button-background-color']};
    border: 1px solid ${({ theme }) => theme.component['text-input-error-border-color']};
    border-radius: var(--border-radius-none, 0);
    box-sizing: border-box;
    display: flex;
    flex: ${() => getInputFlex(false)};
    flex-shrink: 0;
    height: ${({ theme }) => theme.component['stepper-segment-height']};
    margin-right: -1px;
    pointer-events: none;
    position: relative;
    width: ${({ theme }) => theme.component['stepper-value-segment-width']};
    z-index: 2;

    &::after {
        background: ${({ theme }) => theme.component['text-input-error-border-color']};
        content: '';
        height: 100%;
        pointer-events: none;
        position: absolute;
        right: -1px;
        top: 0;
        width: 1px;
        z-index: 1;
    }

    input {
        pointer-events: auto;
    }
`;

const ReadOnlyWrapper = styled.div<{ device: DeviceContextProps }>`
    background-color: ${({ theme }) => theme.component['text-input-readonly-background-color']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    display: flex;
    max-width: 100%;
    width: ${({ theme, device }) => getStepperControlWidth(theme, device)};

    ${({ device }) => device.isMobile && css`
        padding: var(--spacing-1halfx);
    `};
`;

interface StyledInputProps {
    device: DeviceContextProps;
    theme: ResolvedTheme;
    $inErrorSegment?: boolean;
    $readOnly?: boolean;
}

const inputSegmentStyles = css<StyledInputProps>`
    background-color: ${({ theme, device, $readOnly }) => getInputBackgroundColor(theme, device, $readOnly)};
    ${({ $inErrorSegment, $readOnly }) => !$inErrorSegment && !$readOnly && css`
        ${stepperSegmentSurfaceStyles};
        ${stepperSegmentTrailingDividerStyles};
        ${stepperSegmentMiddleCornerStyles};
    `};
    box-sizing: border-box;
    color: ${({ theme, $readOnly }) => getInputTextColor(theme, $readOnly)};
    font-family: inherit;
    font-size: ${({ theme }) => theme.component['stepper-value-font-size']};
    height:
        ${({
        theme,
        device,
        $inErrorSegment,
        $readOnly,
    }) => getInputHeight(theme, device, $inErrorSegment, $readOnly)};
    letter-spacing: ${({ theme }) => theme.component['stepper-value-letter-spacing']};
    line-height: ${({ theme }) => theme.component['stepper-value-line-height']};
    margin: 0;
    outline: none;
    padding:
        ${({
        theme,
        $readOnly,
        device,
    }) => {
        if ($readOnly && device.isMobile) {
            return '0 var(--spacing-1x)';
        }
        return `0 ${theme.component['stepper-value-padding-inline']}`;
    }};
    text-align: left;
    width:
        ${({
        theme,
        device,
        $readOnly,
        $inErrorSegment,
    }) => getStyledInputWidth(theme, device, $readOnly, $inErrorSegment)};
    ${({ $inErrorSegment }) => !$inErrorSegment && css`
        z-index: 2;
    `};

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none; /* stylelint-disable-line property-no-vendor-prefix */
        margin: 0;
    }

    &[type='number'] {
        -moz-appearance: textfield; /* stylelint-disable-line property-no-vendor-prefix */
    }

    &:disabled {
        background-color: ${({ theme }) => theme.component['text-input-disabled-background-color']};
        border-color: ${({ theme }) => theme.component['stepper-button-disabled-border-color']};
        color: ${({ theme }) => theme.component['text-input-disabled-text-color']};
    }

    &:read-only {
        background-color: ${({ theme }) => theme.component['text-input-readonly-background-color']};
        color: ${({ theme }) => theme.component['text-input-readonly-text-color']};
    }
`;

const StyledInput = styled.input<StyledInputProps>`
    ${inputSegmentStyles};

    border: ${({ $inErrorSegment, $readOnly }) => getStyledInputBorder($inErrorSegment, $readOnly)};
    flex: ${({ $readOnly, $inErrorSegment }) => getStyledInputFlex($readOnly, $inErrorSegment)};

    ${({ theme }) => focus({ theme })};
`;

type PartialStepperInputProps = Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'disabled' | 'onFocus' | 'onBlur' | 'step'>;

type Value = undefined | number | null;

export interface StepperInputProps extends PartialStepperInputProps {
    defaultValue?: number;
    hint?: string;
    id?: string;
    label?: string;
    max?: number;
    min?: number;
    name?: string;
    noMargin?: boolean;
    readOnly?: boolean;
    tooltip?: TooltipProps;
    toggletip?: ToggletipProps;
    valid?: boolean;
    validationErrorMessage?: string;
    value?: Value;
    required?: boolean;
    requiredLabelType?: RequiredLabelProps['type'];

    onChange?(value: Value): void
}

function triggerChangeEventOnRef(ref: RefObject<HTMLInputElement>): void {
    // Rationale for using dispatchEvent: https://github.com/kronostechnologies/design-elements/pull/180#discussion_r556050899
    ref.current?.dispatchEvent(new Event('change', { bubbles: true }));
}

function isAtMin(value: Value, min: number | undefined): boolean {
    return min !== undefined && value !== null && value !== undefined && value <= min;
}

function isAtMax(value: Value, max: number | undefined): boolean {
    return max !== undefined && value !== null && value !== undefined && value >= max;
}

export const StepperInput: FC<StepperInputProps> = ({
    defaultValue,
    disabled,
    hint,
    id: providedId,
    label,
    max,
    min,
    name,
    noMargin,
    readOnly,
    step,
    tooltip,
    toggletip,
    required,
    requiredLabelType,
    valid,
    validationErrorMessage,
    value,
    onBlur,
    onChange,
    onFocus,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation('stepper-input');
    const device = useDeviceContext();
    const fieldId = useId(providedId);
    const intervalId = useRef<NodeJS.Timeout>();
    const timeoutId = useRef<NodeJS.Timeout>();
    const holdRepeatStartedRef = useRef(false);
    const currentValueRef = useRef<Value>(defaultValue ?? null);
    const [validity, setValidity] = useState(valid ?? true);
    const [internalValue, setInternalValue] = useState<Value>(defaultValue ?? null);

    const currentValue = value !== undefined ? value : internalValue;
    currentValueRef.current = currentValue;
    const showButtons = !readOnly;
    const isDecrementDisabled = disabled || isAtMin(currentValue, min);
    const isIncrementDisabled = disabled || isAtMax(currentValue, max);

    const applySingleStep = useCallback((direction: 'up' | 'down'): void => {
        const input = inputRef.current;
        if (!input) {
            return;
        }

        const steppingControlledValue = value !== undefined;
        let valueForStep: Value;
        if (steppingControlledValue) {
            valueForStep = currentValueRef.current;
        } else if (input.value === '') {
            valueForStep = null;
        } else {
            valueForStep = Number(input.value);
        }

        if (direction === 'up' && isAtMax(valueForStep, max)) {
            return;
        }
        if (direction === 'down' && isAtMin(valueForStep, min)) {
            return;
        }

        const valueBefore = steppingControlledValue
            ? valueForStep
            : Number(input.value);

        let previousInputValue: string | undefined;
        if (steppingControlledValue) {
            previousInputValue = input.value;
            if (valueForStep === null || valueForStep === undefined || Number.isNaN(Number(valueForStep))) {
                input.value = '';
            } else {
                input.value = String(valueForStep);
            }
        }

        if (direction === 'up') {
            input.stepUp();
        } else {
            input.stepDown();
        }

        if (steppingControlledValue) {
            const steppedValue = input.value === '' ? null : input.valueAsNumber;
            input.value = previousInputValue ?? '';

            if (
                steppedValue !== null
                && !Number.isNaN(steppedValue)
                && steppedValue !== valueForStep
            ) {
                onChange?.(steppedValue);
            }
            return;
        }

        const valueAfter = Number(input.value);
        if (valueBefore !== valueAfter) {
            triggerChangeEventOnRef(inputRef);
        }
    }, [max, min, onChange, value]);

    const handleActivate = useCallback((
        direction: 'up' | 'down',
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    ): void => {
        if ('type' in event && event.type === 'click' && holdRepeatStartedRef.current) {
            holdRepeatStartedRef.current = false;
            return;
        }
        if (direction === 'up' && isIncrementDisabled) return;
        if (direction === 'down' && isDecrementDisabled) return;

        applySingleStep(direction);
    }, [applySingleStep, isDecrementDisabled, isIncrementDisabled]);

    const handleHoldStart = useCallback((
        direction: 'up' | 'down',
        event: PointerEvent<HTMLButtonElement>,
    ): void => {
        if (event.button !== 0) return;
        if (direction === 'up' && isIncrementDisabled) return;
        if (direction === 'down' && isDecrementDisabled) return;

        holdRepeatStartedRef.current = false;
        timeoutId.current = setTimeout(() => {
            holdRepeatStartedRef.current = true;
            intervalId.current = setInterval(() => applySingleStep(direction), 50);
        }, 500);
    }, [applySingleStep, isDecrementDisabled, isIncrementDisabled]);

    const handleIncrementActivate = useCallback((
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    ): void => {
        handleActivate('up', event);
    }, [handleActivate]);

    const handleDecrementActivate = useCallback((
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    ): void => {
        handleActivate('down', event);
    }, [handleActivate]);

    const handleIncrementHoldStart = useCallback((
        event: PointerEvent<HTMLButtonElement>,
    ): void => {
        handleHoldStart('up', event);
    }, [handleHoldStart]);

    const handleDecrementHoldStart = useCallback((
        event: PointerEvent<HTMLButtonElement>,
    ): void => {
        handleHoldStart('down', event);
    }, [handleHoldStart]);

    const handleStop = useCallback((): void => {
        holdRepeatStartedRef.current = false;
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = undefined;
        }
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = undefined;
        }
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value;
        if (inputValue === '') {
            if (value === undefined) {
                setInternalValue(null);
            }
            onChange?.(null);
        } else {
            const nextValue = Number(inputValue);
            if (value === undefined) {
                setInternalValue(nextValue);
            }
            onChange?.(nextValue);
        }
    };

    const handleBlur: (event: FocusEvent<HTMLInputElement>) => void = useCallback((event) => {
        if (valid === undefined) {
            if (required && event.currentTarget.value === '') {
                setValidity(true);
            } else {
                setValidity(event.currentTarget.checkValidity());
            }
        }

        onBlur?.(event);
    }, [onBlur, valid, required]);

    const handleOnInvalid: FormEventHandler<HTMLInputElement> = useCallback(() => {
        if (valid === undefined) {
            setValidity(false);
        }
    }, [valid]);

    useEffect(() => {
        if (valid !== undefined) {
            setValidity(valid);
        }
    }, [valid]);

    useEffect(() => () => handleStop(), [handleStop]);

    useEffect(() => {
        if (disabled || readOnly) {
            handleStop();
        }
    }, [disabled, handleStop, readOnly]);

    const showErrorValueSegment = !readOnly && !validity;

    const inputElement = (
        <StyledInput
            $inErrorSegment={showErrorValueSegment}
            $readOnly={readOnly}
            aria-invalid={!validity}
            data-testid="stepper-input"
            defaultValue={defaultValue}
            device={device}
            disabled={disabled}
            id={fieldId}
            max={max}
            min={min}
            name={name}
            readOnly={readOnly}
            ref={inputRef}
            required={required}
            step={step}
            type="number"
            value={value === null ? '' : value}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={onFocus}
            onInvalid={handleOnInvalid}
        />
    );

    return (
        <StepperFieldContainer
            $isMobile={device.isMobile}
            fieldId={fieldId}
            hint={hint}
            label={label}
            noMargin={noMargin}
            required={required}
            requiredLabelType={requiredLabelType}
            toggletip={toggletip}
            tooltip={tooltip}
            valid={validity}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
        >
            {readOnly ? (
                <ReadOnlyWrapper data-testid="stepper-input-readonly" device={device}>
                    {inputElement}
                </ReadOnlyWrapper>
            ) : (
                <Wrapper
                    $disabled={disabled}
                    $valid={validity}
                    device={device}
                    role="group"
                    aria-labelledby={label ? `${fieldId}_label` : undefined}
                >
                    {showButtons && (
                        <StepperButton
                            disabled={isDecrementDisabled}
                            frameEdge={validity ? undefined : 'leading'}
                            type="decrement"
                            onHoldStart={handleDecrementHoldStart}
                            onPress={handleDecrementActivate}
                            onStop={handleStop}
                        />
                    )}
                    {showErrorValueSegment ? (
                        <ErrorValueSegment>
                            {inputElement}
                        </ErrorValueSegment>
                    ) : (
                        inputElement
                    )}
                    {showButtons && (
                        <StepperButton
                            disabled={isIncrementDisabled}
                            frameEdge={validity ? undefined : 'trailing'}
                            type="increment"
                            onHoldStart={handleIncrementHoldStart}
                            onPress={handleIncrementActivate}
                            onStop={handleStop}
                        />
                    )}
                </Wrapper>
            )}
        </StepperFieldContainer>
    );
};

StepperInput.displayName = 'StepperInput';
