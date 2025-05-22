import { filterData } from './filter-data';
import { FilterType } from './types';

export interface TestData {
    a: number;
    b: string;
}

export const firstFilterDefaultOption = {
    label: '1Label',
    value: 1,
};

export const firstFilterOtherOption = {
    label: '2Label',
    value: 2,
};

export const firstFilter: FilterType<TestData, number> = {
    key: 'a',
    label: 'a',
    options: [firstFilterDefaultOption, firstFilterOtherOption],
    defaultOption: 1,
    filter(row: TestData, option: number) {
        return row.a === option;
    },
};

export const secondFilterOtherOption = {
    label: 'secondLabel',
    value: 'second',
};

export const secondFilterDefaultOption = {
    label: 'firstLabel',
    value: 'first',
};

export const secondFilter: FilterType<TestData, string> = {
    key: 'b',
    label: 'b',
    options: [secondFilterDefaultOption, secondFilterOtherOption],
    defaultOption: 'first',
    filter(row: TestData, option: string) {
        return row.b === option;
    },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filters: FilterType<TestData, any>[] = [firstFilter, secondFilter];

describe('filterData', () => {
    const bFilterFn = jest.fn();
    const aFilterFn = jest.fn();

    const mockFilters = [
        { ...firstFilter, filter: aFilterFn },
        { ...secondFilter, filter: bFilterFn },
    ];

    it('all filter functions return true for row should return row', () => {
        aFilterFn.mockReturnValue(true);
        bFilterFn.mockReturnValue(true);
        const row: TestData = { a: 1, b: 'first' };
        const filterOptions = { a: 1, b: 'first' };

        const filteredData = filterData<TestData>({
            data: [row],
            filters: mockFilters,
            filterOptions,
        });

        expect(filteredData).toEqual(expect.arrayContaining([row]));
    });

    it('one filter function return false for row should not return row', () => {
        aFilterFn.mockReturnValue(false);
        bFilterFn.mockReturnValue(true);
        const row: TestData = { a: 1, b: 'second' };
        const filterOptions = { a: 1, b: 'first' };

        const filteredData = filterData({
            data: [row],
            filters: mockFilters,
            filterOptions,
        });

        expect(filteredData).toEqual(expect.not.arrayContaining([row]));
    });

    it('all filter functions return false for row should not return row', () => {
        aFilterFn.mockReturnValue(false);
        bFilterFn.mockReturnValue(false);
        const row: TestData = { a: 1, b: 'first' };
        const filterOptions = {
            a: 2,
            b: 'second',
        };

        const filteredData = filterData({
            data: [row],
            filters: mockFilters,
            filterOptions,
        });

        expect(filteredData).toEqual(expect.not.arrayContaining([row]));
    });
});
