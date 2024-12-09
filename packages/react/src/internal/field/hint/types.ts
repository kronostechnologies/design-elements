import { NativeHTMLProps } from '../../../types/native-props';

type PartialNativeHTMLProps = Omit<NativeHTMLProps, 'ref'>

export interface HintProps extends PartialNativeHTMLProps {}
