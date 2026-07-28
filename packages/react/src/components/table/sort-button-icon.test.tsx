import { renderWithProviders } from '../../test-utils/renderer';
import { SortButtonIcon } from './sort-button-icon';

describe('SortButtonIcon', () => {
    it('should display arrow up when sort is ascending', () => {
        const { asFragment } = renderWithProviders(<SortButtonIcon sort="ascending" />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('should display arrow down when sort is descending', () => {
        const { asFragment } = renderWithProviders(<SortButtonIcon sort="descending" />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('should display reorder when no sort', () => {
        const { asFragment } = renderWithProviders(<SortButtonIcon sort="none" />);

        expect(asFragment()).toMatchSnapshot();
    });
});
