import { NativeDivProps } from '../../types/native-props';
import { TooltipProps } from '../tooltip/tooltip';

export interface FieldSlotIds {
    label?: string;
    hint?: string;
    invalid?: string;
}

export interface FieldControlProps {
    id?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string
    disabled?: boolean;
    required?: boolean;
    valid?: boolean;
    slotIds?: FieldSlotIds;
}

type PartialNativeDivProps = Omit<NativeDivProps, 'id' | 'ref'>;

export interface FieldContainerProps extends
    Omit<FieldControlProps, 'id' | 'slotIds'>,
    PartialNativeDivProps
{
    fieldId?: string;
    noMargin?: boolean;
    label?: string;
    hint?: string;
    validationErrorMessage: string;
    noInvalidFieldIcon?: boolean;
    tooltip?: TooltipProps;
}
