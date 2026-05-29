import type { MaskitoDateMode } from '@maskito/kit';
import type { Replace } from '../../../utils/types';

type DateMaskModeFromMaskito = Extract<MaskitoDateMode, 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy/mm/dd'>;
export type DateMaskFormat =
    | DateMaskModeFromMaskito
    | Replace<DateMaskModeFromMaskito, '/', '-'>
    | Replace<DateMaskModeFromMaskito, '/', '.'>;
