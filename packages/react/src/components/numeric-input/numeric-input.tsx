import {
    ChangeEvent,
    HTMLProps,
    ReactNode,
    useCallback,
    useMemo,
    useRef,
    VoidFunctionComponent,
} from 'react';
import styled, { css } from 'styled-components';
import { useId } from '../../hooks/use-id';
import { focus } from '../../utils/css-state';
import { Theme } from '../../themes';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { inputsStyle } from '../text-input/styles/inputs';
import { TooltipProps } from '../tooltip/tooltip';

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
    background: ${({ theme }) => theme.ref['color-white']};
    border: 1px solid ${({ theme }) => theme.ref['color-neutral-65']};
    border-radius: var(--border-radius);
    display: flex;

    ${({ $invalid, theme }) => $invalid && css`
        border-color: ${theme.ref['color-alert-50']};
    `};

    ${({ $disabled, theme }) => $disabled && css`
        background-color: ${theme.ref['color-neutral-05']};
        border-color: ${theme.ref['color-neutral-15']};

        ${Adornment} {
            color: ${theme.ref['color-neutral-30']};
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
    step?: number;
    noMargin?: boolean;
    noInvalidFieldIcon?: boolean;
    textAlign?: 'left' | 'right';
    tooltip?: TooltipProps;
    valid?: boolean;
    validationErrorMessage?: string;
    value?: number | string;
    onChange?(value: number | null): void;
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
    noInvalidFieldIcon,
    noMargin,
    step,
    textAlign = 'left',
    tooltip,
    valid = true,
    validationErrorMessage,
    value,
    onBlur,
    onChange,
    onFocus,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const device = useDeviceContext();
    const fieldId = useId(id);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const inputValue = event.target.value;
        if (inputValue === '') {
            onChange?.(null);
        } else {
            const currentValue = Number(inputValue);
            onChange?.(currentValue);
        }
    }, [onChange]);

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
            valid={valid}
            noInvalidFieldIcon={noInvalidFieldIcon}
            validationErrorMessage={validationErrorMessage ?? ''}
        >
            <Wrapper $disabled={disabled} $invalid={!valid}>
                {(adornment && adornmentPosition === 'start') && adornmentContent}
                <StyledInput
                    $textAlign={textAlign}
                    data-testid="numeric-input"
                    defaultValue={defaultValue}
                    device={device}
                    disabled={disabled}
                    id={fieldId}
                    max={max}
                    min={min}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    ref={inputRef}
                    step={step}
                    type="number"
                    value={value}
                />
                {(adornment && adornmentPosition === 'end') && adornmentContent}
            </Wrapper>
        </FieldContainer>
    );
};
