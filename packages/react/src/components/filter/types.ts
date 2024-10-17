export interface FilterOption<O> {
    label: string,
    value: O,
}

export type FilterMode = 'single-select';

export interface FilterType<T, O> {
    key: string;
    label: string;
    options: FilterOption<O>[];
    defaultOption: O;
    // eslint-disable-next-line react/no-unused-prop-types
    filter: (row: T, option: O) => boolean;
}

export type SelectedFilters = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [id: string]: any;
};
