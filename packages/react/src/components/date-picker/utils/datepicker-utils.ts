import type { Locale } from 'date-fns';
import { enCA } from 'date-fns/locale';
import { Month } from 'date-fns/types';
import { range } from '../../../utils/range';
import { DropdownListOption } from '../../dropdown-list/dropdown-list';

const monthNumbers: Month[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export type SupportedLocale = 'fr-CA' | 'en-CA' | 'en-US';
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function getLocale(localeArray: Locale[], localeCode?: SupportedLocale): Locale {
    const findLocale = localeArray.find((locale) => locale.code === localeCode);
    return findLocale || enCA;
}

export function getLocaleMonthsShort(locale: Locale): string[] {
    return monthNumbers.map((m: Month) => locale.localize?.month(m, { width: 'abbreviated' }));
}

export function getLocaleDateFormat(locale: Locale = enCA): string {
    const formatObj = new Intl.DateTimeFormat(locale.code).formatToParts(new Date());

    return formatObj
        .map((obj) => {
            switch (obj.type) {
                case 'day':
                    return 'dd';
                case 'month':
                    return 'MM';
                case 'year':
                    return 'yyyy';
                default:
                    return obj.value;
            }
        })
        .join('');
}

export function getLocaleDatePlaceholder(locale?: Locale): string {
    return getLocaleDateFormat(locale).toUpperCase();
}

export function getLocaleMonthsOptions(locale: Locale): DropdownListOption[] {
    return monthNumbers.map((m: Month) => ({
        value: locale.localize?.month(m).toLowerCase(),
        label: locale.localize?.month(m, { width: 'abbreviated' }),
    }));
}

export function getYearsOptions(minDate?: Date | null, maxDate?: Date | null): DropdownListOption[] {
    if (minDate && maxDate && minDate > maxDate) {
        return [];
    }

    const years = range(
        minDate ? minDate.getUTCFullYear() : 1920,
        maxDate ? maxDate.getUTCFullYear() : new Date().getUTCFullYear(),
    );

    return years.map((year) => ({ value: year.toString(), label: year.toString() }));
}

export function setLocaleFirstDayOfWeek(locale: Locale, dayOfWeek?: DayOfWeek): void {
    const optionsOverride: Locale['options'] = { weekStartsOn: dayOfWeek };
    Object.assign(locale.options || {}, optionsOverride);
}

/**
 * The shorter version of format without symbols. Month and Day always use 2 digits.
 */
export function getSimplifiedInputDateFormat(dateFormat: string): string | void {
    if (/[^yMd/\-,. ]/g.test(dateFormat)) {
        return;
    }

    return dateFormat
        .replace(/[^yMd]/g, '')
        .replace(/M+/g, 'MM')
        .replace(/d+/g, 'dd');
}
