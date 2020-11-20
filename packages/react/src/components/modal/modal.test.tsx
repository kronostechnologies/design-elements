import { renderPortalWithProviders } from '@design-elements/test-utils/portal-renderer';
import { fireEvent, RenderResult } from '@testing-library/react';
import React from 'react';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { Modal, ModalProps } from './modal';

describe('Modal', () => {
    test('onRequestClose callback is called when close-button is clicked', () => {
        const callback = jest.fn();
        const { getByTestId } = renderPortalWithProviders(
            <Modal isOpen onRequestClose={callback} ariaHideApp={false}>
                <p id="modal-description">Test Content</p>
            </Modal>, 'desktop',
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
});

interface ModalPropsLite extends Omit<ModalProps, 'ariaDescribedby' | 'ariaLabel' | 'ariaHideApp' | 'onRequestClose'> {
}

const defaultTestProps = {
    ariaDescribedby: 'modal-description',
    ariaLabel: 'Test modal',
    ariaHideApp: false,
    onRequestClose: () => {
    },
};

function renderModal(props: ModalPropsLite, device: DeviceType = 'desktop'): RenderResult {
    return renderPortalWithProviders(
        <Modal {...defaultTestProps} {...props}>
            <p id="modal-description">Test Content</p>
        </Modal>, device,
    );
}
