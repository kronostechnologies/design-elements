import { type MaskitoDateMode, maskitoParseDate } from '@maskito/kit';
import { useMemo } from 'react';
import type { Replace } from '../../utils/types';
import {
    type BasicMask,
    createDateMode,
    type DateMask,
    DEFAULT_DATE_SEPARATOR,
    type DefaultDateMaskSeparator,
} from './mask';
import { toUpperCase } from './processors';

export type UseDateMaskOptions<Separator extends string = DefaultDateMaskSeparator> = {
    format: Uppercase<Replace<MaskitoDateMode, '/', Separator>>;
    max?: Date;
    min?: Date;
} & (Separator extends DefaultDateMaskSeparator ? { separator?: Separator } : { separator: Separator });

export interface UseDateMaskResponse<Separator extends string = DefaultDateMaskSeparator> extends DateMask<Separator> {
    parseDate(value: string): Date | null;
}

/**
 * Generates a date mask based on the provided format, maximum and minimum dates, and separator.
 * The hook also returns a `parseDate` function that allows parsing the input string back into a Date object.
 */
export function useDateMask<Separator extends string = DefaultDateMaskSeparator>(
    options: UseDateMaskOptions<Separator>,
): UseDateMaskResponse<Separator> {
    const {
        format = 'YYYY-MM-DD' as UseDateMaskOptions<Separator>['format'],
        max,
        min,
        separator = DEFAULT_DATE_SEPARATOR as Separator,
    } = options;

    const mode = createDateMode({ mask: format, separator });

    return useMemo(() => ({
        dateMask: {
            mask: format,
            max,
            min,
            separator: separator as Separator,
        },
        parseDate: (value: string) => maskitoParseDate(value, { mode, max, min }),
    } satisfies UseDateMaskResponse<Separator>), [format, max, min, mode, separator]);
}

/**
 * A mask for Canadian postal codes in the format "A1A 1A1", where "A" represents a letter and "1" represents a digit.
 * The mask automatically converts input to uppercase.
 */
export function usePostalCodeMask(): BasicMask {
    return useMemo(() => ({
        mask: 'A1A 1A1',
        pattern: [/[A-Z]/, /\d/, /[A-Z]/, ' ', /\d/, /[A-Z]/, /\d/],
        preprocessors: [toUpperCase()],
    } satisfies BasicMask), []);
}
