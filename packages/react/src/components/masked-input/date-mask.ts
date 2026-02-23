import type { MaskitoDateMode } from '@maskito/kit';
import type { Replace } from '../../utils/types';

export interface DateMask<Separator extends string = '-'> {
    mask: Replace<MaskitoDateMode, '/', Separator>;
    separator?: Separator;
    max?: Date;
    min?: Date;
    type: 'date';
}

export function createDateMask<Separator extends string = '-'>(
    options: Omit<DateMask<Separator>, 'type'>,
): DateMask<Separator> {
    return {
        ...options,
        separator: options.separator || '-' as Separator,
        type: 'date',
    };
}
