import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldContainerProps, FieldControlProps } from '../field/types';

type BaseInputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    | 'ref'
    | 'aria-describedby'
    | 'aria-label'
    | 'aria-labelledby'
>;

type CommonFieldControlProps = Pick<FieldControlProps,
    | 'ariaLabel'
    | 'ariaLabelledby'
    | 'ariaDescribedby'
    | 'valid'
>;

export type InputProps = BaseInputProps & CommonFieldControlProps;

export type InputFieldProps = InputProps & FieldContainerProps;
