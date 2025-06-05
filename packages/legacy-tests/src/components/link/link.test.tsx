import { act } from 'react-dom/test-utils';
import { Link as RouteLink, NavLink } from 'react-router-dom';
import { Link } from '~/components/link/link';
import { mountWithProviders } from '../../test-utils/renderer';

describe('Link Component', () => {
    describe('Features', () => {
        it('internal link is valid and updates dynamically ', () => {
            const wrapper = mountWithProviders(<Link href="/internal-page" />);

            expect(wrapper.find('a').prop('href')).toBe('/internal-page');
        });

        it('external link is valid', () => {
            const wrapper = mountWithProviders(<Link external href="https://example.com" />);

            expect(wrapper.find('a').prop('href')).toBe('https://example.com');
            expect(wrapper.find('a').prop('target')).toBe('_blank');
            expect(wrapper.find('a').prop('rel')).toContain('noopener noreferrer');
        });

        it('renders icon', () => {
            const wrapper = mountWithProviders(<Link icon={{ name: 'mail', label: 'This is a label' }}>Label</Link>);

            expect(wrapper.find('Icon').prop('name')).toBe('mail');
        });

        it('renders tooltip isIconOnly is provided', () => {
            const tooltipWrapper = mountWithProviders(<Link icon={{ name: 'mail', label: 'Test Label' }} />);

            expect(tooltipWrapper.find('Tooltip').prop('label')).toBe('Test Label');
            expect(tooltipWrapper.find('Icon').exists()).toBe(true);
        });

        it('renders children when provided', () => {
            const childrenWrapper = mountWithProviders(<Link><div className="test-child">Child Content</div></Link>);

            expect(childrenWrapper.contains(<div className="test-child">Child Content</div>)).toBe(true);
        });

        it('renders NavLink when routerLink prop is NavLink', () => {
            const wrapper = mountWithProviders(<Link routerLink={NavLink} href="/internal-page" />);

            expect(wrapper.find(NavLink).exists()).toBe(true);
            expect(wrapper.find(NavLink).prop('to')).toBe('/internal-page');
        });

        it('renders RouteLink when routerLink prop is RouteLink', () => {
            const routeLinkWrapper = mountWithProviders(<Link routerLink={RouteLink} href="/internal-route" />);

            expect(routeLinkWrapper.find(RouteLink).exists()).toBe(true);
            expect(routeLinkWrapper.find(NavLink).exists()).toBe(false);
            expect(routeLinkWrapper.find(RouteLink).prop('to')).toBe('/internal-route');
        });

        it('calls onClick callback when clicked', () => {
            const onClickMock = jest.fn();
            const wrapper = mountWithProviders(<Link href="/test" onClick={onClickMock} />);

            wrapper.find('a').simulate('click');

            expect(wrapper.find('a').prop('href')).toBeDefined();
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it('prevent onClick callback when disabled', () => {
            const onClickMock = jest.fn();
            const wrapper = mountWithProviders(<Link href="/test" onClick={onClickMock} />);

            wrapper.find('a').simulate('click');
            act(() => {
                wrapper.setProps({ disabled: true });
            });
            wrapper.find('a').simulate('click');

            expect(wrapper.find('a').prop('href')).toBeUndefined();
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it('updates dynamically ', () => {
            const wrapper = mountWithProviders(<Link href="/internal-page" />);

            act(() => {
                wrapper.setProps({ href: '/updated-page' });
                wrapper.setProps({ icon: { name: 'bell', label: 'This is a label' } });
            });

            expect(wrapper.find('a').prop('href')).toBe('/updated-page');
            expect(wrapper.find('Icon').prop('name')).toBe('bell');
        });
    });

    describe('Styling', () => {
        it('matches default snapshot', () => {
            const tree = mountWithProviders(<Link />);

            expect(tree).toMatchSnapshot();
        });

        it('matches with children snapshot', () => {
            const tree = mountWithProviders(
                <Link><span>Test</span></Link>,
            );

            expect(tree).toMatchSnapshot();
        });

        it('matches NavLink snapshot', () => {
            const tree = mountWithProviders(
                <Link routerLink={NavLink} href="/test">Navigation Link</Link>,
            );

            expect(tree).toMatchSnapshot();
        });

        it('matches RouteLink snapshot', () => {
            const tree = mountWithProviders(
                <Link routerLink={RouteLink} href="/test">Navigation Link</Link>,
            );

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Accessibility', () => {
        it('applies aria-disabled when link is disabled', () => {
            const wrapper = mountWithProviders(<Link disabled />);

            expect(wrapper.find('a').prop('aria-disabled')).toBe('true');
        });

        it('displays screen-reader-only text only when external && target="_blank"', () => {
            const wrapper = mountWithProviders(<Link external target='none' />);

            expect(wrapper.find('ScreenReaderOnlyText').exists()).toBe(false);

            act(() => {
                wrapper.setProps({ external: true, target: '_blank' });
            });

            expect(wrapper.find('ScreenReaderOnlyText').exists()).toBe(true);
            expect(wrapper.find('ScreenReaderOnlyText').text()).toContain('opens in a new tab');
        });
    });
});
