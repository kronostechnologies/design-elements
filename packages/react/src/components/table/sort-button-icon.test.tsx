import { shallow } from 'enzyme';
import { useTheme } from '../../hooks/use-theme';
import { SortButtonIcon } from './sort-button-icon';
import { buildTheme, equisoftThemeCustomization } from '../../themes';

jest.mock('../../hooks/use-theme');

const equisoftTheme = buildTheme(equisoftThemeCustomization);

describe('SortButtonIcon', () => {
    beforeEach(() => {
        jest.mocked(useTheme).mockReturnValue(equisoftTheme);
    });

    it('should display arrow up when sort is ascending', () => {
        const wrapper = shallow(<SortButtonIcon sort="ascending" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should display arrow down when sort is descending', () => {
        const wrapper = shallow(<SortButtonIcon sort="descending" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should display reorder when no sort', () => {
        const wrapper = shallow(<SortButtonIcon sort="none" />);

        expect(wrapper).toMatchSnapshot();
    });
});
