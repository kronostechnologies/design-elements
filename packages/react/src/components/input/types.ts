import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldControlProps } from '../field-container/types';

type BaseInputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    | 'ref'
>;

type CommonFieldControlProps = Pick<FieldControlProps,
    | 'ariaLabel'
    | 'ariaLabelledby'
    | 'ariaDescribedby'
    | 'valid'
>;

export type InputProps = BaseInputProps & CommonFieldControlProps;
