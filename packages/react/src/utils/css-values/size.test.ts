import { parseSize } from './size';

describe('parseSize', () => {
    it('should parse a valid integer string', () => {
        expect(parseSize('16px')).toBe(16);
    });

    it('should parse a valid float string', () => {
        expect(parseSize('1.5em')).toBe(1.5);
    });

    it('should return the default value for a non-numeric string', () => {
        expect(parseSize('abc')).toBe(0);
    });

    it('should return the custom default value when provided', () => {
        expect(parseSize('abc', 10)).toBe(10);
    });

    it('should return the default value for a null value', () => {
        expect(parseSize(null)).toBe(0);
    });

    it('should return the default value for an undefined value', () => {
        expect(parseSize(undefined)).toBe(0);
    });

    it('should return the default value for an empty string', () => {
        expect(parseSize('')).toBe(0);
    });

    it('should handle negative numbers', () => {
        expect(parseSize('-10.2px')).toBe(-10.2);
    });

    it('should handle zero', () => {
        expect(parseSize('0px')).toBe(0);
    });

    it('should return the default value for strings that do not start with a number', () => {
        expect(parseSize('padding: 10px')).toBe(0);
    });

    it('should parse a number and ignore trailing non-numeric characters', () => {
        expect(parseSize('10em solid')).toBe(10);
    });
});
