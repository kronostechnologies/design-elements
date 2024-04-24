import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, ReactElement, Ref } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { useId } from '../../../hooks/use-id';
import { ResolvedTheme } from '../../../themes/theme';
import { focus } from '../../../utils/css-state';
import { DeviceContextProps, useDeviceContext } from '../../device-context-provider/device-context-provider';
import { FormFieldControlProps, useFormFieldContext } from '../../form/form-field-context';

export const inputsStyle: (theme: ResolvedTheme, isMobile?: boolean) => FlattenSimpleInterpolation = (
    theme: ResolvedTheme,
    isMobile = false,
) => css`
    background: ${theme.component['text-input-background-color']};
    border: 1px solid ${theme.component['text-input-border-color']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${theme.component['text-input-text-color']};
    font-family: inherit;
    font-size: ${isMobile ? '1rem' : '0.875rem'};
    letter-spacing: ${isMobile ? '0.02875rem' : '0.015rem'};
    line-height: 1.5rem;
    margin: 0;
    min-height: var(--size-2x);
    outline: none;
    padding: 0 var(--spacing-1x);
    width: 100%;

    ${focus({ theme }, true)};

    &::placeholder {
        color: ${theme.component['text-input-placeholder-text-color']};
    }

    &:disabled {
        background-color: ${theme.component['text-input-disabled-background-color']};
        border-color: ${theme.component['text-input-disabled-border-color']};
        color: ${theme.component['text-input-disabled-text-color']};

        &,
        &::placeholder {
            color: ${theme.component['text-input-placeholder-disabled-text-color']};
        }
    }
`;

interface ResponsiveInputsStyles {
    theme: ResolvedTheme;
    device: DeviceContextProps;
}

export const responsiveInputsStyle = ({ theme, device: { isMobile } }: ResponsiveInputsStyles): FlattenSimpleInterpolation => css`
    background: ${theme.component['text-input-background-color']};
    border: 1px solid ${theme.component['text-input-border-color']};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${theme.component['text-input-text-color']};
    font-family: inherit;
    font-size: ${isMobile ? 1 : 0.875}rem;
    letter-spacing: ${isMobile ? 0.02875 : 0.015}rem;
    line-height: 1.5rem;
    margin: 0;
    outline: none;
    padding: ${isMobile ? 'var(--spacing-1x)' : 'var(--spacing-half) var(--spacing-1x)'};
    width: 100%;

    &::placeholder {
        color: ${theme.component['text-input-placeholder-text-color']};
    }

    &:disabled {
        background-color: ${theme.component['text-input-disabled-background-color']};
        border-color: ${theme.component['text-input-disabled-border-color']};
        color: ${theme.component['text-input-disabled-text-color']};

        &,
        &::placeholder {
            color: ${theme.component['text-input-placeholder-disabled-text-color']};
        }
    }

    ${focus({ theme }, true)}
`;

const StyledInput = styled.input<{ isMobile: boolean; }>`
    ${({ theme, isMobile }) => inputsStyle(theme, isMobile)}
`;

type PartialInputProps = Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    | 'id'
    | 'className'
    | 'type'
    | 'name'
    | 'value'
    | 'defaultValue'
    | 'placeholder'
    | 'disabled'
    | 'required'
    | 'pattern'
    | 'onBlur'
    | 'onChange'
    | 'onClick'
    | 'onFocus'
    | 'onKeyUp'
    | 'onKeyDown'
    | 'onMouseUp'
    | 'onInvalid'
    | 'inputMode'
    | 'autoComplete'
>;

type PartialFormFieldProps = Pick<FormFieldControlProps,
    | 'ariaLabel'
    | 'ariaLabelledby'
    | 'ariaDescribedby'
    | 'valid'
>;

export type InputProps = PartialInputProps & PartialFormFieldProps;

export const Input = forwardRef(({
    id: providedId,
    valid: providedValid = true,
    required: providedRequired = false,
    disabled: providedDisabled = false,
    ...otherProps
}: InputProps, ref: Ref<HTMLInputElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const inputId = useId(providedId);

    const {
        formId,
        ariaLabel,
        ariaLabelledby,
        ariaDescribedby,
        valid = providedValid,
        required = providedRequired,
        disabled = providedDisabled,
    } = useFormFieldContext(otherProps);

    return (
        <StyledInput
            aria-label={ariaLabel}
            aria-labelledby={ariaLabel ? undefined : ariaLabelledby}
            aria-describedby={ariaDescribedby}
            aria-disabled={disabled ? 'true' : 'false'}
            aria-required={required ? 'true' : 'false'}
            aria-invalid={valid ? 'false' : 'true'}
            data-testid="input"
            id={formId || inputId}
            disabled={disabled}
            required={required}
            isMobile={isMobile}
            ref={ref}
            {...otherProps /* eslint-disable-line react/jsx-props-no-spreading */}
        />
    );
});

Input.displayName = 'Input';
