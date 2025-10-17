import { parseBoxShadow, findMaxBottomBoxShadow, findMaxTopBoxShadow, type BoxShadow } from './box-shadow';

describe('parseBoxShadow', () => {
    it('parses a single shadow', () => {
        const result = parseBoxShadow('2px 4px 6px #000');

        expect(result).toEqual([
            {
                inset: false,
                offsetX: '2px',
                offsetY: '4px',
                blurRadius: '6px',
                spreadRadius: undefined,
                color: '#000',
            },
        ]);
    });

    it('parses multiple shadows', () => {
        const result = parseBoxShadow('2px 4px 6px #000, inset 1px 2px 3px 4px red');

        expect(result).toEqual([
            {
                inset: false,
                offsetX: '2px',
                offsetY: '4px',
                blurRadius: '6px',
                spreadRadius: undefined,
                color: '#000',
            },
            {
                inset: true,
                offsetX: '1px',
                offsetY: '2px',
                blurRadius: '3px',
                spreadRadius: '4px',
                color: 'red',
            },
        ]);
    });

    it('parses shadow with only offset', () => {
        const result = parseBoxShadow('5px 10px');

        expect(result).toEqual([
            {
                inset: false,
                offsetX: '5px',
                offsetY: '10px',
                blurRadius: undefined,
                spreadRadius: undefined,
                color: undefined,
            },
        ]);
    });

    it('returns empty array for empty input', () => {
        expect(parseBoxShadow('')).toEqual([]);
    });
});

describe('findMaxBottom', () => {
    it('finds the max bottom value', () => {
        const shadows: BoxShadow[] = [
            {
                inset: false,
                offsetX: '0',
                offsetY: '2',
                blurRadius: '4',
                spreadRadius: '1',
                color: 'red',
            },
            {
                inset: false,
                offsetX: '0',
                offsetY: '3',
                blurRadius: '2',
                spreadRadius: '0',
                color: 'blue',
            },
        ];

        expect(findMaxBottomBoxShadow(shadows)).toBe(7);
    });

    it('ignores inset shadows', () => {
        const shadows: BoxShadow[] = [
            {
                inset: false,
                offsetX: '0',
                offsetY: '0',
                blurRadius: '0',
                spreadRadius: '1',
                color: 'red',
            },
            {
                inset: true,
                offsetX: '0',
                offsetY: '0',
                blurRadius: '0',
                spreadRadius: '20',
                color: 'blue',
            },
        ];

        expect(findMaxBottomBoxShadow(shadows)).toBe(1);
    });

    it('returns 0 for empty array', () => {
        expect(findMaxBottomBoxShadow([])).toBe(0);
    });
});

describe('findMaxTop', () => {
    it('finds the max top value', () => {
        const shadows: BoxShadow[] = [
            {
                inset: false,
                offsetX: '0',
                offsetY: '-2',
                blurRadius: '4',
                spreadRadius: '1',
                color: 'red',
            },
            {
                inset: false,
                offsetX: '0',
                offsetY: '-3',
                blurRadius: '2',
                spreadRadius: '0',
                color: 'blue',
            },
        ];

        expect(findMaxTopBoxShadow(shadows)).toBe(7);
    });

    it('ignores inset shadows', () => {
        const shadows: BoxShadow[] = [
            {
                inset: false,
                offsetX: '0',
                offsetY: '0',
                blurRadius: '0',
                spreadRadius: '1',
                color: 'red',
            },
            {
                inset: true,
                offsetX: '0',
                offsetY: '0',
                blurRadius: '0',
                spreadRadius: '20',
                color: 'blue',
            },
        ];

        expect(findMaxTopBoxShadow(shadows)).toBe(1);
    });

    it('returns 0 for empty array', () => {
        expect(findMaxTopBoxShadow([])).toBe(0);
    });
});
