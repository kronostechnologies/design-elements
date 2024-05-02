import { fireEvent, RenderResult } from '@testing-library/react';
import { doNothing } from '../../test-utils/callbacks';
import { getByTestId as enzymeGetByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderPortalWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { ModalDialog, ModalDialogProps, DialogType } from './modal-dialog';
import { IconName } from '../icon/icon';

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
    return renderPortalWithProviders(
        <ModalDialog {...defaultTestProps} {...props}>
            <p id="modal-description">Test Content</p>
        </ModalDialog>,
        device,
    );
}

describe('Modal-Dialog', () => {
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

    test('has title-icon when titleIcon prop is defined', () => {
        const wrapper = mountWithProviders(
            <ModalDialog ariaHideApp={false} title="test" titleIcon="home" isOpen onRequestClose={jest.fn()}>
                <p id="modal-description">Test Content</p>
            </ModalDialog>,
            { attachTo: document.body },
        );

        expect(enzymeGetByTestId(wrapper, 'title-icon').exists()).toBe(true);
        wrapper.detach();
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

    test.each([
        ['information', 'alertFilled', 'primary', false],
        ['action', 'home', 'primary', true],
        ['alert', 'alertFilled', 'destructive-primary', true],
    ])(
        'should respect %s dialogType with proper titleIcon and buttons',
        (modalType, expectedIcon, expectedButtonType, hasCancelButton) => {
            const wrapper = mountWithProviders(
                <ModalDialog
                    ariaHideApp={false}
                    title="test"
                    titleIcon={expectedIcon as IconName}
                    isOpen
                    dialogType={modalType as DialogType}
                    onRequestClose={jest.fn()}
                >
                    <p id="modal-description">Test Content</p>
                </ModalDialog>,
                { attachTo: document.body },
            );

            const titleIcon = enzymeGetByTestId(wrapper, 'title-icon');
            expect(titleIcon.exists()).toBe(true);
            expect(titleIcon.prop('name')).toBe(expectedIcon);

            const confirmButton = enzymeGetByTestId(wrapper, 'confirm-button');
            expect(confirmButton.prop('buttonType')).toBe(expectedButtonType);

            const cancelButton = enzymeGetByTestId(wrapper, 'cancel-button');
            expect(cancelButton.exists()).toBe(hasCancelButton);

            wrapper.detach();
        },
    );
});
