import { BaseLabelProps } from '../label/types';
import { FieldContainerProps } from '../types';

type CommonFieldContainerProps = Pick<FieldContainerProps, 'noInvalidFieldIcon'>;

export interface InvalidFieldMessageProps extends BaseLabelProps, CommonFieldContainerProps {}
