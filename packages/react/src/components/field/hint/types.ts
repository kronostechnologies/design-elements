import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type BaseSpanProps = Pick<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
    | 'id' | 'className'
>;

export interface HintProps extends BaseSpanProps {}
