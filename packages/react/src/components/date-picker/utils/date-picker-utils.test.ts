import { enCA, enUS, frCA } from 'date-fns/locale';

import {
    getLocale,
    getLocaleMonthsOptions,
    getLocaleMonthsShort,
    getYearsOptions,
} from './date-picker-utils';

const minDate = new Date('2020-01-01 12:00');
const maxDate = new Date('2020-01-04');
const localeArray = [enUS, enCA, frCA];
const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthsOptions = [
    { value: 'january', label: 'Jan' },
    { value: 'february', label: 'Feb' },
    { value: 'march', label: 'Mar' },
    { value: 'april', label: 'Apr' },
    { value: 'may', label: 'May' },
    { value: 'june', label: 'Jun' },
    { value: 'july', label: 'Jul' },
    { value: 'august', label: 'Aug' },
    { value: 'september', label: 'Sep' },
    { value: 'october', label: 'Oct' },
    { value: 'november', label: 'Nov' },
    { value: 'december', label: 'Dec' },
];

describe('Datepicker utils', () => {
    describe('get locale', () => {
        test('should return frCA locale', () => {
            const result = getLocale(localeArray, 'fr-CA');

            expect(result).toEqual(frCA);
        });

        test('should return enCA when no locale is passed', () => {
            const result = getLocale(localeArray);

            expect(result).toEqual(enCA);
        });
    });

    describe('get locale months', () => {
        test('should return an array of abreviated months', () => {
            const result = getLocaleMonthsShort(enCA);

            expect(result).toEqual(monthsArray);
        });
    });

    describe('get locale months options', () => {
        test('should return an array month objects', () => {
            const result = getLocaleMonthsOptions(enCA);

            expect(result).toEqual(monthsOptions);
        });
    });

    describe('get years options', () => {
        test('should return an array year objects', () => {
            const result = getYearsOptions(minDate, maxDate);

            expect(result).toEqual([{ value: '2020', label: '2020' }]);
        });
    });
});
