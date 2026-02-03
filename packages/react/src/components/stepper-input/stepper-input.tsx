import React, {
    type ChangeEvent,
    type DetailedHTMLProps,
    type FC,
    type FocusEvent,
    type FormEventHandler,
    type InputHTMLAttributes,
    type RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container';
import { responsiveInputsStyle } from '../text-input/styles';
import { ToggletipProps } from '../toggletip';
import { TooltipProps } from '../tooltip';
import { StepperButtons } from './stepper-buttons';

const Wrapper = styled.div`
    display: flex;
    max-width: fit-content;
`;

interface StyledInputProps {
    device: DeviceContextProps;
    theme: ResolvedTheme;
}

const StyledInput = styled.input<StyledInputProps>`
    ${responsiveInputsStyle}

    border-radius: ${({ device }) => (device.isMobile ? 'var(--border-radius)' : 'var(--border-radius) 0 0 var(--border-radius)')};
    height: ${({ device }) => (device.isMobile ? 2.5 : 2)}rem;
    width: ${({ device }) => (device.isMobile ? 10.25 : 3.5)}rem;
    z-index: 1;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none; /* stylelint-disable-line property-no-vendor-prefix */
        margin: 0;
    }

    &[type='number'] {
        -moz-appearance: textfield; /* stylelint-disable-line property-no-vendor-prefix */
    }
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
    tooltip?: TooltipProps;
    toggletip?: ToggletipProps;
    valid?: boolean;
    validationErrorMessage?: string;
    value?: Value;
    required?: boolean;

    onChange?(value: Value): void
}

function triggerChangeEventOnRef(ref: RefObject<HTMLInputElement>): void {
    // Rationale for using dispatchEvent: https://github.com/kronostechnologies/design-elements/pull/180#discussion_r556050899
    ref.current?.dispatchEvent(new Event('change', { bubbles: true }));
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
    step,
    tooltip,
    toggletip,
    required,
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

    function handleIncrement(event: React.MouseEvent<HTMLButtonElement>): void {
        if (event.button !== 0) return;
        const valueBefore = Number(inputRef.current?.value);
        inputRef.current?.stepUp();
        timeoutId.current = setTimeout(() => {
            intervalId.current = setInterval(() => inputRef.current?.stepUp(), 50);
        }, 500);
        const valueAfter = Number(inputRef.current?.value);

        if (valueBefore !== valueAfter) {
            triggerChangeEventOnRef(inputRef);
        }
    }

    function handleDecrement(event: React.MouseEvent<HTMLButtonElement>): void {
        if (event.button !== 0) return;
        const valueBefore = Number(inputRef.current?.value);
        inputRef.current?.stepDown();
        timeoutId.current = setTimeout(() => {
            intervalId.current = setInterval(() => inputRef.current?.stepDown(), 50);
        }, 500);
        const valueAfter = Number(inputRef.current?.value);

        if (valueBefore !== valueAfter) {
            triggerChangeEventOnRef(inputRef);
        }
    }

    function handleStop(): void {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = undefined;
        }
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = undefined;
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value;
        if (inputValue === '') {
            onChange?.(null);
        } else {
            const currentValue = Number(inputValue);
            onChange?.(currentValue);
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

    return (
        <FieldContainer
            fieldId={fieldId}
            hint={hint}
            label={label}
            tooltip={tooltip}
            toggletip={toggletip}
            noMargin={noMargin}
            required={required}
            valid={validity}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
        >
            <Wrapper>
                <StyledInput
                    aria-invalid={!validity}
                    data-testid="stepper-input"
                    defaultValue={defaultValue}
                    device={device}
                    disabled={disabled}
                    id={fieldId}
                    max={max}
                    min={min}
                    name="points"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={onFocus}
                    onInvalid={handleOnInvalid}
                    ref={inputRef}
                    required={required}
                    step={step}
                    type="number"
                    value={value === null ? '' : value}
                />
                {!device.isMobile && (
                    <StepperButtons
                        disabled={disabled}
                        onDecrement={handleDecrement}
                        onIncrement={handleIncrement}
                        onStop={handleStop}
                    />
                )}
            </Wrapper>
        </FieldContainer>
    );
};

StepperInput.displayName = 'StepperInput';
