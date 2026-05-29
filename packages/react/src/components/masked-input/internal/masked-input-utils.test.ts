import { extractRawInput } from './masked-input-utils';

describe('extractRawInput', () => {
    it('returns empty string when value is empty', () => {
        const result = extractRawInput('', new Set(['-']));

        expect(result).toBe('');
    });

    it('returns value unchanged when separator set is empty', () => {
        const result = extractRawInput('abc123', new Set());

        expect(result).toBe('abc123');
    });

    it('returns value unchanged when it contains no separator characters', () => {
        const result = extractRawInput('abc123', new Set(['-', '/']));

        expect(result).toBe('abc123');
    });

    it('strips separator characters from value', () => {
        const result = extractRawInput('/a-b/c-/', new Set(['-', '/']));

        expect(result).toBe('abc');
    });

    it('returns empty string when value contains only separator characters', () => {
        const result = extractRawInput('---', new Set(['-']));

        expect(result).toBe('');
    });
});
