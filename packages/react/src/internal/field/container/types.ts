import { NativeAriaProps, NativeDOMProps, NativeHTMLProps } from '../../../types/native-props';
import { LabelProps } from '../../label/types';
import { FieldControlProps } from '../context';
import { ValidationMessageProps } from '../validation-message/types';

type PartialDOMProps = Omit<NativeDOMProps, 'id' | 'ref'>;

type PartialAriaProps = Omit<NativeAriaProps, 'id' | 'ref'>;

type PartialHTMLAttributes = Omit<NativeHTMLProps, 'id' | 'ref'>;

type PartialLabelProps = Pick<LabelProps, 'tooltip'>;

type PartialValidationMessageProps = Pick<ValidationMessageProps, 'noInvalidFieldIcon'>;

export interface FieldContainerProps extends
    Omit<FieldControlProps, 'id' | 'slotIds'>,
    PartialDOMProps,
    PartialAriaProps,
    PartialHTMLAttributes,
    PartialLabelProps,
    PartialValidationMessageProps
{
    fieldId?: string;
    noMargin?: boolean;
    label?: string;
    hint?: string;
    validationErrorMessage: string;
}
