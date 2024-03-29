import { calculateShownPageRange } from './pagination-util';

describe('calculate pages shown', () => {
    it('should not display more page than available', () => {
        const result = calculateShownPageRange(3, 5, 1);

        expect(result).toEqual({ begin: 1, end: 3 });
    });

    it('should try to center currentPage', () => {
        const result = calculateShownPageRange(100, 5, 10);

        expect(result).toEqual({ begin: 8, end: 12 });
    });

    it('should not center currentPage when near beginning', () => {
        const result = calculateShownPageRange(100, 5, 2);

        expect(result).toEqual({ begin: 1, end: 5 });
    });

    it('should not center currentPage when near end', () => {
        const result = calculateShownPageRange(100, 5, 99);

        expect(result).toEqual({ begin: 96, end: 100 });
    });
});
