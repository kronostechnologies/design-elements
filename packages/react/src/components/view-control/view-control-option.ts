import type { IconName } from '../icon';

export interface ViewControlOption {
    disabled?: boolean;
    iconName?: IconName;
    label: string;
    value: string;
}
