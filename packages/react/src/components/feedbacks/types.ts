import { NativeSpanProps } from '../../types/native-props';
import { FieldContainerProps } from '../field-container/types';

type PartialNativeSpanProps = Omit<NativeSpanProps, 'ref'>;

type CommonFieldContainerProps = Pick<FieldContainerProps, 'noInvalidFieldIcon'>;

export interface InvalidFieldMessageProps extends PartialNativeSpanProps, CommonFieldContainerProps {}
