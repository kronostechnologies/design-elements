import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactElement, useState } from 'react';
import styled from 'styled-components';
import { renderWithProviders } from '../../test-utils/renderer';
import { IconButton } from '../buttons';
import { Icon } from '../icon';
import { ModalDialog } from '../modal/dialog/modal-dialog';
import { Tooltip } from './tooltip';

const StyledIconButton = styled(IconButton)`
    margin: 0;
`;

const TooltipWithDialog = (): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Tooltip label="Edit liability">
                <IconButton
                    buttonType="tertiary"
                    type="button"
                    iconName="settings"
                    label="Edit"
                    onClick={() => setIsOpen(true)}
                />
            </Tooltip>
            <ModalDialog
                title="Edit liability"
                ariaHideApp={false}
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                cancelButton={{ label: 'Cancel' }}
            />
        </>
    );
};

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

        it('opens on focus', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <Tooltip label="Test Content" />,
                'desktop',
            );

            await user.tab();

            expect(screen.getByTestId('tooltip-content-container')).toBeVisible();
        });

        it('stays hidden when a dialog restores focus to its icon button until the next hover', async () => {
            const user = userEvent.setup();
            renderWithProviders(<TooltipWithDialog />, 'desktop');
            const trigger = screen.getByRole('button', { name: 'Edit' });
            const tooltip = screen.getByTestId('tooltip-content-container');

            await user.hover(trigger);
            expect(tooltip).toBeVisible();
            await user.click(trigger);
            expect(screen.getByRole('dialog')).toBeVisible();
            expect(tooltip).not.toBeVisible();
            await user.click(screen.getByRole('button', { name: 'Cancel' }));

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            expect(trigger).toHaveFocus();
            expect(tooltip).not.toBeVisible();

            await user.hover(trigger);

            expect(tooltip).toBeVisible();
        });

        it('opens when tabbing to an icon button and preserves keyboard activation', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            renderWithProviders(
                <Tooltip label="Test Content">
                    <IconButton buttonType="tertiary" type="button" iconName="copy" label="Copy" onClick={onClick} />
                </Tooltip>,
                'desktop',
            );
            const trigger = screen.getByRole('button', { name: 'Copy' });
            const tooltip = screen.getByTestId('tooltip-content-container');

            await user.tab();

            expect(trigger).toHaveFocus();
            expect(tooltip).toBeVisible();

            await user.keyboard('{Enter}');

            expect(trigger).toHaveFocus();
            expect(onClick).toHaveBeenCalledTimes(1);
            expect(tooltip).not.toBeVisible();
        });

        it('dismisses the tooltip when clicking the icon without moving focus or leaving the button', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <Tooltip label="Test Content">
                    <StyledIconButton buttonType="tertiary" type="button" iconName="copy" label="Copy">
                        <Icon data-testid="copy-icon" name="copy" size="16" />
                    </StyledIconButton>
                </Tooltip>,
                'desktop',
            );
            const trigger = screen.getByRole('button', { name: 'Copy' });
            const icon = screen.getByTestId('copy-icon');
            const tooltip = screen.getByTestId('tooltip-content-container');
            await user.tab();
            await user.hover(icon);
            expect(tooltip).toBeVisible();

            await user.click(icon);

            expect(trigger).toHaveFocus();
            expect(tooltip).not.toBeVisible();
        });

        it('cancels a pending delayed tooltip when clicking the icon button', async () => {
            jest.useFakeTimers();
            try {
                const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
                renderWithProviders(
                    <Tooltip label="Test Content" delayed>
                        <IconButton buttonType="tertiary" type="button" iconName="copy" label="Copy" />
                    </Tooltip>,
                    'desktop',
                );
                const trigger = screen.getByRole('button', { name: 'Copy' });
                const tooltip = screen.getByTestId('tooltip-content-container');
                await user.hover(trigger);
                expect(tooltip).not.toBeVisible();

                await user.click(trigger);
                await act(() => jest.runOnlyPendingTimers());

                expect(tooltip).not.toBeVisible();

                await user.unhover(trigger);
                await user.hover(trigger);
                await act(() => jest.runOnlyPendingTimers());

                expect(tooltip).toBeVisible();
            } finally {
                jest.useRealTimers();
            }
        });

        it('keeps a non-icon trigger tooltip visible when the trigger is clicked', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <Tooltip label="Test Content">
                    <button type="button">Copy</button>
                </Tooltip>,
                'desktop',
            );
            const trigger = screen.getByRole('button', { name: 'Copy' });
            const tooltip = screen.getByTestId('tooltip-content-container');

            await user.tab();
            expect(tooltip).toBeVisible();
            await user.click(trigger);

            expect(tooltip).toBeVisible();
        });

        it('closes on blur given tooltip is open', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <Tooltip label="Test Content" defaultOpen />,
                'desktop',
            );

            await user.tab();
            await user.tab();

            expect(screen.getByTestId('tooltip-content-container')).not.toBeVisible();
        });

        it('tooltip-confirm-icon should be displayed after tooltip children is clicked', async () => {
            const user = userEvent.setup();
            const confirmationLabel = 'confirmLabel';
            renderWithProviders(
                <Tooltip
                    confirmationLabel={confirmationLabel}
                    label="Test Content"
                    mode="confirm"
                >
                    <IconButton data-testid="icon-button" buttonType="tertiary" type="button" iconName="copy" />
                </Tooltip>,
                'desktop',
            );

            await user.tab();
            expect(screen.getByTestId('tooltip-content-container')).toBeVisible();
            await user.click(screen.getByTestId('icon-button'));

            expect(screen.getByTestId('tooltip-confirm-icon')).toBeVisible();
        });

        it('opens a mobile icon button tooltip on tap', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <Tooltip label="Test Content">
                    <IconButton buttonType="tertiary" type="button" iconName="copy" label="Copy" />
                </Tooltip>,
                'mobile',
            );
            const trigger = screen.getByRole('button', { name: 'Copy' });
            const tooltip = screen.getByTestId('tooltip-content-container');

            await user.pointer({ keys: '[TouchA]', target: trigger });

            expect(tooltip).toBeVisible();
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

        it('does not open on focus given tooltip is disabled', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <Tooltip label="Test Content" disabled />,
                'desktop',
            );

            await user.tab();

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
