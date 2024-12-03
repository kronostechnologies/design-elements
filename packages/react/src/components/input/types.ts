import { NativeInputProps } from '../../types/native-props';
import { FieldControlProps } from '../field-container/types';

type PartialNativeInputProps = Omit<NativeInputProps,
    | 'ref'
>;

type CommonFieldControlProps = Pick<FieldControlProps,
    | 'ariaLabel'
    | 'ariaLabelledby'
    | 'ariaDescribedby'
    | 'valid'
>;

export type InputProps = PartialNativeInputProps & CommonFieldControlProps;
