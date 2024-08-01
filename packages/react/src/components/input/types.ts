import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';
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

export interface AdornmentProps {
    leftAdornment?: ReactNode;
    rightAdornment?: ReactNode;
}

export type InputProps = BaseInputProps & AdornmentProps & CommonFieldControlProps;

export type InputFieldProps = InputProps & FieldContainerProps;
