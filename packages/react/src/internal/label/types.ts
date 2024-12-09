import { TooltipProps } from '../../components/tooltip/tooltip';
import { NativeLabelProps } from '../../types/native-props';

type PartialNativeLabelProps = Omit<NativeLabelProps, 'ref'>;

export interface LabelProps extends PartialNativeLabelProps {
    forId?: string;
    tooltip?: TooltipProps;
}
