import { forwardRef, ReactElement, Ref } from 'react';
import { useId } from '../../hooks/use-id';
import { useDeviceContext } from '../../components/device-context-provider/device-context-provider';
import { useFieldControl } from '../field/context';
import { StyledInput } from './styled';
import { InputProps } from './types';
import { useDataAttributes } from '../../hooks/use-data-attributes';

export const Input = forwardRef(({
    id: providedId,
    valid: providedValid = true,
    required: providedRequired = false,
    disabled: providedDisabled = false,
    ...otherProps
}: InputProps, ref: Ref<HTMLInputElement>): ReactElement => {
    const dataAttributes = useDataAttributes(otherProps);
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
    } = useFieldControl(otherProps);

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
            {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            {...otherProps /* eslint-disable-line react/jsx-props-no-spreading */}
        />
    );
});

Input.displayName = 'Input';
