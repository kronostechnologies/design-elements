import { InputFieldProps, InputProps } from './types';
import { FieldContainerProps } from '../field/types';

interface ParsedInputFieldProps {
    inputProps: InputProps;
    fieldControlledProps: FieldContainerProps;
}

export function parseInputFieldProps(
    props: InputFieldProps,
): ParsedInputFieldProps {
    const {
        ariaLabel,
        ariaLabelledby,
        ariaDescribedby,
        valid,
        id,
        disabled,
        required,
        className,
        noMargin,
        label,
        hint,
        validationErrorMessage,
        noInvalidFieldIcon,
        tooltip,
        ...inputProps
    } = props;

    const fieldControlledProps: FieldContainerProps = {
        id,
        ariaLabel,
        ariaLabelledby,
        ariaDescribedby,
        valid,
        className,
        noMargin,
        label,
        hint,
        validationErrorMessage,
        noInvalidFieldIcon,
        tooltip,
        disabled,
        required,
    };

    return { inputProps, fieldControlledProps };
}
