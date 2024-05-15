import { enCA, enUS, frCA } from 'date-fns/locale';
import {
    getLocale,
    getLocaleDateFormat,
    getLocaleDatePlaceholder,
    getLocaleMonthsOptions,
    getLocaleMonthsShort,
    getNumericalDateFormat,
    getYearsOptions,
    setLocaleFirstDayOfWeek,
} from './datepicker-utils';

const minDate = new Date('2020-01-01');
const maxDate = new Date('2020-01-04');
const localeArray = [enUS, enCA, frCA];

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

    describe('get locale date format', () => {
        test('should return en-US date format', () => {
            const result = getLocaleDateFormat(enUS);

            expect(result).toEqual('MM/dd/yyyy');
        });

        test('should return en-CA date format when no locale is passed', () => {
            const result = getLocaleDateFormat();

            expect(result).toEqual('yyyy-MM-dd');
        });
    });

    describe('get locale date placeholder', () => {
        test('should return en-US date placeholder', () => {
            const result = getLocaleDatePlaceholder(enUS);

            expect(result).toEqual('MM/DD/YYYY');
        });

        test('should return en-CA date placeholder when no locale is passed', () => {
            const result = getLocaleDatePlaceholder();

            expect(result).toEqual('YYYY-MM-DD');
        });
    });

    describe('get locale months', () => {
        test('should return an array of abreviated months', () => {
            const result = getLocaleMonthsShort(enCA);

            expect(result)
                .toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
        });
    });

    describe('get locale months options', () => {
        test('should return an array month objects', () => {
            const result = getLocaleMonthsOptions(enCA);

            expect(result).toEqual([
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
            ]);
        });
    });

    describe('get years options', () => {
        test('should return an array year objects', () => {
            const result = getYearsOptions(minDate, maxDate);

            expect(result).toEqual([{ value: '2020', label: '2020' }]);
        });

        test('should return an empty array when minDate > maxDate', () => {
            const result = getYearsOptions(maxDate, minDate);

            expect(result).toEqual([]);
        });
    });

    describe('set locale first day of week', () => {
        test('should return locale with adjusted day of week', () => {
            setLocaleFirstDayOfWeek(enCA, 4);

            expect(enCA.options?.weekStartsOn).toEqual(4);
        });
    });

    describe('get format as numbers only', () => {
        const tests = [
            {
                format: 'yyyy-MM-dd',
                result: 'yyyyMMdd',
            },
            {
                format: 'yyyy/d/M',
                result: 'yyyyddMM',
            },
            {
                format: 'yy-MM-dd',
                result: 'yyMMdd',
            },
            {
                format: 'invalid',
                result: undefined,
            },
        ];

        test.each(tests)(
            'should return $result with format $format',
            (item) => {
                const result = getNumericalDateFormat(item.format);
                expect(result).toBe(item.result);
            },
        );
    });
});
