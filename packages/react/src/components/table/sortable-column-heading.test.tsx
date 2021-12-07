import { Column } from 'react-table';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme } from '../../test-utils/renderer';
import { SortableColumnHeading } from './sortable-column-heading';

function givenAColumn(): Column {
    return {
        accessor: 'something',
        getHeaderProps: jest.fn(),
        getSortByToggleProps: jest.fn(),
        render: (field: string) => field,
    };
}

describe('SortableColumnHeading', () => {
    it('should display no sort by default', () => {
        const column: Column = givenAColumn();
        const wrapper = mountWithTheme(<SortableColumnHeading column={column} />);

        const sortIcon = getByTestId(wrapper, 'sort-icon');
        expect(sortIcon.prop('sort')).toBe('none');
    });

    it('should display descending when column is sorted descending', () => {
        const column: Column = givenAColumn();
        const wrapper = mountWithTheme(<SortableColumnHeading column={column} />);

        // This is a bit weird for a React test, but this is what replicates the bug that happened in a browser
        column.isSorted = true;
        column.isSortedDesc = true;
        wrapper.setProps({ column });

        const sortIcon = getByTestId(wrapper, 'sort-icon');
        expect(sortIcon.prop('sort')).toBe('descending');
    });

    it('should display ascending when column is sorted ascending', () => {
        const column: Column = givenAColumn();
        const wrapper = mountWithTheme(<SortableColumnHeading column={column} />);

        column.isSorted = true;
        column.isSortedDesc = false;
        wrapper.setProps({ column });

        const sortIcon = getByTestId(wrapper, 'sort-icon');
        expect(sortIcon.prop('sort')).toBe('ascending');
    });
});
