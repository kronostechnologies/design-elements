import { RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement, useState } from 'react';
import { doNothing } from '../../test-utils/callbacks';
import { renderWithProviders } from '../../test-utils/renderer';
import { renderWithProviders as renderWithDesignSystem } from '../../test-utils/testing-library';
import { DeviceType } from '../device-context-provider';
import { Tooltip } from '../tooltip';
import { Modal } from './modal';
import { ModalProps } from './types';

type ModalPropsLite = Omit<ModalProps, 'ariaDescribedby' | 'ariaLabel' | 'ariaHideApp' | 'onRequestClose'>;

const defaultTestProps = {
    ariaDescribedby: 'modal-description',
    ariaLabel: 'Test modal',
    ariaHideApp: false,
    onRequestClose: doNothing,
};

function renderModal(props: ModalPropsLite, device: DeviceType = 'desktop'): RenderResult {
    return renderWithProviders(
        <Modal {...defaultTestProps} {...props}>
            <p id="modal-description">Test Content</p>
        </Modal>,
        device,
    );
}

describe('Modal', () => {
    it('resets body overflow style on unmount', () => {
        const { unmount } = renderModal({ isOpen: true });

        expect(document.body.style.overflow).toBe('hidden');

        unmount();

        expect(document.body.style.overflow).toBe('');
    });

    it('resets body overflow style on close', () => {
        const { rerender } = renderModal({ isOpen: true });

        expect(document.body.style.overflow).toBe('hidden');

        rerender(<Modal {...defaultTestProps} isOpen={false} />);

        expect(document.body.style.overflow).toBe('');
    });

    it('focuses its content without installing a global focus listener', () => {
        const addListener = jest.spyOn(document, 'addEventListener');

        renderModal({ isOpen: true });
        const focusListeners = addListener.mock.calls
            .filter(([type, , capture]) => type === 'focus' && capture === true);
        addListener.mockRestore();

        expect(screen.getByRole('dialog')).toHaveFocus();
        expect(focusListeners).toHaveLength(0);
    });

    it('keeps focus on a child that receives focus on mount', () => {
        const modal = (
            <Modal {...defaultTestProps} isOpen>
                <input aria-label="Details" ref={(input) => input?.focus()} />
            </Modal>
        );

        renderWithProviders(modal, 'desktop');

        expect(screen.getByRole('textbox', { name: 'Details' })).toHaveFocus();
    });

    it('onRequestClose callback is called when close-button is clicked', async () => {
        const callback = jest.fn();
        const { getByTestId } = renderWithProviders(
            <Modal isOpen onRequestClose={callback} ariaHideApp={false}>
                <p id="modal-description">Test Content</p>
            </Modal>,
            'desktop',
        );

        const closeButton = getByTestId('close-button');
        const icon = closeButton.querySelector('svg')!;

        await userEvent.click(icon);

        expect(callback).toHaveBeenCalled();
    });

    it('onAfterClose callback is called after modal is closed', async () => {
        const onAfterClose = jest.fn();
        const TestComponent = ({ isOpen }: { isOpen: boolean }): ReactElement => (
            <Modal
                isOpen={isOpen}
                onRequestClose={doNothing}
                onAfterClose={onAfterClose}
                ariaHideApp={false}
            >
                <p id="modal-description">Test Content</p>
            </Modal>
        );

        const { rerender } = renderWithProviders(<TestComponent isOpen />, 'desktop');
        rerender(<TestComponent isOpen={false} />);

        await waitFor(() => {
            expect(onAfterClose).toHaveBeenCalledTimes(1);
        });
    });

    it.each([
        { input: 'mouse', focusVisible: false },
        { input: 'keyboard', focusVisible: true },
    ])('restores focus and tooltip after opening with $input', async ({ input, focusVisible }) => {
        const user = userEvent.setup();
        let focusWhenClosed: Element | null = null;
        const onAfterClose = jest.fn(() => {
            focusWhenClosed = document.activeElement;
        });
        const TestComponent = (): ReactElement => {
            const [isOpen, setIsOpen] = useState(false);
            return (
                <>
                    <Tooltip label="Open details">
                        <button type="button" onClick={() => setIsOpen(true)}>Open modal</button>
                    </Tooltip>
                    <Modal
                        {...defaultTestProps}
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        onAfterClose={onAfterClose}
                    />
                </>
            );
        };
        renderWithProviders(<TestComponent />, 'desktop');
        const trigger = screen.getByRole('button', { name: 'Open modal' });
        const tooltip = screen.getByTestId('tooltip-content-container');
        const focus = jest.spyOn(trigger, 'focus');
        const matches = trigger.matches.bind(trigger);
        // JSDOM does not distinguish pointer focus from keyboard focus.
        jest.spyOn(trigger, 'matches')
            .mockImplementation((selector) => (selector === ':focus-visible' ? focusVisible : matches(selector)));

        if (input === 'keyboard') {
            await user.tab();
            expect(tooltip).toBeVisible();
            await user.keyboard('{Enter}');
        } else {
            await user.hover(trigger);
            expect(tooltip).toBeVisible();
            await user.click(trigger);
        }

        expect(screen.getByRole('dialog')).toHaveFocus();
        expect(tooltip).not.toBeVisible();

        await user.keyboard('{Escape}');

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(trigger).toHaveFocus();
        expect(focus).toHaveBeenLastCalledWith({ focusVisible });
        expect(onAfterClose).toHaveBeenCalledTimes(1);
        expect(focusWhenClosed).toBe(trigger);
        if (focusVisible) {
            expect(tooltip).toBeVisible();
        } else {
            expect(tooltip).not.toBeVisible();
        }
    });

    it('preserves and restores focus inside an isolated design system', async () => {
        const user = userEvent.setup();
        let portalTarget: HTMLDivElement;
        const TestComponent = (): ReactElement => {
            const [isOpen, setIsOpen] = useState(false);
            return (
                <>
                    <button type="button" onClick={() => setIsOpen(true)}>Open modal</button>
                    <div ref={(node) => { if (node) portalTarget = node; }} />
                    <Modal
                        {...defaultTestProps}
                        isOpen={isOpen}
                        parentSelector={() => portalTarget}
                        onRequestClose={() => setIsOpen(false)}
                    >
                        <input aria-label="Details" ref={(input) => input?.focus()} />
                    </Modal>
                </>
            );
        };
        const { container } = renderWithDesignSystem(
            <TestComponent />,
            undefined,
            { isolateStyles: true, staticDevice: 'desktop' },
        );
        const shadowRoot = container.firstElementChild!.shadowRoot!;
        const trigger = shadowRoot.querySelector('button')!;
        const focus = jest.spyOn(trigger, 'focus');
        const matches = trigger.matches.bind(trigger);
        jest.spyOn(trigger, 'matches')
            .mockImplementation((selector) => (selector === ':focus-visible' ? true : matches(selector)));

        await user.click(trigger);
        const input = shadowRoot.querySelector('input')!;

        expect(shadowRoot.activeElement).toBe(input);

        await user.keyboard('{Escape}');

        expect(shadowRoot.querySelector('[role="dialog"]')).toBeNull();
        expect(shadowRoot.activeElement).toBe(trigger);
        expect(focus).toHaveBeenLastCalledWith({ focusVisible: true });
    });

    it('Matches snapshot (opened, desktop)', () => {
        const { baseElement } = renderModal({ isOpen: true }, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    it('Matches snapshot (opened, mobile)', () => {
        const { baseElement } = renderModal({ isOpen: true }, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    it('Matches snapshot (no close button, desktop)', () => {
        const { baseElement } = renderModal({ isOpen: true, hasCloseButton: false }, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    it('Matches snapshot (no close button, mobile)', () => {
        const { baseElement } = renderModal({ isOpen: true, hasCloseButton: false }, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    it('Matches snapshot (closed)', () => {
        const { baseElement } = renderModal({ isOpen: false });

        expect(baseElement).toMatchSnapshot();
    });

    it('Matches snapshot (noPadding)', () => {
        const { baseElement } = renderModal({ isOpen: true, noPadding: true });

        expect(baseElement).toMatchSnapshot();
    });

    it('Modal width prop is applied correctly', () => {
        const initialWidth = '500px';
        const newWidth = '70vw';
        const TestComponent = ({ width }: { width: string }): ReactElement => (
            <Modal isOpen width={width} ariaHideApp={false} onRequestClose={doNothing}>
                <p id="modal-description">Test Content</p>
            </Modal>
        );

        const { getByRole, rerender } = renderWithProviders(<TestComponent width={initialWidth} />, 'desktop');
        const modal = getByRole('dialog');

        expect(getComputedStyle(modal).width).toBe(initialWidth);

        rerender(<TestComponent width={newWidth} />);

        expect(getComputedStyle(modal).width).toBe(newWidth);
    });
});
