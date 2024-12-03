import { NativeLabelProps } from '../../types/native-props';
import { FieldContainerProps } from '../field-container/types';

type CommonFieldContainerProps = Pick<FieldContainerProps, 'required' | 'tooltip'>;

export interface LabelProps extends NativeLabelProps, CommonFieldContainerProps {
    forId: string;
    requiredLabelType?: 'text';
}

export interface RequiredLabelProps {
    type?: LabelProps['requiredLabelType'];
}
