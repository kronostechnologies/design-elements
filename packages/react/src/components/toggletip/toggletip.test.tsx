import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { Toggletip } from './toggletip';

describe('Toggletip', () => {
    describe('desktop', () => {
        it('opens on mouseClick', async () => {
            renderWithProviders(<Toggletip>Test Content</Toggletip>, 'desktop');

            const toggletip = screen.getByTestId('toggletip');
            await userEvent.click(toggletip);

            expect(screen.getByTestId('toggletip-content-container')).toBeInTheDocument();
        });

        it('closes on mouseClick given toggletip is open', async () => {
            renderWithProviders(<Toggletip defaultOpen>Test Content</Toggletip>, 'desktop');

            const toggletip = screen.getByTestId('toggletip');
            await userEvent.click(toggletip);

            expect(screen.queryByTestId('toggletip-content-container')).not.toBeInTheDocument();
        });

        it('closes on mouseClick outside of the toggletip', async () => {
            renderWithProviders(<Toggletip defaultOpen>Test Content</Toggletip>, 'desktop');

            await userEvent.click(document.body);

            expect(screen.queryByTestId('toggletip-content-container')).not.toBeInTheDocument();
        });

        it('stays open on mouseClick outside of the toggletip using closeOnlClickOutside=false', async () => {
            renderWithProviders(<Toggletip defaultOpen closeOnClickOutside={false}>Test Content</Toggletip>, 'desktop');

            await userEvent.click(document.body);

            expect(screen.queryByTestId('toggletip-content-container')).toBeInTheDocument();
        });

        it('does not open on mouseClick given toggletip is disabled', async () => {
            renderWithProviders(<Toggletip disabled>Test Content</Toggletip>, 'desktop');

            const toggletip = screen.getByTestId('toggletip');
            await expect(userEvent.click(toggletip)).toReject();

            expect(screen.queryByTestId('toggletip-content-container')).not.toBeInTheDocument();
        });
    });

    it('has default desktop styles', () => {
        const { asFragment } = renderWithProviders(<Toggletip>Test Content</Toggletip>, 'desktop');

        expect(asFragment()).toMatchSnapshot();
    });

    it('has default desktop styles (defaultOpen)', async () => {
        const { asFragment } = await act(
            () => renderWithProviders(<Toggletip defaultOpen>Test Content</Toggletip>, 'desktop'),
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('has mobile styles', () => {
        const { asFragment } = renderWithProviders(<Toggletip>Test Content</Toggletip>, 'mobile');

        expect(asFragment()).toMatchSnapshot();
    });

    it('has mobile styles (defaultOpen)', async () => {
        const { asFragment } = await act(
            () => renderWithProviders(<Toggletip defaultOpen>Test Content</Toggletip>, 'mobile'),
        );

        expect(asFragment()).toMatchSnapshot();
    });

    describe('mobile', () => {
        it('renders content', () => {
            renderWithProviders(<Toggletip defaultOpen>Test Content</Toggletip>, 'mobile');

            expect(screen.getByTestId('toggletip-content-container')).toHaveTextContent('Test Content');
        });
    });
});
