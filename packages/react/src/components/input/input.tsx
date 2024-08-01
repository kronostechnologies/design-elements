import { forwardRef, ReactElement, Ref } from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { useFieldControlContext } from '../field/context';
import { inputsStyle } from '../text-input/styles/inputs';
import { InputProps } from './types';

const StyledInput = styled.input<{ isMobile: boolean; }>`
    ${({ theme, isMobile }) => inputsStyle({ theme, isMobile })}
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
            aria-required={required}
            aria-invalid={valid}
            data-testid="input"
            id={id}
            disabled={disabled}
            required={required}
            isMobile={isMobile}
            ref={ref}
            {...otherProps /* eslint-disable-line react/jsx-props-no-spreading */}
        />
    );
});

Input.displayName = 'Input';
