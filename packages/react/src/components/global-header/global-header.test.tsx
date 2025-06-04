import { renderWithProviders } from '../../test-utils/renderer';
import { GlobalHeader } from './global-header';

describe('Global Header', () => {
    it('Matches the snapshot (desktop)', () => {
        const { container } = renderWithProviders(
            <GlobalHeader mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </GlobalHeader>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches the snapshot (mobile)', () => {
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
});
