import { fireEvent, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { doNothing } from '../../test-utils/callbacks';
import { renderWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider';
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
    test('onRequestClose callback is called when close-button is clicked', () => {
        const callback = jest.fn();
        const { getByTestId } = renderWithProviders(
            <Modal isOpen onRequestClose={callback} ariaHideApp={false}>
                <p id="modal-description">Test Content</p>
            </Modal>,
            'desktop',
        );

        fireEvent.click(getByTestId('close-button'));

        expect(callback).toHaveBeenCalled();
    });

    test('Matches snapshot (opened, desktop)', () => {
        const { baseElement } = renderModal({ isOpen: true }, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (opened, mobile)', () => {
        const { baseElement } = renderModal({ isOpen: true }, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (no close button, desktop)', () => {
        const { baseElement } = renderModal({ isOpen: true, hasCloseButton: false }, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (no close button, mobile)', () => {
        const { baseElement } = renderModal({ isOpen: true, hasCloseButton: false }, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (closed)', () => {
        const { baseElement } = renderModal({ isOpen: false });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (noPadding)', () => {
        const { baseElement } = renderModal({ isOpen: true, noPadding: true });

        expect(baseElement).toMatchSnapshot();
    });

    test('Modal width prop is applied correctly', () => {
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
