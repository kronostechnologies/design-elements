import { renderPortalWithProviders } from '@design-elements/test-utils/portal-renderer';
import { fireEvent, getByTestId, RenderResult } from '@testing-library/react';
import React from 'react';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { ModalDialog, ModalDialogProps } from './modal-dialog';
jest.mock('uuid/v4');

describe('Modal-Dialog', () => {
    test('onConfirm callback is called when confirm-button is clicked', () => {
        const callback = jest.fn();
        const { baseElement } = renderModal({
            ...withTitleAndSubtitle,
            isOpen: true,
            confirmButton: {
                onConfirm: callback,
            },
        });

        fireEvent.click(getByTestId(baseElement, 'confirm-button'));

        expect(callback).toHaveBeenCalled();
    });

    test('onCancel callback is called when cancel-button is clicked', () => {
        const callback = jest.fn();
        const { baseElement } = renderModal({
            ...withTitleAndSubtitle,
            isOpen: true,
            cancelButton: {
                onCancel: callback,
            },
        });

        fireEvent.click(getByTestId(baseElement, 'cancel-button'));

        expect(callback).toHaveBeenCalled();
    });

    test('Matches snapshot (opened, desktop)', () => {
        const { baseElement } = renderModal({ ...withTitleAndSubtitle, isOpen: true }, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (opened, mobile)', () => {
        const { baseElement } = renderModal({ ...withTitleAndSubtitle, isOpen: true }, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (only title)', () => {
        const { baseElement } = renderModal({
            ariaHideApp: false,
            title: 'Title',
            isOpen: true,
            onRequestClose: () => {},
        });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (only subtitle)', () => {
        const { baseElement } = renderModal({
            ariaHideApp: false,
            subtitle: 'Subtitle',
            isOpen: true,
            onRequestClose: () => {},
        });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (not titles)', () => {
        const { baseElement } = renderModal({
            ariaHideApp: false,
            isOpen: true,
            onRequestClose: () => {},
        });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (custom button labels)', () => {
        const { baseElement } = renderModal({
            ...withTitleAndSubtitle,
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
        const { baseElement } = renderModal({ ...withTitleAndSubtitle, isOpen: false });

        expect(baseElement).toMatchSnapshot();
    });
});

const withTitleAndSubtitle = {
    ariaHideApp: false,
    title: 'Title',
    subtitle: 'Subtitle',
    onRequestClose: () => {},
};

function renderModal(props: ModalDialogProps, device: DeviceType = 'desktop'): RenderResult {
    return renderPortalWithProviders(
        <ModalDialog {...props}>
            Test Content
        </ModalDialog>, device,
    );
}
