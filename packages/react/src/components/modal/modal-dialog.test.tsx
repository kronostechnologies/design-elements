import { renderPortalWithProviders } from '@design-elements/test-utils/portal-renderer';
import { fireEvent, RenderResult } from '@testing-library/react';
import React from 'react';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { ModalDialog, ModalDialogProps } from './modal-dialog';

jest.mock('uuid/v4');

describe('Modal-Dialog', () => {
    test('onConfirm callback is called when confirm-button is clicked', () => {
        const callback = jest.fn();
        const { getByTestId } = renderModal({
            ...withTitleAndSubtitle,
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
            ...withTitleAndSubtitle,
            isOpen: true,
            cancelButton: {
                onCancel: callback,
            },
        });

        fireEvent.click(getByTestId('cancel-button'));

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
            title: 'Title',
            isOpen: true,
        });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (only subtitle)', () => {
        const { baseElement } = renderModal({
            ariaLabel: 'Test modal',
            subtitle: 'Subtitle',
            isOpen: true,
        });

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches snapshot (not titles)', () => {
        const { baseElement } = renderModal({
            ariaLabel: 'Test modal',
            isOpen: true,
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

interface ModalDialogPropsLite extends Omit<ModalDialogProps, 'ariaDescribedby' | 'ariaHideApp' | 'onRequestClose'> {
}

const defaultTestProps = {
    ariaDescribedby: 'modal-description',
    ariaHideApp: false,
    onRequestClose: () => {
    },
};

const withTitleAndSubtitle = {
    title: 'Title',
    subtitle: 'Subtitle',
};

function renderModal(props: ModalDialogPropsLite, device: DeviceType = 'desktop'): RenderResult {
    return renderPortalWithProviders(
        <ModalDialog {...defaultTestProps} {...props}>
            <p id="modal-description">Test Content</p>
        </ModalDialog>, device,
    );
}
