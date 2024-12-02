import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FieldContainerProps } from '../field-container/types';

export type BaseSpanProps = Pick<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
    | 'id' | 'className'
>;

type CommonFieldContainerProps = Pick<FieldContainerProps, 'noInvalidFieldIcon'>;

export interface InvalidFieldMessageProps extends BaseSpanProps, CommonFieldContainerProps {}
