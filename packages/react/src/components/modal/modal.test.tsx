import { renderPortalWithProviders } from '@design-elements/test-utils/portal-renderer';
import { fireEvent, getByTestId, RenderResult } from '@testing-library/react';
import React from 'react';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { Modal, ModalProps } from './modal';

describe('Modal', () => {
    test('onRequestClose callback is called when close-button is clicked', () => {
        const callback = jest.fn();
        const { baseElement } = renderModal({ isOpen: true, onRequestClose: callback, ariaHideApp: false }, 'desktop');

        fireEvent.click(getByTestId(baseElement, 'close-button'));

        expect(callback).toHaveBeenCalled();
    });

    test('Matches snapshot (opened, desktop)', () => {
        const { baseElement } = renderModal({ ...defaultProps, isOpen: true }, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (opened, mobile)', () => {
        const { baseElement } = renderModal({ ...defaultProps, isOpen: true }, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (no close button, desktop)', () => {
        const { baseElement } = renderModal({ ...defaultProps, isOpen: true, hasCloseButton: false }, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (no close button, mobile)', () => {
        const { baseElement } = renderModal({ ...defaultProps, isOpen: true, hasCloseButton: false }, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (closed)', () => {
        const { baseElement } = renderModal({ ...defaultProps, isOpen: false });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (noPadding)', () => {
        const { baseElement } = renderModal({ ...defaultProps, isOpen: true, noPadding: true });

        expect(baseElement).toMatchSnapshot();
    });
});

const defaultProps = {
    ariaHideApp: false,
    onRequestClose: () => {},
};

function renderModal(props: ModalProps, device: DeviceType = 'desktop'): RenderResult {
    return renderPortalWithProviders(
        <Modal {...props}>
            Test Content
        </Modal>, device,
    );
}
