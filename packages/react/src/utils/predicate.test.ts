import { truthy } from './predicate';

describe('truthy', () => {
    it.each([
        [true, 'a non-empty string', 'string'],
        [true, 'a non-zero number', 1],
        [true, 'true', true],
        [true, 'an object', {}],
        [false, 'false', false],
        [false, 'empty string', ''],
        [false, '0', 0],
        [false, 'null', null],
        [false, 'undefined', undefined],
    ])('returns %s when value is %s', (expected, _desc, value) => {
        const result = truthy(value);

        expect(result).toBe(expected);
    });
});
