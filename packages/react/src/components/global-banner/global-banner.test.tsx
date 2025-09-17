import { renderWithProviders } from '../../test-utils/renderer';
import { type ActionButton, GlobalBanner, type GlobalBannerType } from './global-banner';

const defaultActionButton: ActionButton = {
    label: 'Test button',
    onClick: jest.fn(),
};

const bannerTypesArray: GlobalBannerType[] = ['alert', 'warning', 'discovery', 'neutral'];

describe('GlobalBanner', () => {
    bannerTypesArray.forEach((type) => {
        test(`matches snapshot (desktop, ${type})`, () => {
            const { container } = renderWithProviders(
                <GlobalBanner actionButton={defaultActionButton} dismissable label={type} type={type}>
                    Test content
                </GlobalBanner>,
                'desktop',
            );

            expect(container.firstChild).toMatchSnapshot();
        });

        test(`matches snapshot (mobile, ${type})`, () => {
            const { container } = renderWithProviders(
                <GlobalBanner actionButton={defaultActionButton} dismissable label={type} type={type}>
                    Test content
                </GlobalBanner>,
                'mobile',
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
