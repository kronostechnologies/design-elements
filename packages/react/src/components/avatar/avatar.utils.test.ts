import { getAvatarColorsFromString, getDefaultAvatarColors } from './avatar.utils';
import { type ResolvedTheme } from '../../themes';
import { type ComponentTokenMap } from '../../themes/tokens';

const mockTheme: ResolvedTheme = {
    ref: {} as Record<string, unknown>,
    alias: {} as Record<string, unknown>,
    component: {
        'avatar-background-color': '#FFFFFF',
        'avatar-text-color': '#000000',
    } as ComponentTokenMap<Record<string, unknown>>,
};

describe('Avatar color utilities', () => {
    describe('getDefaultAvatarColors', () => {
        it('returns fallback colors from theme', () => {
            const result = getDefaultAvatarColors(mockTheme);

            expect(result.backgroundColor).toBe('#FFFFFF');
            expect(result.textColor).toBe('#000000');
        });
    });

    describe('getAvatarColorsFromString', () => {
        it('returns fallback for undefined string', () => {
            const result = getAvatarColorsFromString(mockTheme, undefined);

            expect(result.backgroundColor).toBe('#FFFFFF');
            expect(result.textColor).toBe('#000000');
        });

        it('returns fallback for empty string', () => {
            const result = getAvatarColorsFromString(mockTheme, '');

            expect(result.backgroundColor).toBe('#FFFFFF');
            expect(result.textColor).toBe('#000000');
        });

        it('returns fallback for whitespace-only string', () => {
            const result = getAvatarColorsFromString(mockTheme, '   ');

            expect(result.backgroundColor).toBe('#FFFFFF');
            expect(result.textColor).toBe('#000000');
        });

        it('returns A-index colors for uppercase "A"', () => {
            const result = getAvatarColorsFromString(mockTheme, 'A');

            expect(result.backgroundColor).toBe('#EBE6EB');
            expect(result.textColor).toBe('#220123');
        });

        it('returns A-index colors for lowercase "a"', () => {
            const result = getAvatarColorsFromString(mockTheme, 'a');

            expect(result.backgroundColor).toBe('#EBE6EB');
            expect(result.textColor).toBe('#220123');
        });

        it('returns same pair for names starting with same letter', () => {
            const alice = getAvatarColorsFromString(mockTheme, 'Alice');
            const andrew = getAvatarColorsFromString(mockTheme, 'Andrew');

            expect(alice.backgroundColor).toBe(andrew.backgroundColor);
            expect(alice.textColor).toBe(andrew.textColor);
            expect(alice.backgroundColor).not.toBe('#FFFFFF');
        });

        it('returns different colors for different first letters', () => {
            const alice = getAvatarColorsFromString(mockTheme, 'Alice');
            const bob = getAvatarColorsFromString(mockTheme, 'Bob');

            expect(alice.backgroundColor).not.toBe(bob.backgroundColor);
            expect(alice.textColor).not.toBe(bob.textColor);
        });

        it('handles diacritics: "Éric" returns E-index colors', () => {
            const result = getAvatarColorsFromString(mockTheme, 'Éric');

            const eResult = getAvatarColorsFromString(mockTheme, 'Eric');
            expect(result.backgroundColor).toBe(eResult.backgroundColor);
            expect(result.textColor).toBe(eResult.textColor);
        });

        it('handles diacritics: "Ålvaro" returns A-index colors', () => {
            const result = getAvatarColorsFromString(mockTheme, 'Ålvaro');

            const aResult = getAvatarColorsFromString(mockTheme, 'Alvaro');
            expect(result.backgroundColor).toBe(aResult.backgroundColor);
            expect(result.textColor).toBe(aResult.textColor);
        });

        it('handles diacritics: "Über" returns U-index colors', () => {
            const result = getAvatarColorsFromString(mockTheme, 'Über');

            const uResult = getAvatarColorsFromString(mockTheme, 'Uber');
            expect(result.backgroundColor).toBe(uResult.backgroundColor);
            expect(result.textColor).toBe(uResult.textColor);
        });

        it('returns fallback for digit first character', () => {
            const result = getAvatarColorsFromString(mockTheme, '1insured');

            expect(result.backgroundColor).toBe('#FFFFFF');
            expect(result.textColor).toBe('#000000');
        });

        it('returns fallback for symbol first character', () => {
            const result = getAvatarColorsFromString(mockTheme, '@company');

            expect(result.backgroundColor).toBe('#FFFFFF');
            expect(result.textColor).toBe('#000000');
        });

        it('returns consistent Z-index colors for "Zoe"', () => {
            const result = getAvatarColorsFromString(mockTheme, 'Zoe');

            expect(result.backgroundColor).toBe('#EBF7F1');
            expect(result.textColor).toBe('#0D5137');
        });

        it('returns fallback when active theme changes', () => {
            const anotherTheme: ResolvedTheme = {
                ref: {} as Record<string, unknown>,
                alias: {} as Record<string, unknown>,
                component: {
                    'avatar-background-color': '#CCCCCC',
                    'avatar-text-color': '#333333',
                } as ComponentTokenMap<Record<string, unknown>>,
            };

            const result = getAvatarColorsFromString(anotherTheme, '');

            expect(result.backgroundColor).toBe('#CCCCCC');
            expect(result.textColor).toBe('#333333');
        });
    });
});
