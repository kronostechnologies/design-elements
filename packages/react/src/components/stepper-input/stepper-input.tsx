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

function getWrapperWidth(device: DeviceContextProps, readOnly?: boolean): string {
    if (readOnly || !device.isMobile) {
        return 'auto';
    }

    return '10rem';
}

function getInputWidth(device: DeviceContextProps, readOnly?: boolean): string {
    if (readOnly || !device.isMobile) {
        return '3rem';
    }

    return 'auto';
}

function getInputFlex(device: DeviceContextProps, readOnly?: boolean): string {
    if (readOnly || !device.isMobile) {
        return '0 0 auto';
    }

    return '1 0 0';
}

const Wrapper = styled.div<{ device: DeviceContextProps; $readOnly?: boolean }>`
    display: flex;
    isolation: isolate;
    max-width: fit-content;
    width: ${({ device, $readOnly }) => getWrapperWidth(device, $readOnly)};
`;

const ReadOnlyWrapper = styled.div`
    background-color: ${({ theme }) => theme.component['text-input-readonly-background-color']};
    border-radius: var(--border-radius);
    display: flex;
    max-width: fit-content;
`;

interface StyledInputProps {
    device: DeviceContextProps;
    theme: ResolvedTheme;
    $readOnly?: boolean;
    $valid?: boolean;
}

const inputSegmentStyles = css<StyledInputProps>`
    background-color: ${({ theme, $readOnly }) => (
        $readOnly
            ? theme.component['text-input-readonly-background-color']
            : theme.component['text-input-background-color']
    )};
    border-color: ${({ theme, $valid, $readOnly }) => {
        if ($readOnly) {
            return theme.component['text-input-readonly-border-color'];
        }
        return $valid
            ? theme.component['text-input-border-color']
            : theme.component['text-input-error-border-color'];
    }};
    box-sizing: border-box;
    color: ${({ theme, $readOnly }) => (
        $readOnly
            ? theme.component['text-input-readonly-text-color']
            : theme.component['text-input-text-color']
    )};
    font-family: inherit;
    font-size: ${({ device }) => (device.isMobile ? '1rem' : '0.875rem')};
    height: ${({ device }) => (device.isMobile ? '3rem' : 'var(--size-2x)')};
    letter-spacing: ${({ device }) => (device.isMobile ? '0.02875rem' : '0.015rem')};
    line-height: 1.5rem;
    margin: 0;
    outline: none;
    padding: ${({ device }) => (device.isMobile ? '0 var(--spacing-1x)' : '0 var(--spacing-1x)')};
    text-align: center;
    width: ${({ device, $readOnly }) => getInputWidth(device, $readOnly)};
    z-index: 2;

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
        border-color: ${({ theme }) => theme.component['text-input-disabled-border-color']};
        color: ${({ theme }) => theme.component['text-input-disabled-text-color']};
    }

    &:read-only {
        background-color: ${({ theme }) => theme.component['text-input-readonly-background-color']};
        border-color: ${({ theme }) => theme.component['text-input-readonly-border-color']};
        color: ${({ theme }) => theme.component['text-input-readonly-text-color']};
    }
`;

const StyledInput = styled.input<StyledInputProps>`
    ${inputSegmentStyles};

    border-style: solid;
    border-width: 1px;
    flex: ${({ device, $readOnly }) => getInputFlex(device, $readOnly)};

    ${({ $readOnly }) => !$readOnly && css`
        border-left: none;
        border-radius: 0;
        border-right: none;
    `};

    ${({ $readOnly }) => $readOnly && css`
        border-radius: var(--border-radius);
    `};

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
    const [validity, setValidity] = useState(valid ?? true);
    const [internalValue, setInternalValue] = useState<Value>(defaultValue ?? null);

    const currentValue = value !== undefined ? value : internalValue;
    const showButtons = !readOnly;
    const isDecrementDisabled = disabled || isAtMin(currentValue, min);
    const isIncrementDisabled = disabled || isAtMax(currentValue, max);

    const stepValue = useCallback((direction: 'up' | 'down'): void => {
        if (direction === 'up') {
            inputRef.current?.stepUp();
        } else {
            inputRef.current?.stepDown();
        }
        triggerChangeEventOnRef(inputRef);
    }, []);

    const handleStep = useCallback((
        direction: 'up' | 'down',
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    ): void => {
        if ('button' in event && event.button !== 0) return;
        if (direction === 'up' && isIncrementDisabled) return;
        if (direction === 'down' && isDecrementDisabled) return;

        const valueBefore = Number(inputRef.current?.value);
        stepValue(direction);

        if ('type' in event && event.type === 'mousedown') {
            timeoutId.current = setTimeout(() => {
                intervalId.current = setInterval(() => stepValue(direction), 50);
            }, 500);
        }

        const valueAfter = Number(inputRef.current?.value);
        if (valueBefore !== valueAfter) {
            const nextValue = inputRef.current?.value === '' ? null : Number(inputRef.current?.value);
            if (value === undefined) {
                setInternalValue(nextValue);
            }
        }
    }, [isDecrementDisabled, isIncrementDisabled, stepValue, value]);

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

    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }, []);

    useEffect(() => {
        if (valid !== undefined) {
            setValidity(valid);
        }
    }, [valid]);

    useEffect(() => () => handleStop(), [handleStop]);

    const inputElement = (
        <StyledInput
            $readOnly={readOnly}
            $valid={validity}
            aria-invalid={!validity}
            data-testid="stepper-input"
            defaultValue={defaultValue}
            device={device}
            disabled={disabled}
            id={fieldId}
            max={max}
            min={min}
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
            onKeyDown={handleKeyDown}
        />
    );

    return (
        <FieldContainer
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
                <ReadOnlyWrapper data-testid="stepper-input-readonly">
                    {inputElement}
                </ReadOnlyWrapper>
            ) : (
                <Wrapper device={device} role="group" aria-labelledby={label ? `${fieldId}_label` : undefined}>
                    {showButtons && (
                        <StepperButton
                            disabled={isDecrementDisabled}
                            type="decrement"
                            onPress={handleDecrement}
                            onStop={handleStop}
                        />
                    )}
                    {inputElement}
                    {showButtons && (
                        <StepperButton
                            disabled={isIncrementDisabled}
                            type="increment"
                            onPress={handleIncrement}
                            onStop={handleStop}
                        />
                    )}
                </Wrapper>
            )}
        </FieldContainer>
    );
};

StepperInput.displayName = 'StepperInput';
