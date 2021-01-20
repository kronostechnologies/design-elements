import { render } from 'enzyme';
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
    test('matches snapshot (NavLink)', () => {
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={NavLink} href="/test" label="Navigation Link" />),
        );

        expect(tree).toMatchSnapshot();
    });
    test('with icon matches snapshot (NavLink)', () => {
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={NavLink} href="/test" label="Navigation Link" iconName="mail" />),
        );

        expect(tree).toMatchSnapshot();
    });
    test('only icon matches snapshot (NavLink)', () => {
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={NavLink} href="/test" iconName="mail" />),
        );

        expect(tree).toMatchSnapshot();
    });
    test('disabled matches snapshot (NavLink)', () => {
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
    test('with icon matches snapshot (Link)', () => {
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={Link} href="/test" label="Navigation Link" iconName="mail" />),
        );

        expect(tree).toMatchSnapshot();
    });
    test('only icon matches snapshot (Link)', () => {
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={Link} href="/test" iconName="mail" />),
        );

        expect(tree).toMatchSnapshot();
    });
    test('disabled matches snapshot (Link)', () => {
        const tree = renderWithRouter(
            ThemeWrapped(<RouteLink routerLink={Link} href="/test" label="Navigation Link" disabled />),
        );

        expect(tree).toMatchSnapshot();
    });
});
