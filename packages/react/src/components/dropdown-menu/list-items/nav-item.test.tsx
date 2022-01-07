import { shallow } from 'enzyme';
import { getByTestId } from '../../../test-utils/enzyme-selectors';
import { NavItem } from './nav-item';

describe('NavItem', () => {
    it('displays screen-reader-only text when router link opens in a new tab (target="_blank")', () => {
        const wrapper = shallow(<NavItem value="test" href="test" target="_blank" />);

        expect(getByTestId(wrapper, 'screen-reader-text').exists()).toBe(true);
    });

    it('displays screen-reader-only text when html link opens in a new tab (target="_blank")', () => {
        const wrapper = shallow(<NavItem value="test" isHtmlLink href="test" target="_blank" />);

        expect(getByTestId(wrapper, 'screen-reader-text').exists()).toBe(true);
    });
});
