import { forwardRef, ReactElement, Ref } from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { useFieldControlContext } from '../field/context';
import { focus } from '../../utils/css-state';
import { InputProps } from './types';

const StyledInput = styled.input<{ $isMobile: boolean }>`
    background: ${({ theme }) => theme.component['text-input-background-color']};
    border: 1px solid;
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${({ theme }) => theme.component['text-input-text-color']};
    font-family: inherit;
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};
    letter-spacing: ${({ $isMobile }) => ($isMobile ? '0.02875rem' : '0.015rem')};
    line-height: 1.5rem;
    margin: 0;
    min-height: var(--size-2x);
    outline: none;
    padding: 0 var(--spacing-1x);
    width: 100%;

    &::placeholder {
        color: ${({ theme }) => theme.component['text-input-placeholder-text-color']};
    }

    &:valid,
    &[aria-invalid='false'] {
        border-color: ${({ theme }) => theme.component['text-input-border-color']};
    }

    &:invalid,
    &[aria-invalid='true'] {
        border-color: ${({ theme }) => theme.component['text-input-error-border-color']};
    }

    &:disabled,
    &[aria-disabled='true'] {
        background-color: ${({ theme }) => theme.component['text-input-disabled-background-color']};
        border-color: ${({ theme }) => theme.component['text-input-disabled-border-color']};
        color: ${({ theme }) => theme.component['text-input-disabled-text-color']};

        &,
        &::placeholder {
            color: ${({ theme }) => theme.component['text-input-placeholder-disabled-text-color']};
        }
    }

    ${({ theme }) => focus({ theme })};
`;

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
        id = inputId,
        valid = providedValid,
        required = providedRequired,
        disabled = providedDisabled,
        ariaLabel,
        ariaLabelledby,
        ariaDescribedby,
    } = useFieldControlContext(otherProps);

    return (
        <StyledInput
            aria-label={ariaLabel}
            aria-labelledby={ariaLabel ? undefined : ariaLabelledby}
            aria-describedby={ariaDescribedby}
            aria-disabled={disabled}
            aria-invalid={valid ? 'false' : 'true'}
            data-testid="input"
            id={id}
            disabled={disabled}
            required={required}
            $isMobile={isMobile}
            ref={ref}
            {...otherProps /* eslint-disable-line react/jsx-props-no-spreading */}
        />
    );
});

Input.displayName = 'Input';
