import {
    type ChangeEvent,
    type DetailedHTMLProps,
    type FC,
    type FocusEvent,
    type FormEventHandler,
    type InputHTMLAttributes,
    type KeyboardEvent,
    type MouseEvent,
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

function getStepperControlWidth(device: DeviceContextProps): string {
    if (device.isMobile) {
        return 'fit-content';
    }

    return 'calc(2 * var(--size-2x) + 3rem)';
}

function getMobileValueSegmentWidth(device: DeviceContextProps, readOnly?: boolean): string | undefined {
    if (!device.isMobile || readOnly) {
        return undefined;
    }

    return '3.25rem';
}

function getInputWidth(device: DeviceContextProps, readOnly?: boolean): string {
    if (readOnly) {
        if (device.isMobile) {
            return 'auto';
        }

        return '100%';
    }

    if (!device.isMobile) {
        return '3rem';
    }

    return getMobileValueSegmentWidth(device, readOnly) ?? 'auto';
}

function getInputFlex(readOnly?: boolean): string {
    if (readOnly) {
        return '1 1 auto';
    }

    return '0 0 auto';
}

function getInputHeight(
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

    if (device.isMobile) {
        return '3rem';
    }

    return 'var(--size-2x)';
}

function getStyledInputWidth(
    device: DeviceContextProps,
    readOnly?: boolean,
    inErrorSegment?: boolean,
): string {
    if (inErrorSegment) {
        return '100%';
    }

    return getInputWidth(device, readOnly);
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
    return theme.component['text-input-border-color'];
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
const ErrorValueSegment = styled.div<{ device: DeviceContextProps }>`
    background: ${({ theme }) => theme.component['stepper-button-background-color']};
    border: 1px solid ${({ theme }) => theme.component['text-input-error-border-color']};
    border-radius: var(--border-radius-none, 0);
    box-sizing: border-box;
    display: flex;
    flex: ${() => getInputFlex(false)};
    flex-shrink: 0;
    height: ${({ device }) => (device.isMobile ? '3rem' : 'var(--size-2x)')};
    margin-right: -1px;
    pointer-events: none;
    position: relative;
    width: ${({ device }) => getInputWidth(device, false)};
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
    width: ${({ device }) => getStepperControlWidth(device)};

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
    font-size: ${({ device }) => (device.isMobile ? '1rem' : '0.875rem')};
    height: ${({ device, $inErrorSegment, $readOnly }) => getInputHeight(device, $inErrorSegment, $readOnly)};
    letter-spacing: ${({ device }) => (device.isMobile ? '0.02875rem' : '0.015rem')};
    line-height: 1.5rem;
    margin: 0;
    outline: none;
    padding:
        ${({
            device,
            $readOnly,
        }) => {
            if ($readOnly && device.isMobile) {
                return '0 var(--spacing-1x)';
            }
            return device.isMobile ? '0 var(--spacing-1halfx)' : '0 var(--spacing-1x)';
        }};
    text-align: left;
    width: ${({ device, $readOnly, $inErrorSegment }) => getStyledInputWidth(device, $readOnly, $inErrorSegment)};
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

    ${({ $readOnly, theme }) => !$readOnly && focus({ theme })};
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

function getNumericStep(step: InputHTMLAttributes<HTMLInputElement>['step']): number {
    if (step === undefined || step === 'any') {
        return 1;
    }

    const parsed = typeof step === 'number' ? step : Number(step);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function getValueAfterStep(
    current: Value,
    direction: 'up' | 'down',
    min: number | undefined,
    max: number | undefined,
    step: InputHTMLAttributes<HTMLInputElement>['step'],
): Value {
    const delta = getNumericStep(step);
    let base: number;

    if (current === null || current === undefined || Number.isNaN(Number(current))) {
        base = min ?? 0;
    } else {
        base = current;
    }

    let next = direction === 'up' ? base + delta : base - delta;

    if (min !== undefined) {
        next = Math.max(next, min);
    }
    if (max !== undefined) {
        next = Math.min(next, max);
    }

    if (current !== null && current !== undefined && next === current) {
        return current;
    }

    return next;
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
    const currentValueRef = useRef<Value>(defaultValue ?? null);
    const [validity, setValidity] = useState(valid ?? true);
    const [internalValue, setInternalValue] = useState<Value>(defaultValue ?? null);

    const currentValue = value !== undefined ? value : internalValue;
    currentValueRef.current = currentValue;
    const showButtons = !readOnly;
    const isDecrementDisabled = disabled || isAtMin(currentValue, min);
    const isIncrementDisabled = disabled || isAtMax(currentValue, max);

    const applySingleStep = useCallback((direction: 'up' | 'down'): void => {
        const steppingControlledValue = value !== undefined;
        let valueForStep: Value;
        if (steppingControlledValue) {
            valueForStep = currentValueRef.current;
        } else if (inputRef.current?.value === '') {
            valueForStep = null;
        } else {
            valueForStep = Number(inputRef.current?.value);
        }

        if (direction === 'up' && isAtMax(valueForStep, max)) {
            return;
        }
        if (direction === 'down' && isAtMin(valueForStep, min)) {
            return;
        }

        if (steppingControlledValue) {
            const nextValue = getValueAfterStep(valueForStep, direction, min, max, step);
            if (nextValue !== valueForStep) {
                onChange?.(nextValue);
            }
            return;
        }

        const valueBefore = Number(inputRef.current?.value);
        if (direction === 'up') {
            inputRef.current?.stepUp();
        } else {
            inputRef.current?.stepDown();
        }
        const valueAfter = Number(inputRef.current?.value);
        if (valueBefore !== valueAfter) {
            triggerChangeEventOnRef(inputRef);
        }
    }, [max, min, onChange, step, value]);

    const handleStep = useCallback((
        direction: 'up' | 'down',
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    ): void => {
        if ('button' in event && event.button !== 0) return;
        if (direction === 'up' && isIncrementDisabled) return;
        if (direction === 'down' && isDecrementDisabled) return;

        applySingleStep(direction);

        if ('type' in event && event.type === 'mousedown') {
            timeoutId.current = setTimeout(() => {
                intervalId.current = setInterval(() => applySingleStep(direction), 50);
            }, 500);
        }
    }, [applySingleStep, isDecrementDisabled, isIncrementDisabled]);

    const handleIncrement = useCallback((
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    ): void => {
        handleStep('up', event);
    }, [handleStep]);

    const handleDecrement = useCallback((
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    ): void => {
        handleStep('down', event);
    }, [handleStep]);

    const handleStop = useCallback((): void => {
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
                            onPress={handleDecrement}
                            onStop={handleStop}
                        />
                    )}
                    {showErrorValueSegment ? (
                        <ErrorValueSegment device={device}>
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
                            onPress={handleIncrement}
                            onStop={handleStop}
                        />
                    )}
                </Wrapper>
            )}
        </StepperFieldContainer>
    );
};

StepperInput.displayName = 'StepperInput';
