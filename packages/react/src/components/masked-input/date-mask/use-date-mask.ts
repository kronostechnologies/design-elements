import { maskitoParseDate, maskitoStringifyDate } from '@maskito/kit';
import { useMemo } from 'react';
import { useTranslation } from '../../../i18n/use-translation';
import { type DateMask } from '../internal/mask';
import { createMaskitoDateOptions } from '../internal/maskito';
import type { DateMaskFormat } from '../internal/date-mask';

const DEFAULT_DATE_FORMAT: DateMaskFormat = 'yyyy-mm-dd';
const SUPPORTED_DATE_FORMATS: string[] = [
    'dd/mm/yyyy',
    'mm/dd/yyyy',
    'yyyy/mm/dd',
    'dd-mm-yyyy',
    'mm-dd-yyyy',
    'yyyy-mm-dd',
    'dd.mm.yyyy',
    'mm.dd.yyyy',
    'yyyy.mm.dd',
] satisfies DateMaskFormat[];

export type UseDateMaskOptions = {
    format?: DateMaskFormat;
};

export interface UseDateMaskResponse extends DateMask {
    formatDate(date: Date): string;

    parseDate(value: string): Date | null;
}

interface DatePlaceholders {
    day: string;
    month: string;
    year: string;
}

const placeholders: Record<string, DatePlaceholders> = {
    fr: {
        day: 'J',
        month: 'M',
        year: 'A',
    },
    en: {
        day: 'D',
        month: 'M',
        year: 'Y',
    },
};

function isFormatSupported(localeFormat: string): boolean {
    return SUPPORTED_DATE_FORMATS.includes(localeFormat);
}

function getLocaleDateMaskFormatOrDefault(locale: string): DateMaskFormat {
    const formatObj = new Intl.DateTimeFormat(locale).formatToParts(new Date());

    const localeFormat = formatObj
        .map((obj) => {
            switch (obj.type) {
                case 'day':
                    return 'dd';
                case 'month':
                    return 'mm';
                case 'year':
                    return 'yyyy';
                default:
                    return obj.value;
            }
        })
        .join('');

    if (isFormatSupported(localeFormat)) {
        return localeFormat as DateMaskFormat;
    }

    return DEFAULT_DATE_FORMAT;
}

function getDateMaskFormatOrDefaultForLocale(format: string, locale: string): DateMaskFormat {
    if (SUPPORTED_DATE_FORMATS.includes(format)) {
        return format as DateMaskFormat;
    }
    return getLocaleDateMaskFormatOrDefault(locale);
}

function ensureValidFormat(format: DateMaskFormat | undefined, locale: string): DateMaskFormat {
    if (format === undefined) {
        return getLocaleDateMaskFormatOrDefault(locale);
    }

    return getDateMaskFormatOrDefaultForLocale(format, locale);
}

function getMaskForLocale(format: DateMaskFormat, locale: string): string {
    const language = locale.toLocaleLowerCase().split('-')[0];
    const placeholdersForCurrentLocale: DatePlaceholders = placeholders[language] || placeholders.en;
    const yearPlaceholder = placeholdersForCurrentLocale.year;
    const monthPlaceholder = placeholdersForCurrentLocale.month;
    const dayPlaceholder = placeholdersForCurrentLocale.day;

    return format.replace(/y/g, yearPlaceholder)
        .replace(/m/g, monthPlaceholder)
        .replace(/d/g, dayPlaceholder);
}

/**
 * Generates a date mask based on the provided format. If no format is provided, it defaults to a format based on the
 * user's locale, assuming it matches one of the supported formats, or falls back to ISO-8601.
 * The mask is determined by the user's language (e.g 'AAAA-MM-JJ' for french, 'YYYY-MM-DD' otherwise).
 * The hook also returns a `parseDate` function that allows parsing the input string back into a Date object.
 */
export function useDateMask({
    format: providedFormat,
}: UseDateMaskOptions = {}): UseDateMaskResponse {
    const { i18n: { language } } = useTranslation();
    const format = useMemo(() => ensureValidFormat(providedFormat, language), [language, providedFormat]);

    const mask = useMemo(() => getMaskForLocale(format, language), [format, language]);
    const { mode: maskitoMode, separator } = createMaskitoDateOptions(format);

    return useMemo(() => ({
        dateMask: {
            mask,
            format,
        },
        formatDate: (value: Date): string => maskitoStringifyDate(value, { mode: maskitoMode, separator }),
        parseDate: (value: string): Date | null => maskitoParseDate(value, { mode: maskitoMode, separator }),
    } satisfies UseDateMaskResponse), [mask, format, maskitoMode, separator]);
}
