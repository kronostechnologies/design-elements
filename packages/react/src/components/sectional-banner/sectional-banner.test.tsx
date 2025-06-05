import { renderWithProviders } from '../../test-utils/renderer';
import { SectionalBanner } from './sectional-banner';

jest.mock('../../utils/uuid');

describe('SectionalBanner', () => {
    it('should match snapshot (desktop)', () => {
        const { container } = renderWithProviders(
            <SectionalBanner type="info">
                Test
            </SectionalBanner>,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot (custom message)', () => {
        const { container } = renderWithProviders(
            <SectionalBanner type="info">
                <p>Some sub title</p>
                <ul>
                    <li>Some bullet point</li>
                </ul>
            </SectionalBanner>,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot (mobile)', () => {
        const { container } = renderWithProviders(
            <SectionalBanner type="info">
                Test
            </SectionalBanner>,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
