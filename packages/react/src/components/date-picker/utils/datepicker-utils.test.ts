import { enCA, enUS, frCA } from 'date-fns/locale';
import {
    getAlternateDateFormats,
    getLocale,
    getLocaleDateFormat,
    getLocaleDatePlaceholder,
    getLocaleMonthsOptions,
    getLocaleMonthsShort,
    getYearsOptions,
    setLocaleFirstDayOfWeek,
} from './datepicker-utils';

const minDate = new Date('2020-01-01');
const maxDate = new Date('2020-01-04');
const localeArray = [enUS, enCA, frCA];

describe('Datepicker utils', () => {
    describe('get locale', () => {
        it('should return frCA locale', () => {
            const result = getLocale(localeArray, 'fr-CA');

            expect(result).toEqual(frCA);
        });

        it('should return enCA when no locale is passed', () => {
            const result = getLocale(localeArray);

            expect(result).toEqual(enCA);
        });
    });

    describe('get locale date format', () => {
        it('should return en-US date format', () => {
            const result = getLocaleDateFormat(enUS);

            expect(result).toEqual('MM/dd/yyyy');
        });

        it('should return en-CA date format when no locale is passed', () => {
            const result = getLocaleDateFormat();

            expect(result).toEqual('yyyy-MM-dd');
        });
    });

    describe('get locale date placeholder', () => {
        it('should return en-US date placeholder', () => {
            const result = getLocaleDatePlaceholder(enUS);

            expect(result).toEqual('MM/DD/YYYY');
        });

        it('should return en-CA date placeholder when no locale is passed', () => {
            const result = getLocaleDatePlaceholder();

            expect(result).toEqual('YYYY-MM-DD');
        });
    });

    describe('get locale months', () => {
        it('should return an array of abreviated months', () => {
            const result = getLocaleMonthsShort(enCA);

            expect(result)
                .toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
        });
    });

    describe('get locale months options', () => {
        it('should return an array month objects', () => {
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
        it('should return an array year objects', () => {
            const result = getYearsOptions(minDate, maxDate);

            expect(result).toEqual([{ value: '2020', label: '2020' }]);
        });

        it('should return an empty array when minDate > maxDate', () => {
            const result = getYearsOptions(maxDate, minDate);

            expect(result).toEqual([]);
        });
    });

    describe('set locale first day of week', () => {
        it('should return locale with adjusted day of week', () => {
            setLocaleFirstDayOfWeek(enCA, 4);

            expect(enCA.options?.weekStartsOn).toEqual(4);
        });
    });

    describe('provide variations of a given date format', () => {
        test('the user-provided format is at the beginning of the list', () => {
            const providedDateFormat = 'yyyy-MM-dd';
            const result = getAlternateDateFormats(providedDateFormat);

            expect(result[0]).toEqual(providedDateFormat);
        });

        const tests = [
            {
                format: 'yyyy-MM-dd',
                result: [
                    'yyyy-MM-dd',
                    'yyyyMMdd',
                    'yyyy MM dd',
                    'yyyy/MM/dd',
                    'yyyy M d',
                    'yyyy-M-d',
                    'yyyy/M/d',
                ],
            },
            {
                format: 'yyyy/d/M',
                result: [
                    'yyyy/d/M',
                    'yyyydM',
                    'yyyy d M',
                    'yyyy-d-M',
                ],
            },
            {
                format: 'dd/MM/yyyy',
                result: [
                    'dd/MM/yyyy',
                    'ddMMyyyy',
                    'dd MM yyyy',
                    'dd-MM-yyyy',
                    'd M yyyy',
                    'd-M-yyyy',
                    'd/M/yyyy',
                ],
            },
            {
                format: 'yy-MM-dd',
                result: [
                    'yy-MM-dd',
                    'yyMMdd',
                    'yy MM dd',
                    'yy/MM/dd',
                    'yy M d',
                    'yy-M-d',
                    'yy/M/d',
                ],
            },
        ];

        test.each(tests)(
            'should return $result with format $format',
            (item) => {
                const result = getAlternateDateFormats(item.format);
                expect(result).toStrictEqual(item.result);
            },
        );
    });
});
