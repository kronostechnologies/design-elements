import { formatFromPattern, removeDigitOnMaskCharRemoval, removeNonDigits } from './phone-input-value-formater';

describe('Phone Input Value Formater', () => {
    describe('formatFromPattern', () => {
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

    describe('removeNonDigits', () => {
        it('value should not change given only digits', () => {
            const valueWithOnlyDigits = '1234';
            const formattedValue = removeNonDigits(valueWithOnlyDigits);

            expect(formattedValue).toBe(valueWithOnlyDigits);
        });

        it('value should be empty given string without digits', () => {
            const valueWithoutDigits = 'abcd';
            const formattedValue = removeNonDigits(valueWithoutDigits);

            expect(formattedValue).toBe('');
        });

        it('should remove all non-digits from value', () => {
            const valueWithoutDigits = '(a1b2)';
            const formattedValue = removeNonDigits(valueWithoutDigits);

            expect(formattedValue).toBe('12');
        });
    });

    describe('removeDigitOnMaskCharRemoval', () => {
        it('removing a mask char with the backspace key should remove previous digit char from number', () => {
            const formattedValue = removeDigitOnMaskCharRemoval('123456', '(123 456', 4, true);

            expect(formattedValue).toBe('12456');
        });

        it('removing a mask char with the delete key should remove next digit char from number', () => {
            const formattedValue = removeDigitOnMaskCharRemoval('123456', '(123 456', 4, false);

            expect(formattedValue).toBe('12356');
        });

        it('removing a mask char with backspace without having any digit before should not change value', () => {
            const formattedValue = removeDigitOnMaskCharRemoval('123456', '123) 456', 0, true);

            expect(formattedValue).toBe('123456');
        });

        it('removing a mask char with delete without having any digit after should not change value', () => {
            const formattedValue = removeDigitOnMaskCharRemoval('123', '(123)', 4, false);

            expect(formattedValue).toBe('123');
        });
    });
});
