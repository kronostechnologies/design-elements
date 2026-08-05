import { getAvatarColorsFromString, getDefaultAvatarColors } from './avatar.utils';
import { AZ_BG_COLORS, AZ_TXT_COLORS } from './avatar.constants';
import type { ResolvedTheme } from '../../themes';

const mockTheme = {
    ref: {},
    alias: {},
    component: {
        'avatar-background-color': '#CCCCCC',
        'avatar-text-color': '#333333',
    },
} as ResolvedTheme;

describe('getDefaultAvatarColors', () => {
    it('should return theme fallback colors', () => {
        const result = getDefaultAvatarColors(mockTheme);

        expect(result).toEqual({
            backgroundColor: '#CCCCCC',
            textColor: '#333333',
        });
    });
});

describe('getAvatarColorsFromString', () => {
    describe('fallback behavior', () => {
        it('should return fallback for undefined', () => {
            const result = getAvatarColorsFromString(mockTheme, undefined);

            expect(result).toEqual({
                backgroundColor: '#CCCCCC',
                textColor: '#333333',
            });
        });

        it('should return fallback for empty string', () => {
            const result = getAvatarColorsFromString(mockTheme, '');

            expect(result).toEqual({
                backgroundColor: '#CCCCCC',
                textColor: '#333333',
            });
        });

        it('should return fallback for whitespace-only string', () => {
            const result = getAvatarColorsFromString(mockTheme, '   ');

            expect(result).toEqual({
                backgroundColor: '#CCCCCC',
                textColor: '#333333',
            });
        });

        it('should return fallback for non-alphabetic first character', () => {
            const result = getAvatarColorsFromString(mockTheme, '1insured');

            expect(result).toEqual({
                backgroundColor: '#CCCCCC',
                textColor: '#333333',
            });
        });

        it('should return fallback for special character first character', () => {
            const result = getAvatarColorsFromString(mockTheme, '@alice');

            expect(result).toEqual({
                backgroundColor: '#CCCCCC',
                textColor: '#333333',
            });
        });
    });

    describe('deterministic mapping', () => {
        it('should return identical pair for same letter (different names)', () => {
            const result1 = getAvatarColorsFromString(mockTheme, 'Alice');
            const result2 = getAvatarColorsFromString(mockTheme, 'Andrew');

            expect(result1).toEqual(result2);
            expect(result1).not.toEqual(getDefaultAvatarColors(mockTheme));
        });

        it('should return different backgrounds for different first letters', () => {
            const resultA = getAvatarColorsFromString(mockTheme, 'Alice');
            const resultB = getAvatarColorsFromString(mockTheme, 'Bob');

            expect(resultA.backgroundColor).not.toEqual(resultB.backgroundColor);
            expect(resultA.textColor).not.toEqual(resultB.textColor);
        });
    });

    describe('diacritic handling', () => {
        it('should handle accented characters (É -> E)', () => {
            const resultAccented = getAvatarColorsFromString(mockTheme, 'Éric');
            const resultUnaccented = getAvatarColorsFromString(mockTheme, 'Eric');

            expect(resultAccented).toEqual(resultUnaccented);
        });

        it('should handle various accented characters', () => {
            const resultÅ = getAvatarColorsFromString(mockTheme, 'Ålvaro');
            const resultA = getAvatarColorsFromString(mockTheme, 'Alvaro');

            expect(resultÅ).toEqual(resultA);
        });

        it('should handle umlaut characters (Ü -> U)', () => {
            const resultUmlaut = getAvatarColorsFromString(mockTheme, 'Über');
            const resultU = getAvatarColorsFromString(mockTheme, 'Uber');

            expect(resultUmlaut).toEqual(resultU);
        });
    });

    describe('case insensitivity', () => {
        it('should return same pair for lowercase and uppercase', () => {
            const resultLower = getAvatarColorsFromString(mockTheme, 'alice');
            const resultUpper = getAvatarColorsFromString(mockTheme, 'Alice');

            expect(resultLower).toEqual(resultUpper);
        });

        it('should return same pair for mixed case', () => {
            const resultMixed = getAvatarColorsFromString(mockTheme, 'aLiCe');
            const resultUpper = getAvatarColorsFromString(mockTheme, 'Alice');

            expect(resultMixed).toEqual(resultUpper);
        });
    });

    describe('palette correctness', () => {
        it('should use A-index for names starting with A', () => {
            const result = getAvatarColorsFromString(mockTheme, 'Alice');

            expect(result.backgroundColor).toBe(AZ_BG_COLORS[0]);
            expect(result.textColor).toBe(AZ_TXT_COLORS[0]);
        });

        it('should use B-index for names starting with B', () => {
            const result = getAvatarColorsFromString(mockTheme, 'Bob');

            expect(result.backgroundColor).toBe(AZ_BG_COLORS[1]);
            expect(result.textColor).toBe(AZ_TXT_COLORS[1]);
        });

        it('should use Z-index for names starting with Z', () => {
            const result = getAvatarColorsFromString(mockTheme, 'Zoe');

            expect(result.backgroundColor).toBe(AZ_BG_COLORS[25]);
            expect(result.textColor).toBe(AZ_TXT_COLORS[25]);
        });

        it('should have matching lengths for color arrays', () => {
            expect(AZ_BG_COLORS.length).toBe(26);
            expect(AZ_TXT_COLORS.length).toBe(26);
        });
    });

    describe('whitespace and trimming', () => {
        it('should return fallback for leading whitespace since first char is space', () => {
            const result = getAvatarColorsFromString(mockTheme, '  Alice');

            expect(result).toEqual({
                backgroundColor: '#CCCCCC',
                textColor: '#333333',
            });
        });
    });

    describe('all letters A-Z', () => {
        it('should map all uppercase letters A-Z correctly', () => {
            for (let i = 0; i < 26; i++) {
                const letter = String.fromCharCode(65 + i);
                const result = getAvatarColorsFromString(mockTheme, letter);

                expect(result.backgroundColor).toBe(AZ_BG_COLORS[i]);
                expect(result.textColor).toBe(AZ_TXT_COLORS[i]);
            }
        });
    });
});
