import { TooltipProps } from '../tooltip/tooltip';

export interface FieldControlProps {
    id?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string
    disabled?: boolean;
    required?: boolean;
    valid?: boolean;
}

export interface FieldContainerProps extends FieldControlProps {
    fieldId?: string;
    className?: string;
    noMargin?: boolean;
    label?: string;
    hint?: string;
    validationErrorMessage: string;
    noInvalidFieldIcon?: boolean;
    tooltip?: TooltipProps;
}
