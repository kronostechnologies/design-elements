import { ReactWrapper } from 'enzyme';
import { ReactElement } from 'react';
import { mountWithProviders } from '../../test-utils/renderer';
import { Filter } from './filter';
import { Option } from './filter-option';
import { FilterType } from './types';
import { useFilters } from './use-filters';

type Data = { name: string };

const allOption = { label: 'all', value: 'all' };
const bananaOption = { label: 'banana', value: 'banana' };
const kiwiOption = { label: 'kiwi', value: 'kiwi' };
const strawberryOption = { label: 'strawberry', value: 'strawberry' };

const TestFilter = (): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: FilterType<Data, any> = {
        key: 'fruits',
        label: 'Fruits',
        options: [
            allOption,
            bananaOption,
            kiwiOption,
            strawberryOption,
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
};

function findDisclosureButton(wrapper: ReactWrapper, text: string): ReactWrapper {
    return wrapper.findWhere(
        (node) => node.type() === 'button' && node.text().includes(text),
    );
}

function findFilterOptionButton(
    wrapper: ReactWrapper,
    optionValue: string,
): ReactWrapper {
    return wrapper.findWhere(
        (node) => node.type() === 'button' && node.text().includes(optionValue),
    );
}

describe('Filter', () => {
    describe('Filter Component', () => {
        it('renders in collapsed state', () => {
            const wrapper = mountWithProviders(<TestFilter />);

            const disclosureButton = findDisclosureButton(wrapper, 'Fruits : all');

            expect(disclosureButton.exists()).toBe(true);
            expect(wrapper.find('StyledOption').exists()).toBe(false); // Options are not visible in collapsed state
        });

        it('opens the filter and displays all options', () => {
            const wrapper = mountWithProviders(<TestFilter />);
            const disclosureButton = findDisclosureButton(wrapper, 'Fruits : all');

            disclosureButton.simulate('click');

            expect(wrapper.find(Option).length).toBe(4);
            expect(findFilterOptionButton(wrapper, bananaOption.value).exists()).toBe(true);
            expect(findFilterOptionButton(wrapper, kiwiOption.value).exists()).toBe(true);
            expect(findFilterOptionButton(wrapper, strawberryOption.value).exists()).toBe(true);
        });

        it('opens the filter and selects an option', () => {
            const wrapper = mountWithProviders(<TestFilter />);
            const disclosureButton = findDisclosureButton(wrapper, 'Fruits : all');
            disclosureButton.simulate('click');

            const bananaOptionButton = findFilterOptionButton(wrapper, 'banana');
            bananaOptionButton.simulate('click');

            const updatedDisclosureButton = findDisclosureButton(
                wrapper,
                'Fruits : banana',
            );
            expect(updatedDisclosureButton.exists()).toBe(true);
        });
    });
});
