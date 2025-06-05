import { NavLink } from 'react-router-dom';
import { renderWithProviders } from '../../test-utils/renderer';
import { Link } from './link';

describe('Link Component', () => {
    describe('Styling', () => {
        test('matches icon and label snapshot', () => {
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

        test('matches icon only snapshot', () => {
            const { container } = renderWithProviders(
                <Link icon={{ name: 'mail', label: 'Navigation Link' }} />,
            );

            expect(container.children).toMatchSnapshot();
        });

        test('matches external link snapshot', () => {
            const { container } = renderWithProviders(
                <Link href="/test" external>Navigation Link</Link>,
            );

            expect(container.firstChild).toMatchSnapshot();
        });

        test('matches button link snapshot', () => {
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

        test('matches disabled snapshot', () => {
            const { container } = renderWithProviders(
                <Link href="/test" disabled>
                    Navigation Link
                </Link>,
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
