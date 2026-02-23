import { buildSlotAtoms, filterByPattern } from './masked-input-value-formater';

describe('buildSlotAtoms', () => {
    it('postal code', () => {
        const atoms = buildSlotAtoms('[A-Z]\\d[A-Z] \\d[A-Z]\\d', '()- /');
        expect(atoms).toEqual(['[A-Z]', '\\d', '[A-Z]', '\\d', '[A-Z]', '\\d']);
    });

    it('phone', () => {
        const atoms = buildSlotAtoms('\\(\\d\\d\\d\\) \\d\\d\\d-\\d\\d\\d\\d', '()- /');
        expect(atoms).toHaveLength(10);
        expect(atoms.every((a) => a === '\\d')).toBe(true);
    });

    it('dot-separated', () => {
        const atoms = buildSlotAtoms('\\d\\d\\d\\.\\d\\d\\d\\.\\d\\d\\d', '.');
        expect(atoms).toHaveLength(9);
        expect(atoms.every((a) => a === '\\d')).toBe(true);
    });

    it('dot-separated with default separators should keep the dots', () => {
        const atoms = buildSlotAtoms('\\d\\d\\d\\.\\d\\d\\d\\.\\d\\d\\d', '()- /');
        expect(atoms).toHaveLength(11);
        expect(atoms.filter((a) => a === '\\d')).toHaveLength(9);
        expect(atoms.filter((a) => a === '\\.')).toHaveLength(2);
    });

    it('filterByPattern postal', () => {
        const atoms = buildSlotAtoms('[A-Z]\\d[A-Z] \\d[A-Z]\\d', '()- /');
        expect(filterByPattern('H3Z2Y7', atoms)).toBe('H3Z2Y7');
        expect(filterByPattern('13Z2Y7', atoms)).toBe('Z2Y7');
        expect(filterByPattern('1', atoms)).toBe('');
    });

    it('filterByPattern digits only', () => {
        const atoms = buildSlotAtoms('\\d\\d\\d\\.\\d\\d\\d\\.\\d\\d\\d', '.');
        expect(filterByPattern('123456789', atoms)).toBe('123456789');
        expect(filterByPattern('abc123456789', atoms)).toBe('123456789');
        expect(filterByPattern('abcdefghi', atoms)).toBe('');
    });

    it('expands {n} quantifier into n atoms', () => {
        const atoms = buildSlotAtoms('\\d{4}-\\d{2}', '-');
        expect(atoms).toHaveLength(6);
        expect(atoms.every((a) => a === '\\d')).toBe(true);
    });

    it('expands {n,m} quantifier using max into m atoms', () => {
        const atoms = buildSlotAtoms('\\d{4}-\\d{1,2}-\\d{1,2}', '-');
        expect(atoms).toHaveLength(8);
        expect(atoms.every((a) => a === '\\d')).toBe(true);
    });

    it('filterByPattern with {n} quantifier pattern', () => {
        const atoms = buildSlotAtoms('\\d{4}-\\d{2}-\\d{2}', '-');
        expect(filterByPattern('20260219', atoms)).toBe('20260219');
        expect(filterByPattern('2026abc0219', atoms)).toBe('20260219');
        expect(filterByPattern('abcd', atoms)).toBe('');
    });
});
