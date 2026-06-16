import { type TFunction } from 'i18next';
import { type MockedFunction } from 'jest-mock';
import { computePreset, FilterDateRangePresets } from './presets';

describe('FilterDateRangePresets', () => {
    let t: MockedFunction<TFunction>;

    beforeEach(() => {
        jest.useFakeTimers({
            now: new Date(2026, 5, 15),
        });

        t = jest.fn((key: string, options?: unknown) => {
            if (options && typeof options === 'object') {
                return `${key}:${JSON.stringify(options)}`;
            }
            return key;
        }) as unknown as MockedFunction<TFunction>;
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('today', () => {
        it('returns a preset for today and compute today label', () => {
            const preset = FilterDateRangePresets.today();

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2026, 5, 15, 0, 0, 0));
            expect(result.end).toEqual(new Date(2026, 5, 15, 23, 59, 59, 999));
            expect(result.label).toBe('date.presetToday');
        });

        it('keeps provided label instead of generating one', () => {
            const preset = { ...FilterDateRangePresets.today(), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('tomorrow', () => {
        it('returns a preset for tomorrow and compute tomorrow label', () => {
            const preset = FilterDateRangePresets.tomorrow();

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2026, 5, 16, 0, 0, 0));
            expect(result.end).toEqual(new Date(2026, 5, 16, 23, 59, 59, 999));
            expect(result.label).toBe('date.presetTomorrow');
        });

        it('keeps provided label instead of generating one', () => {
            const preset = { ...FilterDateRangePresets.tomorrow(), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('past', () => {
        it('returns a preset with end representing now and compute past label', () => {
            const preset = FilterDateRangePresets.past();

            const result = computePreset(preset, t);

            expect(result.start).toBeUndefined();
            expect(result.end).toEqual(new Date(2026, 5, 15));
            expect(result.label).toBe('date.presetPast');
        });

        it('keeps provided label instead of generating one', () => {
            const preset = { ...FilterDateRangePresets.past(), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('upcoming', () => {
        it('returns a preset with start representing now and compute upcoming label', () => {
            const preset = FilterDateRangePresets.upcoming();

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2026, 5, 15));
            expect(result.end).toBeUndefined();
            expect(result.label).toBe('date.presetUpcoming');
        });

        it('keeps provided label instead of generating one', () => {
            const preset = { ...FilterDateRangePresets.upcoming(), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('yesterday', () => {
        it('returns a preset for yesterday and compute yesterday label', () => {
            const preset = FilterDateRangePresets.yesterday();

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2026, 5, 14, 0, 0, 0));
            expect(result.end).toEqual(new Date(2026, 5, 14, 23, 59, 59, 999));
            expect(result.label).toBe('date.presetYesterday');
        });

        it('keeps provided label instead of generating one', () => {
            const preset = { ...FilterDateRangePresets.yesterday(), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('lastDays', () => {
        it('returns relative days preset and compute last days label', () => {
            const preset = FilterDateRangePresets.lastDays(10);

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2026, 5, 5));
            expect(result.end).toEqual(new Date(2026, 5, 15));
            expect(result.label).toBe('date.presetLastDays:{"count":10}');
        });

        it('keeps provided label', () => {
            const preset = { ...FilterDateRangePresets.lastDays(10), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('lastWeeks', () => {
        it('returns relative weeks preset and compute last weeks label', () => {
            const preset = FilterDateRangePresets.lastWeeks(3);

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2026, 4, 25));
            expect(result.end).toEqual(new Date(2026, 5, 15));
            expect(result.label).toBe('date.presetLastWeeks:{"count":3}');
        });

        it('keeps provided label', () => {
            const preset = { ...FilterDateRangePresets.lastWeeks(3), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('lastMonths', () => {
        it('returns relative months preset and compute last months label', () => {
            const preset = FilterDateRangePresets.lastMonths(6);

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2025, 11, 15));
            expect(result.end).toEqual(new Date(2026, 5, 15));
            expect(result.label).toBe('date.presetLastMonths:{"count":6}');
        });

        it('keeps provided label', () => {
            const preset = { ...FilterDateRangePresets.lastMonths(6), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('lastYear', () => {
        it('returns preset for previous year and compute last year label', () => {
            const preset = FilterDateRangePresets.lastYear();

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2025, 0, 1));
            expect(result.end).toEqual(new Date(2025, 11, 31, 23, 59, 59, 999));
            expect(result.label).toBe('date.presetLastYear:{"year":2025}');
        });

        it('keeps provided label instead of generating one', () => {
            const preset = { ...FilterDateRangePresets.lastYear(), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('lastYears', () => {
        it('returns relative years preset and compute last years label', () => {
            const preset = FilterDateRangePresets.lastYears(5);

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2021, 5, 15));
            expect(result.end).toEqual(new Date(2026, 5, 15));
            expect(result.label).toBe('date.presetLastYears:{"count":5}');
        });

        it('keeps provided label', () => {
            const preset = { ...FilterDateRangePresets.lastYears(5), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('nextDays', () => {
        it('returns relative days preset and compute next days label', () => {
            const preset = FilterDateRangePresets.nextDays(4);

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2026, 5, 15));
            expect(result.end).toEqual(new Date(2026, 5, 19));
            expect(result.label).toBe('date.presetNextDays:{"count":4}');
        });

        it('keeps provided label', () => {
            const preset = { ...FilterDateRangePresets.nextDays(4), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('nextWeeks', () => {
        it('returns relative weeks preset and compute next weeks label', () => {
            const preset = FilterDateRangePresets.nextWeeks(2);

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2026, 5, 15));
            expect(result.end).toEqual(new Date(2026, 5, 29));
            expect(result.label).toBe('date.presetNextWeeks:{"count":2}');
        });

        it('keeps provided label', () => {
            const preset = { ...FilterDateRangePresets.nextWeeks(2), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('nextMonths', () => {
        it('returns relative months preset and compute next months label', () => {
            const preset = FilterDateRangePresets.nextMonths(12);

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2026, 5, 15));
            expect(result.end).toEqual(new Date(2027, 5, 15));
            expect(result.label).toBe('date.presetNextMonths:{"count":12}');
        });

        it('keeps provided label', () => {
            const preset = { ...FilterDateRangePresets.nextMonths(12), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('nextYear', () => {
        it('returns preset for next year and compute next year label', () => {
            const preset = FilterDateRangePresets.nextYear();

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2027, 0, 1));
            expect(result.end).toEqual(new Date(2027, 11, 31, 23, 59, 59, 999));
            expect(result.label).toBe('date.presetNextYear:{"year":2027}');
        });

        it('keeps provided label instead of generating one', () => {
            const preset = { ...FilterDateRangePresets.nextYear(), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('nextYears', () => {
        it('returns relative years preset and compute next years label', () => {
            const preset = FilterDateRangePresets.nextYears(2);

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2026, 5, 15));
            expect(result.end).toEqual(new Date(2028, 5, 15));
            expect(result.label).toBe('date.presetNextYears:{"count":2}');
        });

        it('keeps provided label', () => {
            const preset = { ...FilterDateRangePresets.nextYears(2), label: 'My Label' };

            const result = computePreset(preset, t);

            expect(result.label).toBe('My Label');
        });
    });

    describe('computePreset fallback', () => {
        it('should preserve and return pre-defined string labels on custom presets', () => {
            const preset = { start: new Date(2026, 5, 1), label: 'My Custom Label' };

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2026, 5, 1));
            expect(result.label).toBe('My Custom Label');
        });

        it('should assign a blank label on unmatched custom presets without label', () => {
            const preset = { start: new Date(2026, 4, 15) };

            const result = computePreset(preset, t);

            expect(result.start).toEqual(new Date(2026, 4, 15));
            expect(result.label).toBe('');
        });
    });
});
