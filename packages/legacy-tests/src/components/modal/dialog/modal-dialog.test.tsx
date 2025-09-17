import { type IconName } from '~/components/icon/icon';
import { type DialogType, ModalDialog } from '~/components/modal';
import { getByTestId as enzymeGetByTestId } from '../../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../../test-utils/renderer';

describe('Modal-Dialog', () => {
    beforeEach(() => {
        document.body.replaceChildren();
        document.body.className = '';
    });

    it('has title-icon when titleIcon prop is defined', () => {
        const attachTo = document.createElement('div');
        document.body.replaceChildren(attachTo);
        const wrapper = mountWithProviders(
            <ModalDialog ariaHideApp={false} title="test" titleIcon="home" isOpen onRequestClose={jest.fn()}>
                <p id="modal-description">Test Content</p>
            </ModalDialog>,
            { attachTo },
        );

        expect(enzymeGetByTestId(wrapper, 'title-icon').exists()).toBe(true);
        wrapper.detach();
    });

    it.each([
        ['information', 'alertFilled', 'primary', false],
        ['action', 'home', 'primary', true],
        ['alert', 'alertOctagon', 'destructive-primary', true],
    ])(
        'should respect %s dialogType with proper titleIcon and buttons',
        (modalType, expectedIcon, expectedButtonType, hasCancelButton) => {
            const attachTo = document.createElement('div');
            document.body.replaceChildren(attachTo);
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
                { attachTo },
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
