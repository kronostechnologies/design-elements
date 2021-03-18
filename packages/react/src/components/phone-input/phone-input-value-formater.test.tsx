import { formatFromPattern } from './phone-input-value-formater'

describe('Phone Input Value Formater', function () {
    it('should replace first X char from pattern with the first char from value', function () {
        const formattedValue = formatFromPattern('(X)' , '1');

        expect(formattedValue).toBe('(1)');
    });

    it('should replace all X chars from pattern with all characters from value', function () {
        const formattedValue = formatFromPattern('(XXX) XXX-XXXX' , '1234567890');

        expect(formattedValue).toBe('(123) 456-7890');
    });

    it('should replace all X chars with the first same amount of characters from value given a value longer than pattern', function () {
        const formattedValue = formatFromPattern('XXX-XXXX' , '1234567890');

        expect(formattedValue).toBe('123-4567');
    });

    it('should replace the same amount of X char from pattern as value length given a value shorter than pattern', function () {
        const formattedValue = formatFromPattern('XXX-XXXX' , '1234');

        expect(formattedValue).toBe('123-4XXX');
    });
});