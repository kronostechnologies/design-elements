import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, NavLink } from 'react-router-dom';
import { renderWithProviders } from '../../test-utils/renderer';
import { RouteLink } from './route-link';

describe('Route Link', () => {
    it('matches snapshot (NavLink)', () => {
        const { container } = renderWithProviders(
            <RouteLink routerLink={NavLink} href="/test" label="Navigation Link" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (NavLink | label and icon)', () => {
        const { container } = renderWithProviders(
            <RouteLink routerLink={NavLink} href="/test" label="Navigation Link" iconName="mail" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (NavLink | only icon)', () => {
        const { container } = renderWithProviders(<RouteLink routerLink={NavLink} href="/test" iconName="mail" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (NavLink | disabled)', () => {
        const { container } = renderWithProviders(
            <RouteLink routerLink={NavLink} href="/test" label="Navigation Link" disabled />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (Link)', () => {
        const { container } = renderWithProviders(<RouteLink routerLink={Link} href="/test" label="Navigation Link" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (Link | label and icon)', () => {
        const { container } = renderWithProviders(
            <RouteLink routerLink={Link} href="/test" label="Navigation Link" iconName="mail" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (Link | only icon)', () => {
        const { container } = renderWithProviders(<RouteLink routerLink={Link} href="/test" iconName="mail" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (Link | disabled)', () => {
        const { container } = renderWithProviders(
            <RouteLink routerLink={Link} href="/test" label="Navigation Link" disabled />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('calls onClick callback when clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(
            <RouteLink
                routerLink={NavLink}
                href="/test"
                label="Navigation Link"
                onClick={callback}
            />,
        );

        await user.click(screen.getByRole('link', { name: 'Navigation Link' }));

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
