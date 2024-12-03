import { NativeLabelProps } from '../../types/native-props';
import { FieldContainerProps } from '../field-container/types';

type PartialNativeLabelProps = Omit<NativeLabelProps, 'ref'>;

type CommonFieldContainerProps = Pick<FieldContainerProps, 'required' | 'tooltip'>;

export interface LabelProps extends PartialNativeLabelProps, CommonFieldContainerProps {
    forId?: string;
    requiredLabelType?: 'text';
}

export interface RequiredLabelProps {
    type?: LabelProps['requiredLabelType'];
}
