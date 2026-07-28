import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    (['mobile', 'desktop'] as const).forEach((device) => {
        it(`should show destructive button when type is alert (${device})`, () => {
            renderWithProviders(
                <SectionalBanner
                    type="alert"
                    buttonLabel="some button"
                    onButtonClicked={jest.fn()}
                >
                    Test
                </SectionalBanner>,
                device,
            );

            const button = screen.getByTestId('button');
            expect(button).toBeInTheDocument();
        });

        it(`should call callback when dismiss button is clicked (${device})`, async () => {
            const onDismiss = jest.fn();
            const user = userEvent.setup();
            renderWithProviders(
                <SectionalBanner
                    type="info"
                    onDismiss={onDismiss}
                >
                    Test
                </SectionalBanner>,
                device,
            );

            await user.click(screen.getByTestId('dismiss-button'));

            expect(onDismiss).toHaveBeenCalled();
        });

        it(`should call callback when button is clicked (${device})`, async () => {
            const onButtonClicked = jest.fn();
            const user = userEvent.setup();
            renderWithProviders(
                <SectionalBanner
                    type="info"
                    buttonLabel="some button"
                    onButtonClicked={onButtonClicked}
                >
                    Test
                </SectionalBanner>,
                device,
            );

            await user.click(screen.getByTestId('button'));

            expect(onButtonClicked).toHaveBeenCalled();
        });
    });
});
