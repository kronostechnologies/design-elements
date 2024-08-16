import { act } from 'react-dom/test-utils';
import { Link as RouteLink, NavLink } from 'react-router-dom';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { Link } from './link';

describe('Link Component', () => {
    describe('Features', () => {
        it('internal link is valid and updates dynamically ', () => {
            const wrapper = mountWithProviders(<Link href="/internal-page" />);
            // Verify that an <a> tag is rendered with the correct href attribute
            expect(wrapper.find('a').prop('href')).toBe('/internal-page');

            act(() => {
                wrapper.setProps({ href: '/updated-page' });
            });

            expect(wrapper.find('a').prop('href')).toBe('/updated-page');
        });

        it('internal link with routerLink is valid', () => {
            const wrapper = mountWithProviders(<Link routerLink={NavLink} href="/internal-page" />);
            expect(wrapper.find(NavLink).prop('to')).toBe('/internal-page');
        });

        it('external link is valid and updates dynamically', () => {
            const wrapper = mountWithProviders(<Link external href="https://example.com" />);
            expect(wrapper.find('a').prop('href')).toBe('https://example.com');
            expect(wrapper.find('a').prop('target')).toBe('_blank');
            expect(wrapper.find('a').prop('rel')).toContain('noopener noreferrer');

            act(() => {
                wrapper.setProps({ href: 'https://google.com' });
            });

            expect(wrapper.find('a').prop('href')).toBe('https://google.com');
        });

        it('calls or prevent onClick callback when clicked based on disabled state', () => {
            const onClickMock = jest.fn();
            const wrapper = mountWithProviders(<Link href="/test" onClick={onClickMock} />);

            // Initially, the link is clickable
            wrapper.find('a').simulate('click');
            expect(wrapper.find('a').prop('href')).toBeDefined();
            expect(onClickMock).toHaveBeenCalledTimes(1);

            act(() => {
                wrapper.setProps({ disabled: true });
            });

            wrapper.find('a').simulate('click');
            expect(wrapper.find('a').prop('href')).toBeUndefined();
            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it('renders icon and updates dynamically', () => {
            const wrapper = mountWithProviders(<Link icon={{ name: 'mail', label: 'This is a label' }}>Label</Link>);
            expect(wrapper.find('Icon').prop('name')).toBe('mail');

            act(() => {
                wrapper.setProps({ icon: { name: 'bell', label: 'This is a label' } });
            });

            expect(wrapper.find('Icon').prop('name')).toBe('bell');
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

        // it('overrides children when label provided and updates dynamically', () => {
        //     const wrapper = mountWithProviders(<Link label="Label Content"><div>Child Content</div></Link>);
        //     expect(wrapper.text()).toContain('Label Content');
        //     expect(wrapper.contains(<div>Child Content</div>)).toBe(false);
        //
        //     act(() => {
        //         wrapper.setProps({ label: 'Updated Label' });
        //     });
        //
        //     expect(wrapper.text()).toContain('Updated Label');
        //     expect(wrapper.contains(<div>Child Content</div>)).toBe(false);
        // });

        it('renders RouteLink when routerLink prop is RouteLink', () => {
            const routeLinkWrapper = mountWithProviders(<Link routerLink={RouteLink} href="/internal-route" />);
            expect(routeLinkWrapper.find(RouteLink).exists()).toBe(true);
            expect(routeLinkWrapper.find(NavLink).exists()).toBe(false);
            expect(routeLinkWrapper.find(RouteLink).prop('to')).toBe('/internal-route');
        });
    });

    describe('Styling', () => {
        test('matches default snapshot', () => {
            const tree = mountWithProviders(<Link />);
            expect(tree).toMatchSnapshot();
        });

        test('matches with children snapshot', () => {
            const tree = mountWithProviders(
                <Link><span>Test</span></Link>,
            );
            expect(tree).toMatchSnapshot();
        });

        test('matches icon and label snapshot', () => {
            const tree = renderWithProviders(
                <Link
                    href="/test"
                    icon={{ name: 'mail', label: 'This is a label' }}
                >
                    Navigation Link
                </Link>,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches icon only snapshot', () => {
            const tree = renderWithProviders(
                <Link icon={{ name: 'mail', label: 'Navigation Link' }} />,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches external link snapshot', () => {
            const tree = renderWithProviders(
                <Link href="/test" external>Navigation Link</Link>,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches button link snapshot', () => {
            const tree = renderWithProviders(
                <Link
                    routerLink={NavLink}
                    href="/test"
                    button={{
                        buttonType: 'secondary',
                    }}
                >
                    Navigation Link
                </Link>,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches disabled snapshot', () => {
            const tree = renderWithProviders(
                <Link href="/test" disabled>
                    Navigation Link
                </Link>,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches NavLink snapshot', () => {
            const tree = mountWithProviders(
                <Link routerLink={NavLink} href="/test">Navigation Link</Link>,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches RouteLink snapshot', () => {
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
            const wrapper = mountWithProviders(<Link />);
            expect(wrapper.find('ScreenReaderOnlyText').exists()).toBe(false);

            act(() => {
                wrapper.setProps({ external: true, target: 'none' });
            });

            expect(wrapper.find('ScreenReaderOnlyText').exists()).toBe(false);

            act(() => {
                wrapper.setProps({ external: true, target: '_blank' });
            });

            expect(wrapper.find('ScreenReaderOnlyText').exists()).toBe(true);
            expect(wrapper.find('ScreenReaderOnlyText').text()).toContain('opens in a new tab');
        });
    });
});
