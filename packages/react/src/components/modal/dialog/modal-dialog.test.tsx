import { fireEvent, RenderResult } from '@testing-library/react';
import { doNothing } from '../../../test-utils/callbacks';
import { renderWithProviders } from '../../../test-utils/renderer';
import { type DeviceType } from '../../device-context-provider';
import { ModalDialog, type ModalDialogProps } from './modal-dialog';

type ModalDialogPropsLite = Omit<ModalDialogProps, 'ariaDescribedby' | 'ariaHideApp' | 'onRequestClose' | 'title'>;

const defaultTestProps = {
    title: 'Title',
    ariaDescribedby: 'modal-description',
    ariaHideApp: false,
    onRequestClose: doNothing,
};

const withSubtitle = {
    subtitle: 'Subtitle',
};

function renderModal(props: ModalDialogPropsLite, device: DeviceType = 'desktop'): RenderResult {
    return renderWithProviders(
        <ModalDialog {...defaultTestProps} {...props}>
            <p id="modal-description">Test Content</p>
        </ModalDialog>,
        device,
    );
}

describe('Modal-Dialog', () => {
    beforeEach(() => {
        document.body.replaceChildren();
        document.body.className = '';
    });

    test('onConfirm callback is called when confirm-button is clicked', () => {
        const callback = jest.fn();
        const { getByTestId } = renderModal({
            ...withSubtitle,
            isOpen: true,
            confirmButton: {
                onConfirm: callback,
            },
        });

        fireEvent.click(getByTestId('confirm-button'));

        expect(callback).toHaveBeenCalled();
    });

    test('onCancel callback is called when cancel-button is clicked', () => {
        const callback = jest.fn();
        const { getByTestId } = renderModal({
            ...withSubtitle,
            isOpen: true,
            cancelButton: {
                onCancel: callback,
            },
        });

        fireEvent.click(getByTestId('cancel-button'));

        expect(callback).toHaveBeenCalled();
    });

    test('Matches snapshot (opened, desktop)', () => {
        const { baseElement } = renderModal({ ...withSubtitle, isOpen: true }, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (opened, mobile)', () => {
        const { baseElement } = renderModal({ ...withSubtitle, isOpen: true }, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (only subtitle)', () => {
        const { baseElement } = renderModal({
            subtitle: 'Subtitle',
            isOpen: true,
        });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (custom button labels)', () => {
        const { baseElement } = renderModal({
            ...withSubtitle,
            confirmButton: {
                label: 'Test Confirm',
            },
            cancelButton: {
                label: 'Test Cancel',
            },
            isOpen: true,
        });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (closed)', () => {
        const { baseElement } = renderModal({ ...withSubtitle, isOpen: false });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (custom footer content)', () => {
        const customContent = <p>Custom content</p>;
        const { baseElement } = renderModal({ isOpen: true, footerContent: customContent });

        expect(baseElement).toMatchSnapshot();
    });
});
