import { renderPortalWithProviders } from '@design-elements/test-utils/portal-renderer';
import { fireEvent, getByTestId, RenderResult } from '@testing-library/react';
import React from 'react';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { ModalAbstract, ModalAbstractProps } from './modal-abstract';
jest.mock('uuid/v4');

describe('Modal-Abstract', () => {
    test('onConfirm callback is called when confirm-button is clicked', () => {
        const callback = jest.fn();
        const { baseElement } = renderModal({
            isOpen: true,
            modalType: 'dialog',
            onConfirm: callback,
            ...defaultProps,
        });

        fireEvent(
            getByTestId(baseElement, 'confirm-button'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        );

        expect(callback).toHaveBeenCalled();
    });

    test('Matches snapshot (opened, dialog, desktop)', () => {
        const { baseElement } = renderModal({ isOpen: true, modalType: 'dialog', ...defaultProps }, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (opened, dialog, mobile)', () => {
        const { baseElement } = renderModal({ isOpen: true, modalType: 'dialog', ...defaultProps }, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (opened, alert, desktop)', () => {
        const { baseElement } = renderModal({ isOpen: true, modalType: 'alert', ...defaultProps }, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (opened, alert, mobile)', () => {
        const { baseElement } = renderModal({ isOpen: true, modalType: 'alert', ...defaultProps }, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (only title)', () => {
        const { baseElement } = renderModal({
            modalType: 'dialog',
            ariaHideApp: false,
            title: 'Title',
            isOpen: true,
            onRequestClose: () => {},
        });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (only subtitle)', () => {
        const { baseElement } = renderModal({
            modalType: 'dialog',
            ariaHideApp: false,
            subtitle: 'Subtitle',
            isOpen: true,
            onRequestClose: () => {},
        });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (not titles)', () => {
        const { baseElement } = renderModal({
            modalType: 'dialog',
            ariaHideApp: false,
            isOpen: true,
            onRequestClose: () => {},
        });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (closed)', () => {
        const { baseElement } = renderModal({ isOpen: false, modalType: 'dialog', ...defaultProps });

        expect(baseElement).toMatchSnapshot();
    });
});

const defaultProps = {
    ariaHideApp: false,
    title: 'Title',
    subtitle: 'Subtitle',
    onRequestClose: () => {},
};

function renderModal(props: ModalAbstractProps, device: DeviceType = 'desktop'): RenderResult {
    return renderPortalWithProviders(
        <ModalAbstract {...props}>
            Test Content
        </ModalAbstract>, device,
    );
}
