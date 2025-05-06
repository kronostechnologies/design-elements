import { Meta, StoryObj } from '@storybook/react';
import { Filter, FilterType, useFilters } from '@equisoft/design-elements-react';
import { rawCodeParameters } from './utils/parameters';

const filterMeta: Meta<typeof Filter> = {
    title: 'Components/Filter',
    component: Filter,
    parameters: rawCodeParameters,
};

export default filterMeta;

type Story = StoryObj<typeof Filter>;

type Data = { name: string };

export const Default: Story = {
    render: () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: FilterType<Data, any> = {
            key: 'fruits',
            label: 'Fruits',
            options: [
                { label: 'all', value: 'all' },
                { label: 'banana', value: 'banana' },
                { label: 'kiwi', value: 'kiwi' },
                { label: 'strawberry', value: 'strawberry' },
            ],
            defaultOption: 'all',
            filter: (row: Data, option: string) => row.name === option || option === 'all',
        };

        const data: Data[] = [
            { name: 'banana' },
            { name: 'kiwi' },
            { name: 'strawberry' },
        ];

        const {
            onFilterChange,
            filteredData,
        } = useFilters<Data>(data, [filter]);

        return (
            <>
                <Filter
                    mode='single-select'
                    filter={filter}
                    onFilterChange={onFilterChange}
                />
                <ul>
                    {filteredData.map((row) => <li>{row.name}</li>)}
                </ul>
            </>
        );
    },
};
