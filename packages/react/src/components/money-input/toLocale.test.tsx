import { toLocale } from './toLocale';

describe('toLocale', () => {
    it.each`
        language | expected
        ${'en'}  | ${'en-CA'}
        ${'fr'}  | ${'fr-CA'}
    `('should return $expected for $language with CAD currency', ({ language, expected }) => {
        expect(toLocale(language, 'CAD')).toBe(expected);
    });

    it.each`
        language | expected
        ${'en'}  | ${'en-US'}
        ${'fr'}  | ${'fr-US'}
    `('should return $expected for $language with USD currency', ({ language, expected }) => {
        expect(toLocale(language, 'USD')).toBe(expected);
    });

    it('should return language as is if language is a locale', () => {
        expect(toLocale('fr-FR', 'EUR')).toBe('fr-FR');
    });

    it.each`
        language | currency | expected
        ${'en'}  | ${'EUR'} | ${'en'}
        ${'fr'}  | ${'GBP'} | ${'fr'}
        ${'fr'}  | ${'ABC'} | ${'fr'}
    `('should return $language as is for unmapped $currency currency', ({ language, currency, expected }) => {
        expect(toLocale(language, currency)).toBe(expected);
    });
});
