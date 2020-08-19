import { range } from '@design-elements/utils/range';
import { enCA } from 'date-fns/locale';

import { Option } from '../../select/select';
import { DayOfWeek, SupportedLocale } from '../datepicker';

export function getLocale(localeArray: Locale[], localeCode?: SupportedLocale): Locale {
    const findLocale = localeArray.find(locale => locale.code === localeCode);
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
        .map(obj => {
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

export function getLocaleMonthsOptions(locale: Locale): Option[] {
    const monthsOptions: Option[] = [];
    for (let i = 0; i < 12; i++) {
        monthsOptions.push({
            value: locale.localize?.month(i).toLowerCase(),
            label: locale.localize?.month(i, { width: 'abbreviated' }),
        });
    }

    return monthsOptions;
}

export function getYearsOptions(minDate?: Date | null, maxDate?: Date | null): Option[] {
    if (minDate && maxDate && minDate > maxDate) {
        return [];
    }

    const years = range(
        minDate ? minDate.getUTCFullYear() : 1920,
        maxDate ? maxDate.getUTCFullYear() + 1 : new Date().getUTCFullYear() + 1);

    return years.map(year => ({ value: year.toString(), label: year.toString() }));
}

export function setLocaleFirstDayOfWeek(locale: Locale, dayOfWeek?: DayOfWeek): void {
    if (locale.options) {
        locale.options.weekStartsOn = dayOfWeek;
    } else {
        locale.options = { weekStartsOn: dayOfWeek };
    }
}
