import { screen } from '@testing-library/react';
import { SkipLinkProps } from '../skip-link';
import { renderWithProviders } from '../../test-utils/renderer';
import { GlobalHeader } from './global-header';

describe('Global Header', () => {
    it('matches the snapshot (desktop)', () => {
        const { container } = renderWithProviders(
            <GlobalHeader mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </GlobalHeader>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches the snapshot (mobile)', () => {
        const { container } = renderWithProviders(
            <GlobalHeader mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </GlobalHeader>,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('mobileDrawerContent prop adds a side drawer and burger button in mobile', () => {
        const { container } = renderWithProviders(
            <GlobalHeader mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </GlobalHeader>,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    describe('SkipLink', () => {
        it('should not exist when skipLink is not defined', () => {
            renderWithProviders(
                <GlobalHeader>
                    Test
                </GlobalHeader>,
            );

            expect(screen.queryByTestId('skip-link')).not.toBeInTheDocument();
        });

        it('should receive props when skipLink is defined', () => {
            const skipLink: SkipLinkProps = {
                href: '#test',
                onClick: jest.fn(),
            };

            renderWithProviders(
                <GlobalHeader skipLink={skipLink}>
                    Test
                </GlobalHeader>,
            );

            const skipLinkElement = screen.getByRole('link', { name: /skip/i });
            expect(skipLinkElement).toHaveAttribute('href', skipLink.href);
        });
    });

    describe('logo', () => {
        it('should use react-router-link when usesReactRouter is true', () => {
            renderWithProviders(<GlobalHeader usesReactRouter>test</GlobalHeader>);

            expect(screen.getByTestId('logo-react-router-link')).toBeInTheDocument();
        });

        it('should use html-link when usesReactRouter is false', () => {
            renderWithProviders(<GlobalHeader usesReactRouter={false}>test</GlobalHeader>);

            expect(screen.getByTestId('logo-html-link')).toBeInTheDocument();
        });

        it('contains app-title when appTitleDesktop prop is set given device is desktop', () => {
            renderWithProviders(
                <GlobalHeader appTitleDesktop="some-title">test</GlobalHeader>,
                'desktop',
            );

            expect(screen.getByTestId('app-title')).toHaveTextContent('some-title');
        });

        it('does not contain app-title when device is mobile', () => {
            renderWithProviders(
                <GlobalHeader appTitleDesktop="test">test</GlobalHeader>,
                'mobile',
            );

            expect(screen.queryByTestId('app-title')).not.toBeInTheDocument();
        });
    });
});
