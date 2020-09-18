import { renderPortalWithProviders } from '@design-elements/test-utils/portal-renderer';
import { ThemeWrapped } from '@design-elements/test-utils/theme-wrapped';
import { fireEvent, getByTestId, render, RenderResult } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { Modal, ModalProps } from './modal';

describe('Modal', () => {
    test('onRequestClose callback is called when close-button is clicked', () => {
        const callback = jest.fn();
        const { baseElement } = renderModal({ isOpen: true, onRequestClose: callback, ariaHideApp: false }, 'desktop');

        fireEvent(
            getByTestId(baseElement, 'close-button'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        expect(callback).toHaveBeenCalled();
    });

    test('onClose callback is called when modal is closed', () => {
        const testElement = (isOpen: boolean): ReactElement => ThemeWrapped(
            <Modal isOpen={isOpen} onClose={callback} {...defaultProps}>
                Test Content
            </Modal>,
        );
        const callback = jest.fn();
        const { rerender } = render(testElement(true));

        rerender(testElement(false));

        expect(callback).toHaveBeenCalled();
    });

    test('Matches snapshot (opened, desktop)', () => {
        const { baseElement } = renderModal({ isOpen: true, ...defaultProps }, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (opened, mobile)', () => {
        const { baseElement } = renderModal({ isOpen: true, ...defaultProps }, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (no close button, desktop)', () => {
        const { baseElement } = renderModal({ isOpen: true, hasCloseButton: false, ...defaultProps }, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (no close button, mobile)', () => {
        const { baseElement } = renderModal({ isOpen: true, hasCloseButton: false, ...defaultProps }, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (closed)', () => {
        const { baseElement } = renderModal({ isOpen: false, ...defaultProps });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (disablePadding)', () => {
        const { baseElement } = renderModal({ isOpen: true, disablePadding: true, ...defaultProps });

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
