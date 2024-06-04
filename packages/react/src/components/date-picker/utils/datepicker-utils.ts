import type { Locale } from 'date-fns';
import { enCA } from 'date-fns/locale';
import { range } from '../../../utils/range';
import { DropdownListOption } from '../../dropdown-list/dropdown-list';

export type SupportedLocale = 'fr-CA' | 'en-CA' | 'en-US';
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function getLocale(localeArray: Locale[], localeCode?: SupportedLocale): Locale {
    const findLocale = localeArray.find((locale) => locale.code === localeCode);
    return findLocale || enCA;
}

export function getLocaleMonthsShort(locale: Locale): string[] {
    const months: string[] = [];
    for (let i = 0; i < 12; i++) {
        months.push(locale.localize?.month(i, { width: 'abbreviated' }));
    }

    return months;
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
    const monthsOptions: DropdownListOption[] = [];
    for (let i = 0; i < 12; i++) {
        monthsOptions.push({
            value: locale.localize?.month(i).toLowerCase(),
            label: locale.localize?.month(i, { width: 'abbreviated' }),
        });
    }

    return monthsOptions;
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
 * The version of format as only numbers (ex: "yyyy-MM-dd" would become "yyyyMMdd").
 * Note that Month and Day are always converted to the 2 digits format.
 */
export function getNumericalDateFormat(dateFormat: string): string | null {
    if (/[^yMd/\-,. ]/g.test(dateFormat)) {
        return null;
    }

    return dateFormat
        .replace(/[^yMd]/g, '')
        .replace(/M+/g, 'MM')
        .replace(/d+/g, 'dd');
}
