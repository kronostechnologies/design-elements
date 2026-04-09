import { type MaskitoDateMode, maskitoParseDate } from '@maskito/kit';
import { useMemo } from 'react';
import { useTranslation } from '../../../i18n/use-translation';
import type { Replace } from '../../../utils/types';
import { createDateMode, type DateMask, DEFAULT_DATE_SEPARATOR, type DefaultDateMaskSeparator } from '../mask';

export type UseDateMaskOptions<Separator extends string = DefaultDateMaskSeparator> = {
    format?: Uppercase<Replace<MaskitoDateMode, '/', Separator>>
        | Uppercase<Replace<Replace<MaskitoDateMode, 'YYYY', 'AAAA'>, 'DD', 'JJ'>>;
    max?: Date;
    min?: Date;
} & (Separator extends DefaultDateMaskSeparator ? { separator?: Separator } : { separator: Separator });

export interface UseDateMaskResponse<Separator extends string = DefaultDateMaskSeparator> extends DateMask<Separator> {
    parseDate(value: string): Date | null;
}

type DefinedFormat<Separator extends string> = Exclude<UseDateMaskOptions<Separator>['format'], undefined>

function getDefaultFormatForLanguage<Separator extends string>(
    language: string,
): DefinedFormat<Separator> {
    const locale = language.toLocaleLowerCase();
    if (locale.startsWith('fr')) {
        return 'AAAA-MM-JJ' as DefinedFormat<Separator>;
    }

    return 'YYYY-MM-DD' as DefinedFormat<Separator>;
}

/**
 * Generates a date mask based on the provided format, maximum and minimum dates, and separator.
 * The default format is determined by the user's language ('AAAA-MM-JJ' for french, 'YYYY-MM-DD' otherwise).
 * The hook also returns a `parseDate` function that allows parsing the input string back into a Date object.
 */
export function useDateMask<Separator extends string = DefaultDateMaskSeparator>(
    options: UseDateMaskOptions<Separator>,
): UseDateMaskResponse<Separator> {
    const { i18n: { language } } = useTranslation();
    const {
        format = getDefaultFormatForLanguage<Separator>(language),
        max,
        min,
        separator = DEFAULT_DATE_SEPARATOR as Separator,
    } = options;

    const mode: MaskitoDateMode = createDateMode({ mask: format, separator });

    return useMemo(() => ({
        dateMask: {
            mask: format,
            max,
            min,
            separator: separator as Separator,
        },
        parseDate: (value: string): Date | null => maskitoParseDate(value, { mode, max, min }),
    } satisfies UseDateMaskResponse<Separator>), [format, max, min, mode, separator]);
}
