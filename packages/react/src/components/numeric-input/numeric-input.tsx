/* eslint-disable no-console */
import {
    ChangeEvent,
    FocusEvent,
    HTMLProps,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    VoidFunctionComponent,
} from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { useId } from '../../hooks/use-id';
import { focus } from '../../utils/css-state';
import { Theme } from '../../themes';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { inputsStyle } from '../text-input/styles/inputs';
import { TooltipProps } from '../tooltip/tooltip';

function cleanupValueToDisplay(inputValue: string): string {
    const value = inputValue.trim();

    if (value === '' || value === '-' || value === '.') {
        return '';
    }

    // Add missing integral zero (.25 => 0.25)
    return value.replace(/^(-?)\./, '$10.');
}

interface StyledInputProps {
    device: DeviceContextProps;
    theme: Theme;
    $textAlign: 'left' | 'right';
}

const StyledInput = styled.input<StyledInputProps>`
    ${({ theme, device }) => inputsStyle(theme, device.isMobile)}

    border: 0;
    flex: 1 1 auto;
    text-align: ${({ $textAlign }) => $textAlign};

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none; /* stylelint-disable-line property-no-vendor-prefix */
        margin: 0;
    }

    &[type='number'] {
        -moz-appearance: textfield; /* stylelint-disable-line property-no-vendor-prefix */
    }

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
    background: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-radius: var(--border-radius);
    display: flex;

    ${({ $invalid, theme }) => $invalid && css`
        border-color: ${theme.notifications['alert-2.1']};
    `};

    ${({ $disabled, theme }) => $disabled && css`
        background-color: ${theme.greys['light-grey']};
        border-color: ${theme.greys.grey};

        ${Adornment} {
            color: ${theme.greys['mid-grey']};
        }
    `};

    &:focus-within {
        ${({ theme }) => focus({ theme }, true, '&')};
        border-radius: var(--border-radius);
    }
`;

type NativeInputProps = Pick<HTMLProps<HTMLInputElement>, 'disabled' | 'onFocus' | 'onBlur'>;

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
    onChange?(event: ChangeEvent<HTMLInputElement>, valueAsNumber: number | null): void;
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
    precision,
    required,
    textAlign = 'left',
    tooltip,
    invalid,
    validationErrorMessage,
    value,
}) => {
    const { t } = useTranslation('numeric-input');
    const inputRef = useRef<HTMLInputElement>(null);
    const device = useDeviceContext();
    const fieldId = useId(id);
    const [stateValue, setStateValue] = useState(value?.toString() ?? defaultValue?.toString() ?? '');
    const [stateErrorMessage, setStateErrorMessage] = useState<string>('');

    const validate = useCallback((inputValue: string): void => {
        let error: string = '';

        if (required && inputValue === '') {
            error = t('requiredValidationErrorMessage');
        } else if (inputValue !== '') {
            if (max !== undefined && Number(inputValue) > max) {
                error = t('maxValidationErrorMessage', { max });
            } else if (min !== undefined && Number(inputValue) < min) {
                error = t('minValidationErrorMessage', { min });
            }
        }

        setStateErrorMessage(error);
    }, [t, max, min, required]);

    const isValidInputtingChars = useCallback((inputValue: string): boolean => {
        if (precision === 0 && inputValue.includes('.')) {
            return false;
        }
        if (precision && precision > 0 && inputValue.split('.')[1]?.length > precision) {
            return false;
        }
        if (!/^-?\d*\.?\d*$/.test(inputValue)) {
            return false;
        }

        return true;
    }, [precision]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        let inputValue = event.target.value.trim();

        // In case of a copy-paste, automatically truncate the precision if it exceeds the limit
        if (precision !== undefined && inputValue.includes('.')) {
            const atDot = inputValue.indexOf('.');
            inputValue = inputValue.slice(0, precision === 0 ? atDot : atDot + precision + 1);
        }

        if (inputValue === '') {
            setStateValue('');
            onChange?.(event, null);
        } else if (isValidInputtingChars(inputValue)) {
            setStateValue(inputValue);
            onChange?.(event, Number(inputValue));
        }
    }, [onChange, isValidInputtingChars, precision]);

    const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>): void => {
        const inputValue = cleanupValueToDisplay(event.target.value);
        setStateValue(inputValue);

        validate(inputValue);
        onBlur?.(event);
    }, [onBlur, validate]);

    useEffect(() => {
        if (value !== undefined) {
            setStateValue(value.toString());
        }
    }, [value]);

    const adornmentContent = useMemo(() => (
        adornment ? <Adornment $position={adornmentPosition}>{adornment}</Adornment> : null
    ), [adornment, adornmentPosition]);

    const isInvalid = invalid ?? (validationErrorMessage !== undefined || stateErrorMessage !== '');
    const errorMessage = validationErrorMessage ?? stateErrorMessage;

    return (
        <FieldContainer
            className={className}
            fieldId={fieldId}
            hint={hint}
            label={label}
            tooltip={tooltip}
            noMargin={noMargin}
            valid={!isInvalid}
            noInvalidFieldIcon={!errorMessage}
            validationErrorMessage={errorMessage}
        >
            <Wrapper $disabled={disabled} $invalid={isInvalid}>
                {(adornment && adornmentPosition === 'start') && adornmentContent}
                <StyledInput
                    $textAlign={textAlign}
                    data-testid="numeric-input"
                    device={device}
                    disabled={disabled}
                    id={fieldId}
                    inputMode="numeric"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={onFocus}
                    ref={inputRef}
                    type="text"
                    value={stateValue}
                />
                {(adornment && adornmentPosition === 'end') && adornmentContent}
            </Wrapper>
        </FieldContainer>
    );
};
