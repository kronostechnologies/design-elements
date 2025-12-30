import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { type ActionButton, GlobalBanner, type GlobalBannerType } from './global-banner';

const defaultActionButton: ActionButton = {
    label: 'Test button',
    onClick: jest.fn(),
};

const bannerTypesArray: GlobalBannerType[] = ['alert', 'warning', 'discovery', 'neutral'];

describe('GlobalBanner', () => {
    bannerTypesArray.forEach((type) => {
        it(`matches snapshot (desktop, ${type})`, () => {
            const { container } = renderWithProviders(
                <GlobalBanner actionButton={defaultActionButton} dismissable label={type} type={type}>
                    Test content
                </GlobalBanner>,
                'desktop',
            );

            expect(container.firstChild).toMatchSnapshot();
        });

        it(`matches snapshot (mobile, ${type})`, () => {
            const { container } = renderWithProviders(
                <GlobalBanner actionButton={defaultActionButton} dismissable label={type} type={type}>
                    Test content
                </GlobalBanner>,
                'mobile',
            );

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    it('calls action-button onClick callback when action-button is clicked', async () => {
        const callback = jest.fn();
        renderWithProviders(
            <GlobalBanner
                actionButton={{
                    label: 'Test button',
                    onClick: callback,
                }}
                label="Test"
            >
                Test
            </GlobalBanner>,
        );

        await userEvent.click(screen.getByTestId('action-button'));

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('calls secondary-action-button onClick callback when secondary-action-button is clicked', async () => {
        const callback = jest.fn();
        renderWithProviders(
            <GlobalBanner
                secondaryActionButton={{
                    label: 'Test button',
                    onClick: callback,
                }}
                label="Test"
            >
                Test
            </GlobalBanner>,
        );

        await userEvent.click(screen.getByTestId('secondary-action-button'));

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('hides the banner when dismiss-button is clicked', async () => {
        renderWithProviders(
            <GlobalBanner
                actionButton={defaultActionButton}
                label="Test"
                dismissable
            >
                WARNING! test test
            </GlobalBanner>,
        );

        await userEvent.click(screen.getByTestId('dismiss-button'));

        expect(screen.queryByTestId('container')).not.toBeInTheDocument();
    });

    it('calls onDismiss when dismiss-button is clicked', async () => {
        const onDismiss = jest.fn();
        renderWithProviders(
            <GlobalBanner
                actionButton={defaultActionButton}
                label="Test"
                onDismiss={onDismiss}
                dismissable
            >
                WARNING! test test
            </GlobalBanner>,
        );

        await userEvent.click(screen.getByTestId('dismiss-button'));

        expect(onDismiss).toHaveBeenCalled();
    });

    it('does not have dismiss-button when type is alert', () => {
        renderWithProviders(
            <GlobalBanner
                label="Test"
                type="alert"
                dismissable
            >
                Test content
            </GlobalBanner>,
        );

        expect(screen.queryByTestId('dismiss-button')).not.toBeInTheDocument();
    });

    it('does not have dismiss-button when dismissable is set to false', () => {
        renderWithProviders(
            <GlobalBanner
                label="Test"
                dismissable={false}
            >
                Test content
            </GlobalBanner>,
        );

        expect(screen.queryByTestId('dismiss-button')).not.toBeInTheDocument();
    });

    describe('hidden property', () => {
        it('hides the component', () => {
            renderWithProviders(
                <GlobalBanner
                    actionButton={defaultActionButton}
                    label="Test"
                    hidden
                >
                    WARNING! test test
                </GlobalBanner>,
            );

            expect(screen.queryByTestId('container')).not.toBeInTheDocument();
        });

        it('does not hide by default', () => {
            renderWithProviders(
                <GlobalBanner
                    actionButton={defaultActionButton}
                    label="Test"
                >
                    WARNING! test test
                </GlobalBanner>,
            );

            expect(screen.getByTestId('container')).toBeInTheDocument();
        });
    });
});
