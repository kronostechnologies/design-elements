import { fireEvent, RenderResult } from '@testing-library/react';
import { doNothing } from '../../test-utils/callbacks';
import { getByTestId as enzymeGetByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderPortalWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { ModalDialog, ModalDialogProps, DialogType } from './modal-dialog';
import { IconName } from '../icon/icon';

jest.mock('../../utils/uuid');

type ModalDialogPropsLite = Omit<ModalDialogProps, 'ariaDescribedby' | 'ariaHideApp' | 'onRequestClose'>;

const defaultTestProps = {
    ariaDescribedby: 'modal-description',
    ariaHideApp: false,
    onRequestClose: doNothing,
};

const withTitleAndSubtitle = {
    title: 'Title',
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

    test('has title-icon when titleIcon and title props are defined', () => {
        const wrapper = mountWithProviders(
            <ModalDialog ariaHideApp={false} title="test" titleIcon="home" isOpen onRequestClose={jest.fn()}>
                <p id="modal-description">Test Content</p>
            </ModalDialog>,
            { attachTo: document.body },
        );

        expect(enzymeGetByTestId(wrapper, 'title-icon').exists()).toBe(true);
        wrapper.detach();
    });

    test('does not have title-icon when titleIcon is defined but not title', () => {
        const wrapper = mountWithProviders(
            <ModalDialog ariaHideApp={false} titleIcon="home" isOpen onRequestClose={jest.fn()}>
                <p id="modal-description">Test Content</p>
            </ModalDialog>,
            { attachTo: document.body },
        );

        expect(enzymeGetByTestId(wrapper, 'title-icon').exists()).toBe(false);
        wrapper.detach();
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

    test('Matches snapshot (custom footer content)', () => {
        const customContent = <p>Custom content</p>;
        const { baseElement } = renderModal({ isOpen: true, footerContent: customContent });

        expect(baseElement).toMatchSnapshot();
    });

    test.each([
        ['information', 'alertFilled', 'primary', false],
        ['action', 'home', 'primary', true],
        ['alert', 'alertFilled', 'destructive', true],
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
