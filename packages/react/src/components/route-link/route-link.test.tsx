import { shallow, render } from 'enzyme';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { RouteLink } from './route-link';

function renderWithRouter(children: ReactElement): cheerio.Cheerio {
    return render(
        <Router>
            {children}
        </Router>,
    );
}

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
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={NavLink} href="/test" label="Navigation Link" />),
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (NavLink | label and icon)', () => {
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={NavLink} href="/test" label="Navigation Link" iconName="mail" />),
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (NavLink | only icon)', () => {
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={NavLink} href="/test" iconName="mail" />),
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (NavLink | disabled)', () => {
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={NavLink} href="/test" label="Navigation Link" disabled />),
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (Link)', () => {
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={Link} href="/test" label="Navigation Link" />),
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (Link | label and icon)', () => {
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={Link} href="/test" label="Navigation Link" iconName="mail" />),
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (Link | only icon)', () => {
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={Link} href="/test" iconName="mail" />),
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (Link | disabled)', () => {
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={Link} href="/test" label="Navigation Link" disabled />),
        );

        expect(tree).toMatchSnapshot();
    });
});
