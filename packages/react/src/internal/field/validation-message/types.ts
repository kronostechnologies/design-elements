import { NativeHTMLProps } from '../../../types/native-props';

type PartialNativeDivProps = Omit<NativeHTMLProps, 'ref'>;

export interface ValidationMessageProps extends PartialNativeDivProps {
    noInvalidFieldIcon?: boolean;
}
