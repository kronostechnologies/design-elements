import { formatFromPattern } from './phone-input-value-formater';

describe('Phone Input Value Formater', () => {
    it('should replace first X char from pattern with the first char from value', () => {
        const formattedValue = formatFromPattern('(X)', 'X', '1');

        expect(formattedValue).toBe('(1)');
    });

    it('should replace all X chars from pattern with all characters from value', () => {
        const formattedValue = formatFromPattern('(XXX) XXX-XXXX', 'X', '1234567890');

        expect(formattedValue).toBe('(123) 456-7890');
    });

    it('should replace all same X first amount of characters of pattern', () => {
        const formattedValue = formatFromPattern('XXX-XXXX', 'X', '1234567890');

        expect(formattedValue).toBe('123-4567');
    });

    it('should replace all X char from pattern as value length given a value shorter than pattern', () => {
        const formattedValue = formatFromPattern('XXX-XXXX', 'X', '1234');

        expect(formattedValue).toBe('123-4XXX');
    });
});
