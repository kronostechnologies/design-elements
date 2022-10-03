import { shallow } from 'enzyme';
import { getByTestId } from '../../../test-utils/enzyme-selectors';
import { breakpoints } from '../../../tokens/breakpoints';
import { DesignSystem } from '../../design-system';
import { NavItem, StyledNavItem } from './nav-item';

describe('NavItem', () => {
    it('displays screen-reader-only text when router link opens in a new tab (target="_blank")', () => {
        const wrapper = shallow(<NavItem value="test" href="test" target="_blank" />);

        expect(getByTestId(wrapper, 'screen-reader-text').exists()).toBe(true);
    });

    it('displays screen-reader-only text when html link opens in a new tab (target="_blank")', () => {
        const wrapper = shallow(<NavItem value="test" isHtmlLink href="test" target="_blank" />);

        expect(getByTestId(wrapper, 'screen-reader-text').exists()).toBe(true);
    });

    it('styled nav item has access to NavLinkProps', () => {
        shallow(
            <DesignSystem>
                <StyledNavItem
                    $device={{
                        device: 'desktop',
                        isDesktop: true,
                        isTablet: false,
                        isMobile: false,
                        breakpoints,
                    }}
                    to="some-route"
                    title="some title"
                    exact
                    isActive={() => true}
                />
            </DesignSystem>,
        );
    });
});
