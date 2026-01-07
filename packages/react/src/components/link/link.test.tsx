import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link as RouteLink, NavLink } from 'react-router-dom';
import { renderWithProviders } from '../../test-utils/renderer';
import { Link } from './link';

describe('Link Component', () => {
    describe('Features', () => {
        it('internal link is valid and updates dynamically', () => {
            const { rerender } = renderWithProviders(<Link href="/internal-page" />);
            const link = screen.getByRole('link');
            expect(link).toHaveAttribute('href', '/internal-page');

            rerender(<Link href="/updated-page" />);

            expect(link).toHaveAttribute('href', '/updated-page');
        });

        it('external link is valid', () => {
            renderWithProviders(<Link external href="https://example.com" />);
            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('href', 'https://example.com');
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', expect.stringContaining('noopener noreferrer'));
        });

        it('renders icon', () => {
            renderWithProviders(<Link icon={{ name: 'mail', label: 'This is a label' }}>Label</Link>);

            expect(screen.getByTestId('link-icon')).toBeInTheDocument();
        });

        it('renders tooltip if isIconOnly is provided', () => {
            renderWithProviders(<Link icon={{ name: 'mail', label: 'Test Label' }} />);

            expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'Test Label');
            expect(screen.getByTestId('link-icon')).toBeInTheDocument();
        });

        it('renders children when provided', () => {
            renderWithProviders(
                <Link>
                    <div>Child Content</div>
                </Link>,
            );

            expect(screen.getByText('Child Content')).toBeInTheDocument();
        });

        it('renders NavLink when routerLink prop is NavLink', () => {
            renderWithProviders(<Link routerLink={NavLink} href="/internal-page" />);

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('href', '/internal-page');
        });

        it('renders RouteLink when routerLink prop is RouteLink', () => {
            renderWithProviders(<Link routerLink={RouteLink} href="/internal-route" />);

            const link = screen.getByRole('link');

            expect(link).toHaveAttribute('href', '/internal-route');
        });

        it('calls onClick callback when clicked', async () => {
            const user = userEvent.setup();
            const onClickMock = jest.fn();
            renderWithProviders(<Link href="/test" onClick={onClickMock} />);

            await user.click(screen.getByRole('link'));

            expect(onClickMock).toHaveBeenCalledTimes(1);
        });

        it('prevent onClick callback when disabled', async () => {
            const user = userEvent.setup();
            const onClickMock = jest.fn();
            const { rerender } = renderWithProviders(<Link href="/test" onClick={onClickMock} />);

            await user.click(screen.getByRole('link'));
            expect(onClickMock).toHaveBeenCalledTimes(1);

            rerender(<Link href="/test" onClick={onClickMock} disabled />);

            const disabledLink = screen.getByTestId('link');
            expect(disabledLink).toHaveAttribute('aria-disabled', 'true');

            await expect(user.click(disabledLink)).toReject();

            expect(onClickMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('Styling', () => {
        it('matches icon and label snapshot', () => {
            const { container } = renderWithProviders(
                <Link
                    href="/test"
                    icon={{ name: 'mail', label: 'This is a label' }}
                >
                    Navigation Link
                </Link>,
            );

            expect(container.firstChild).toMatchSnapshot();
        });

        it('matches icon only snapshot', () => {
            const { container } = renderWithProviders(
                <Link icon={{ name: 'mail', label: 'Navigation Link' }} />,
            );

            expect(container.children).toMatchSnapshot();
        });

        it('matches external link snapshot', () => {
            const { container } = renderWithProviders(
                <Link href="/test" external>Navigation Link</Link>,
            );

            expect(container.firstChild).toMatchSnapshot();
        });

        it('matches button link snapshot', () => {
            const { container } = renderWithProviders(
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

            expect(container.firstChild).toMatchSnapshot();
        });

        it('matches disabled snapshot', () => {
            const { container } = renderWithProviders(
                <Link href="/test" disabled>
                    Navigation Link
                </Link>,
            );

            expect(container.firstChild).toMatchSnapshot();
        });

        it('matches RouteLink snapshot', () => {
            const { container } = renderWithProviders(
                <Link routerLink={RouteLink} href="/test">Navigation Link</Link>,
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe('Accessibility', () => {
        it('applies aria-disabled when link is disabled', () => {
            renderWithProviders(<Link disabled />);

            expect(screen.getByTestId('link')).toHaveAttribute('aria-disabled', 'true');
        });

        it('displays screen-reader-only text only when external && target="_blank"', () => {
            const { rerender } = renderWithProviders(<Link external target="none" />);

            expect(screen.queryByTestId('screen-reader-text')).not.toBeInTheDocument();

            rerender(<Link external target="_blank" />);

            expect(screen.getByTestId('screen-reader-text')).toBeInTheDocument();
        });
    });
});
