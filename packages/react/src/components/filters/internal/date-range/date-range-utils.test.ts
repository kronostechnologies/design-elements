import type { FilterDateRangePreset } from '../../filter-date-range';
import type { ComputedPreset } from './presets';
import { getRangeFromPreset, hasSameRange, isSameDateTime } from './date-range-utils';

describe('hasSameRange', () => {
    it('returns true when both ranges have the same from and to dates', () => {
        const date1 = new Date(2026, 0, 1);
        const date2 = new Date(2026, 0, 31);

        const result = hasSameRange(
            { from: date1, to: date2 },
            { from: new Date(2026, 0, 1), to: new Date(2026, 0, 31) },
        );

        expect(result).toBe(true);
    });

    it('returns true when both ranges have null from and to', () => {
        const result = hasSameRange({ from: null, to: null }, { from: null, to: null });

        expect(result).toBe(true);
    });

    it('returns false when from dates differ', () => {
        const result = hasSameRange(
            { from: new Date(2026, 0, 1), to: new Date(2026, 0, 31) },
            { from: new Date(2026, 0, 2), to: new Date(2026, 0, 31) },
        );

        expect(result).toBe(false);
    });

    it('returns false when to dates differ', () => {
        const result = hasSameRange(
            { from: new Date(2026, 0, 1), to: new Date(2026, 0, 31) },
            { from: new Date(2026, 0, 1), to: new Date(2026, 0, 30) },
        );

        expect(result).toBe(false);
    });

    it('returns false when one from is null and the other is not', () => {
        const result = hasSameRange(
            { from: null, to: new Date(2026, 0, 31) },
            { from: new Date(2026, 0, 1), to: new Date(2026, 0, 31) },
        );

        expect(result).toBe(false);
    });

    it('returns true when both from and to differ only in time but are the same day', () => {
        const result = hasSameRange(
            { from: new Date(2026, 0, 1, 0, 0, 0), to: new Date(2026, 0, 31, 0, 0, 0) },
            { from: new Date(2026, 0, 1, 23, 59, 59), to: new Date(2026, 0, 31, 23, 59, 59) },
        );

        expect(result).toBe(true);
    });
});

describe('getRangeFromPreset', () => {
    it('returns null range when preset is null', () => {
        const result = getRangeFromPreset(null);

        expect(result).toEqual({ from: null, to: null });
    });

    it('returns from and to from a ComputedPreset with start and end', () => {
        const start = new Date(2026, 0, 1);
        const end = new Date(2026, 0, 31);
        const preset: ComputedPreset = { label: 'January', start, end };

        const result = getRangeFromPreset(preset);

        expect(result).toEqual({ from: start, to: end });
    });

    it('returns null from when preset has no start', () => {
        const end = new Date(2026, 0, 31);
        const preset: ComputedPreset = { label: 'Past', end };

        const result = getRangeFromPreset(preset);

        expect(result).toEqual({ from: null, to: end });
    });

    it('returns null to when preset has no end', () => {
        const start = new Date(2026, 0, 1);
        const preset: ComputedPreset = { label: 'Upcoming', start };

        const result = getRangeFromPreset(preset);

        expect(result).toEqual({ from: start, to: null });
    });

    it('returns from and to from a FilterDateRangePreset with start and end', () => {
        const start = new Date(2026, 5, 1);
        const end = new Date(2026, 5, 15);
        const preset: FilterDateRangePreset = { start, end };

        const result = getRangeFromPreset(preset);

        expect(result).toEqual({ from: start, to: end });
    });

    it('returns null range when preset has no start and no end', () => {
        const preset: FilterDateRangePreset = { days: -7 };

        const result = getRangeFromPreset(preset);

        expect(result).toEqual({ from: null, to: null });
    });
});

describe('isSameDateTime', () => {
    it('returns true when both dates are the same instant', () => {
        const date = new Date(2026, 0, 1, 12, 30, 0);

        const result = isSameDateTime(date, new Date(2026, 0, 1, 12, 30, 0));

        expect(result).toBe(true);
    });

    it('returns false when dates are different', () => {
        const result = isSameDateTime(
            new Date(2026, 0, 1, 12, 30, 0, 0),
            new Date(2026, 0, 1, 12, 30, 0, 999),
        );

        expect(result).toBe(false);
    });

    it('returns true when both dates are null', () => {
        const result = isSameDateTime(null, null);

        expect(result).toBe(true);
    });

    it('returns false when only first date is null', () => {
        const result = isSameDateTime(null, new Date(2026, 0, 1));

        expect(result).toBe(false);
    });

    it('returns false when only second date is null', () => {
        const result = isSameDateTime(new Date(2026, 0, 1), null);

        expect(result).toBe(false);
    });
});
