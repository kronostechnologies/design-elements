import { shallow } from 'enzyme';
import { Link, NavLink } from 'react-router-dom';
import { renderWithProviders } from '../../test-utils/renderer';
import { RouteLink } from './route-link';

describe('Route Link', () => {
    it('calls onClick callback when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(
            <RouteLink
                routerLink={NavLink}
                href="/test"
                label="Navigation Link"
                onClick={callback}
            />,
        );

        wrapper.simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('matches snapshot (NavLink)', () => {
        const tree = renderWithProviders(<RouteLink routerLink={NavLink} href="/test" label="Navigation Link" />);

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (NavLink | label and icon)', () => {
        const tree = renderWithProviders(
            <RouteLink routerLink={NavLink} href="/test" label="Navigation Link" iconName="mail" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (NavLink | only icon)', () => {
        const tree = renderWithProviders(<RouteLink routerLink={NavLink} href="/test" iconName="mail" />);

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (NavLink | disabled)', () => {
        const tree = renderWithProviders(
            <RouteLink routerLink={NavLink} href="/test" label="Navigation Link" disabled />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (Link)', () => {
        const tree = renderWithProviders(<RouteLink routerLink={Link} href="/test" label="Navigation Link" />);

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (Link | label and icon)', () => {
        const tree = renderWithProviders(
            <RouteLink routerLink={Link} href="/test" label="Navigation Link" iconName="mail" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (Link | only icon)', () => {
        const tree = renderWithProviders(<RouteLink routerLink={Link} href="/test" iconName="mail" />);

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (Link | disabled)', () => {
        const tree = renderWithProviders(<RouteLink routerLink={Link} href="/test" label="Navigation Link" disabled />);

        expect(tree).toMatchSnapshot();
    });
});
