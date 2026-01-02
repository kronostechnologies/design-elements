import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from '../buttons';
import { Icon } from '../icon';
import { renderWithProviders } from '../../test-utils/renderer';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
    describe('desktop', () => {
        it('opens on mouseEnter', async () => {
            renderWithProviders(
                <Tooltip label="Test Content" />,
                'desktop',
            );

            await userEvent.hover(screen.getByTestId('tooltip'));

            expect(screen.getByTestId('tooltip-content-container')).toBeVisible();
        });

        it('closes on mouseLeave given tooltip is open', async () => {
            renderWithProviders(
                <Tooltip label="Test Content" defaultOpen />,
                'desktop',
            );

            await userEvent.unhover(screen.getByTestId('tooltip'));

            expect(screen.getByTestId('tooltip-content-container')).not.toBeVisible();
        });

        it('does not open on mouseEnter given tooltip is disabled', async () => {
            renderWithProviders(
                <Tooltip label="Test Content" disabled />,
                'desktop',
            );

            await userEvent.hover(screen.getByTestId('tooltip'));

            expect(screen.getByTestId('tooltip-content-container')).not.toBeVisible();
        });

        it('opens on focus', () => {
            renderWithProviders(
                <Tooltip label="Test Content" />,
                'desktop',
            );

            fireEvent.focus(screen.getByTestId('tooltip'));

            expect(screen.getByTestId('tooltip-content-container')).toBeVisible();
        });

        it('closes on blur given tooltip is open', () => {
            renderWithProviders(
                <Tooltip label="Test Content" defaultOpen />,
                'desktop',
            );

            fireEvent.blur(screen.getByTestId('tooltip'));

            expect(screen.getByTestId('tooltip-content-container')).not.toBeVisible();
        });

        it('tooltip-confirm-icon should be displayed after tooltip children is clicked', async () => {
            const confirmationLabel = 'confirmLabel';
            renderWithProviders(
                <Tooltip
                    confirmationLabel={confirmationLabel}
                    label="Test Content"
                    mode="confirm"
                    defaultOpen
                >
                    <IconButton data-testid="icon-button" buttonType="tertiary" type="button" iconName="copy" />
                </Tooltip>,
                'desktop',
            );

            await userEvent.click(screen.getByTestId('icon-button'));

            expect(screen.getByTestId('tooltip-confirm-icon')).toBeInTheDocument();
        });

        it('label should be confirmation label after tooltip children is clicked', async () => {
            const confirmationLabel = 'confirmLabel';
            renderWithProviders(
                <Tooltip
                    label="Test Content"
                    confirmationLabel={confirmationLabel}
                    mode="confirm"
                    defaultOpen
                >
                    <IconButton data-testid="icon-button" buttonType="tertiary" type="button" iconName="copy" />
                </Tooltip>,
                'desktop',
            );

            await userEvent.click(screen.getByTestId('icon-button'));

            expect(screen.getByTestId('tooltip-content-container')).toHaveTextContent(confirmationLabel);
        });

        it('does not open on focus given tooltip is disabled', () => {
            renderWithProviders(
                <Tooltip label="Test Content" disabled />,
                'desktop',
            );

            fireEvent.focus(screen.getByTestId('tooltip'));

            expect(screen.getByTestId('tooltip-content-container')).not.toBeVisible();
        });
    });

    it('has default desktop styles', () => {
        const { asFragment } = renderWithProviders(
            <Tooltip label="Test Content" />,
            'desktop',
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('has default desktop styles (defaultOpen)', async () => {
        const { asFragment } = await act(
            () => renderWithProviders(
                <Tooltip defaultOpen label="Test Content" />,
                'desktop',
            ),
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('has mobile styles', () => {
        const { asFragment } = renderWithProviders(
            <Tooltip label="Test Content" />,
            'mobile',
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('has mobile styles (defaultOpen)', async () => {
        const { asFragment } = await act(
            () => renderWithProviders(
                <Tooltip defaultOpen label="Test Content" />,
                'mobile',
            ),
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('renders label', () => {
        renderWithProviders(
            <Tooltip defaultOpen label="Test Content" />,
            'mobile',
        );

        expect(screen.getByTestId('tooltip-content-container')).toHaveTextContent('Test Content');
    });

    it('renders children icon', () => {
        renderWithProviders(
            <Tooltip defaultOpen label="Test Content">
                <Icon data-testid="icon-children" aria-hidden="true" name="settings" size="20" />
            </Tooltip>,
            'mobile',
        );

        expect(screen.getByTestId('icon-children')).toBeInTheDocument();
    });
});
