import { getYear } from 'date-fns';
import { enCA } from 'date-fns/locale';
import { range } from 'lodash';

import { Option } from '../../select/select';
import { LocaleProps } from '../datepicker';

export function getLocale(localeArray: Locale[], localeCode?: LocaleProps): Locale {
    const findLocale = localeArray.find(locale => locale.code === localeCode);
    return findLocale || enCA;
}

export function getLocaleMonthsShort(locale: Locale): string[] {
    const months: string[] = [];
    for (let i = 0; i < 12; i++) {
        months.push(locale.localize?.month(i, { width: 'abbreviated' }));
    }

    return months;
}

export function getLocaleDateFormat(locale?: LocaleProps): string {
    const formats = {
        'en-US' : 'MM/dd/yyyy',
        'en-CA' : 'yyyy-MM-dd',
        'fr-CA' : 'yyyy-MM-dd',
    };

    return formats[locale || 'en-CA'];
}

export function getLocaleDatePlaceholder(locale?: LocaleProps): string {
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

export function getYearsOptions(minDate?: Date | null, maxDate?: Date | null): Option[] {
    const years = range(minDate ? getYear(minDate) : 1920, maxDate ? getYear(maxDate) + 1 : getYear(new Date()) + 1, 1);
    const yearsOptions: Option[] = [];
    years.map(year => {
        yearsOptions.push({ value: year.toString(), label: year.toString() });
    });

    return yearsOptions;
}
