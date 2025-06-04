import { Link, NavLink } from 'react-router-dom';
import { renderWithProviders } from '../../test-utils/renderer';
import { RouteLink } from './route-link';

describe('Route Link', () => {
    test('matches snapshot (NavLink)', () => {
        const { container } = renderWithProviders(
            <RouteLink routerLink={NavLink} href="/test" label="Navigation Link" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (NavLink | label and icon)', () => {
        const { container } = renderWithProviders(
            <RouteLink routerLink={NavLink} href="/test" label="Navigation Link" iconName="mail" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (NavLink | only icon)', () => {
        const { container } = renderWithProviders(<RouteLink routerLink={NavLink} href="/test" iconName="mail" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (NavLink | disabled)', () => {
        const { container } = renderWithProviders(
            <RouteLink routerLink={NavLink} href="/test" label="Navigation Link" disabled />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (Link)', () => {
        const { container } = renderWithProviders(<RouteLink routerLink={Link} href="/test" label="Navigation Link" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (Link | label and icon)', () => {
        const { container } = renderWithProviders(
            <RouteLink routerLink={Link} href="/test" label="Navigation Link" iconName="mail" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (Link | only icon)', () => {
        const { container } = renderWithProviders(<RouteLink routerLink={Link} href="/test" iconName="mail" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (Link | disabled)', () => {
        const { container } = renderWithProviders(
            <RouteLink routerLink={Link} href="/test" label="Navigation Link" disabled />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
