import { NativeSpanProps } from '../../types/native-props';
import { FieldContainerProps } from '../field-container/types';

type CommonFieldContainerProps = Pick<FieldContainerProps, 'noInvalidFieldIcon'>;

export interface InvalidFieldMessageProps extends NativeSpanProps, CommonFieldContainerProps {}
