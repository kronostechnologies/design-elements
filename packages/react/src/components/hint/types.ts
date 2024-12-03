import { NativeSpanProps } from '../../types/native-props';

type PartialNativeSpanProps = Omit<NativeSpanProps, 'ref'>

export interface HintProps extends PartialNativeSpanProps {}
