import { mount } from 'enzyme';
import { FunctionComponent } from 'react';
import { act } from 'react-dom/test-utils';
import { filterData } from './filter-data';
import { FilterType } from './types';
import { useFilters } from './use-filters';

jest.mock('./filter-data');

type Data = { name: string };

const bananaValue = 'banana';
const kiwiValue = 'kiwi';
const strawberryValue = 'strawberry';

const mockData: Data[] = [
    { name: bananaValue },
    { name: kiwiValue },
    { name: strawberryValue },
];

const mockFilters = [
    {
        key: 'fruits',
        label: 'Fruits',
        defaultOption: 'all',
        options: [
            { label: 'All', value: 'all' },
            { label: 'Banana', value: bananaValue },
            { label: 'Kiwi', value: kiwiValue },
        ],
        filter: (row: Data, option: unknown) => row.name === option || option === 'all',
    },
];

type TestComponentProps = { data: Data[]; filters: FilterType<Data, unknown>[] };
const TestComponent: FunctionComponent<TestComponentProps> = ({ data, filters }: TestComponentProps) => {
    const { filteredData, onFilterChange } = useFilters<Data>(data, filters);

    return (
        <div>
            <ul>
                {filteredData.map((item) => (
                    <li key={item.name}>{item.name}</li>
                ))}
            </ul>
            <button
                type='button'
                onClick={() => onFilterChange('fruits', bananaValue)}
                data-testid="change-filter"
            >
                Change to Banana
            </button>
        </div>
    );
};

describe('useFilters Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('initially calls filterData with default filters', () => {
        jest.mocked(filterData).mockReturnValue(mockData);

        mount(
            <TestComponent data={mockData} filters={mockFilters} />,
        );

        expect(filterData).toHaveBeenCalledWith({
            data: mockData,
            filters: mockFilters,
            filterOptions: { fruits: 'all' },
        });
    });

    it('initially renders all data', () => {
        jest.mocked(filterData).mockReturnValue(mockData);

        const wrapper = mount(
            <TestComponent data={mockData} filters={mockFilters} />,
        );

        const listItems = wrapper.find('li');

        expect(listItems.length).toBe(3);
        expect(listItems.at(0).text()).toBe(bananaValue);
        expect(listItems.at(1).text()).toBe(kiwiValue);
        expect(listItems.at(2).text()).toBe(strawberryValue);
    });

    it('calls filterData when onFilterChange is called', () => {
        const filteredResult = [{ name: bananaValue }];
        jest.mocked(filterData).mockReturnValue(filteredResult);
        const wrapper = mount(
            <TestComponent data={mockData} filters={mockFilters} />,
        );

        act(() => {
            wrapper.find('button[data-testid="change-filter"]').simulate('click');
        });
        wrapper.update();

        expect(filterData).toHaveBeenCalledWith({
            data: mockData,
            filters: mockFilters,
            filterOptions: { fruits: bananaValue },
        });
    });

    it('updates filteredData when onFilterChange is called', () => {
        const filteredResult = [{ name: bananaValue }];
        jest.mocked(filterData).mockReturnValue(filteredResult);
        const wrapper = mount(
            <TestComponent data={mockData} filters={mockFilters} />,
        );

        act(() => {
            wrapper.find('button[data-testid="change-filter"]').simulate('click');
        });
        wrapper.update();

        const listItems = wrapper.find('li');
        expect(listItems.length).toBe(1);
        expect(listItems.at(0).text()).toBe(bananaValue);
    });
});
