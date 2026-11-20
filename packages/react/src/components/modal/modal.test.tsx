import { RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement, useState } from 'react';
import { doNothing } from '../../test-utils/callbacks';
import { renderWithProviders } from '../../test-utils/renderer';
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

    it('removes its scoped focus listeners on close', () => {
        const addListener = jest.spyOn(document, 'addEventListener');
        const removeListener = jest.spyOn(document, 'removeEventListener');
        const { rerender } = renderModal({ isOpen: true });
        const focusListeners = addListener.mock.calls
            .filter(([type, , capture]) => type === 'focus' && capture === true);
        addListener.mockRestore();

        rerender(<Modal {...defaultTestProps} isOpen={false} />);
        const removedListeners = [...removeListener.mock.calls];
        removeListener.mockRestore();

        expect(focusListeners).toHaveLength(1);
        expect(removedListeners).toContainEqual(focusListeners[0]);
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

    it.each([false, true])('restores focus and tooltip with focus-visible: %s', async (focusVisible) => {
        const user = userEvent.setup();
        const onAfterClose = jest.fn(() => document.activeElement);
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

        if (focusVisible) {
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
        expect(onAfterClose).toHaveReturnedWith(trigger);
        if (focusVisible) {
            expect(tooltip).toBeVisible();
        } else {
            expect(tooltip).not.toBeVisible();
        }
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
