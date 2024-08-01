import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';
import { FieldContainerProps } from '../types';

export type BaseLabelProps = Pick<DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
    | 'id' | 'className' | 'htmlFor'
>;

type CommonFieldContainerProps = Pick<FieldContainerProps, 'required' | 'tooltip'>;

export interface LabelProps extends BaseLabelProps, CommonFieldContainerProps {
    requiredLabelType?: 'text';
}

export interface RequiredLabelProps {
    type?: LabelProps['requiredLabelType'];
}
