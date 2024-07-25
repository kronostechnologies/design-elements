import { Link as RouteLink, NavLink } from 'react-router-dom';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { Link } from './link.component';

describe('Link Component', () => {
    describe('Features', () => {
        it('internal link changes location without reloading the page', () => {
            const internalLinkWrapper = mountWithProviders(<Link routerLink={NavLink} href="/internal-page" />);
            expect(internalLinkWrapper.find(NavLink).prop('to')).toBe('/internal-page');
        });

        it('internal link navigates correctly when routerLink is undefined', () => {
            const internalLinkWrapper = mountWithProviders(<Link href="/internal-page" />);
            // Verify that an <a> tag is rendered with the correct href attribute
            expect(internalLinkWrapper.find('a').prop('href')).toBe('/internal-page');
        });

        it('external link opens in a new tab', () => {
            const externalLinkWrapper = mountWithProviders(<Link external href="https://example.com" />);
            expect(externalLinkWrapper.find('a').prop('target')).toBe('_blank');
            expect(externalLinkWrapper.find('a').prop('rel')).toContain('noopener noreferrer');
        });

        it('prevents click when disabled', () => {
            const onClickMock = jest.fn();
            const disabledLinkWrapper = mountWithProviders(<Link disabled onClick={onClickMock} />);
            disabledLinkWrapper.find('a').simulate('click');
            expect(onClickMock).not.toHaveBeenCalled();
        });

        it('renders tooltip when isIconOnly and label is provided', () => {
            const tooltipWrapper = mountWithProviders(<Link iconName="mail" iconOnly label="Test Label" />);
            expect(tooltipWrapper.find('Tooltip').prop('label')).toBe('Test Label');
            expect(tooltipWrapper.find('Icon').exists()).toBe(true);
        });

        it('renders children when provided', () => {
            const childrenWrapper = mountWithProviders(<Link><div className="test-child">Child Content</div></Link>);
            expect(childrenWrapper.contains(<div className="test-child">Child Content</div>)).toBe(true);
        });

        it('overrides children when label provided', () => {
            const overrideWrapper = mountWithProviders(<Link label="Label Content"><div>Child Content</div></Link>);
            expect(overrideWrapper.text()).toContain('Label Content');
            expect(overrideWrapper.contains(<div>Child Content</div>)).toBe(false);
        });

        it('renders RouteLink when routerLink prop is RouteLink', () => {
            const routeLinkWrapper = mountWithProviders(<Link routerLink={RouteLink} href="/internal-route" />);
            expect(routeLinkWrapper.find(RouteLink).exists()).toBe(true);
            expect(routeLinkWrapper.find(NavLink).exists()).toBe(false);
            expect(routeLinkWrapper.find(RouteLink).prop('to')).toBe('/internal-route');
        });

        it('calls onClick callback when clicked', () => {
            const callback = jest.fn();
            const wrapper = mountWithProviders(
                <Link
                    routerLink={NavLink}
                    href="/test"
                    label="Navigation Link"
                    onClick={callback}
                />,
            );

            wrapper.simulate('click');

            expect(callback).toHaveBeenCalledTimes(1);
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
                    label="Navigation Link"
                    iconName="mail"
                />,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches icon only snapshot', () => {
            const tree = renderWithProviders(
                <Link
                    iconOnly
                    iconName="mail"
                    label="Navigation Link"
                />,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches external link snapshot', () => {
            const tree = renderWithProviders(
                <Link
                    href="/test"
                    label="Navigation Link"
                    disabled
                    external
                />,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches button link snapshot', () => {
            const tree = renderWithProviders(
                <Link
                    routerLink={NavLink}
                    href="/test"
                    label="Navigation Link"
                    disabled
                    buttonProps={{
                        buttonType: 'secondary',
                    }}
                />,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches disabled snapshot', () => {
            const tree = renderWithProviders(
                <Link
                    href="/test"
                    label="Navigation Link"
                    disabled
                />,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches NavLink snapshot', () => {
            const tree = mountWithProviders(
                <Link
                    routerLink={NavLink}
                    href="/test"
                    label="Navigation Link"
                />,
            );

            expect(tree).toMatchSnapshot();
        });

        test('matches RouteLink snapshot', () => {
            const tree = mountWithProviders(
                <Link
                    routerLink={RouteLink}
                    href="/test"
                    label="Navigation Link"
                />,
            );

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Accessibility', () => {
        it('applies aria-disabled when link is disabled', () => {
            const wrapper = mountWithProviders(<Link disabled />);
            expect(wrapper.find('a').prop('aria-disabled')).toBe('true');
        });

        it('displays screen-reader-only text when external && target="_blank"', () => {
            const wrapper = mountWithProviders(<Link external />);
            expect(wrapper.find('ScreenReaderOnlyText').exists()).toBe(true);
            expect(wrapper.find('ScreenReaderOnlyText').text()).toContain('opens in a new tab');
        });
    });
});
