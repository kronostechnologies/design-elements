import { HeaderGroup } from 'react-table';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme } from '../../test-utils/renderer';
import { SortableColumnHeading } from './sortable-column-heading';

function cast<T>(value: Partial<T>): T {
    return value as T;
}

function givenAHeader(): HeaderGroup {
    return cast<HeaderGroup>({
        accessor: 'something',
        getHeaderProps: jest.fn(),
        getSortByToggleProps: jest.fn(),
        render: (field: string) => field,
    });
}

describe('SortableColumnHeading', () => {
    it('should display no sort by default', () => {
        const header: HeaderGroup = givenAHeader();
        const wrapper = mountWithTheme(<SortableColumnHeading header={header} />);

        const sortIcon = getByTestId(wrapper, 'sort-icon');
        expect(sortIcon.prop('sort')).toBe('none');
    });

    it('should display descending when column is sorted descending', () => {
        const header: HeaderGroup = givenAHeader();
        const wrapper = mountWithTheme(<SortableColumnHeading header={header} />);

        // This is a bit weird for a React test, but this is what replicates the bug that happened in a browser
        header.isSorted = true;
        header.isSortedDesc = true;
        wrapper.setProps({ header });

        const sortIcon = getByTestId(wrapper, 'sort-icon');
        expect(sortIcon.prop('sort')).toBe('descending');
    });

    it('should display ascending when column is sorted ascending', () => {
        const header: HeaderGroup = givenAHeader();
        const wrapper = mountWithTheme(<SortableColumnHeading header={header} />);

        header.isSorted = true;
        header.isSortedDesc = false;
        wrapper.setProps({ header });

        const sortIcon = getByTestId(wrapper, 'sort-icon');
        expect(sortIcon.prop('sort')).toBe('ascending');
    });
});
