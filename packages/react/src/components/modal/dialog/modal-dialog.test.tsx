import { RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { doNothing } from '../../../test-utils/callbacks';
import { renderWithProviders } from '../../../test-utils/renderer';
import { type DeviceType } from '../../device-context-provider';
import { type IconName } from '../../icon';
import { type DialogType, ModalDialog, type ModalDialogProps } from './modal-dialog';

jest.mock('../../icon', () => ({
    ...jest.requireActual('../../icon'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon: (props: any) => <svg data-testid={props['data-testid'] || 'icon'} data-name={props.name} />,
}));

jest.mock('../../buttons', () => ({
    ...jest.requireActual('../../buttons'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Button: (props: any) => (
        <button
            type="button"
            data-testid={props['data-testid'] || 'button'}
            data-button-type={props.buttonType}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    ),
}));

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

describe('ModalDialog', () => {
    it('has title-icon when titleIcon prop is defined', () => {
        renderModal({
            titleIcon: 'home',
            isOpen: true,
        });

        expect(screen.getByTestId('title-icon')).toBeInTheDocument();
    });

    it.each([
        ['information', 'alertFilled', 'primary', false],
        ['action', 'home', 'primary', true],
        ['alert', 'alertOctagon', 'destructive-primary', true],
    ])(
        'should respect %s dialogType with proper titleIcon and buttons',
        (modalType, expectedIcon, expectedButtonType, hasCancelButton) => {
            renderModal({
                titleIcon: expectedIcon as IconName,
                isOpen: true,
                dialogType: modalType as DialogType,
            });

            const titleIcon = screen.getByTestId('title-icon');
            expect(titleIcon).toBeInTheDocument();
            expect(titleIcon).toHaveAttribute('data-name', expectedIcon);

            const confirmButton = screen.getByTestId('confirm-button');
            expect(confirmButton).toBeInTheDocument();
            expect(confirmButton).toHaveAttribute('data-button-type', expectedButtonType);

            const cancelButton = screen.queryByTestId('cancel-button');
            if (hasCancelButton) {
                expect(cancelButton).toBeInTheDocument();
            } else {
                expect(cancelButton).not.toBeInTheDocument();
            }
        },
    );

    it('onConfirm callback is called when confirm-button is clicked', async () => {
        const user = userEvent.setup();
        const callback = jest.fn();
        renderModal({
            ...withSubtitle,
            isOpen: true,
            confirmButton: {
                onConfirm: callback,
            },
        });

        await user.click(screen.getByTestId('confirm-button'));

        expect(callback).toHaveBeenCalled();
    });

    it('onCancel callback is called when cancel-button is clicked', async () => {
        const user = userEvent.setup();
        const callback = jest.fn();
        renderModal({
            ...withSubtitle,
            isOpen: true,
            cancelButton: {
                onCancel: callback,
            },
        });

        await user.click(screen.getByTestId('cancel-button'));

        expect(callback).toHaveBeenCalled();
    });

    it('matches snapshot (opened, desktop)', () => {
        const { baseElement } = renderModal({ ...withSubtitle, isOpen: true }, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    it('matches snapshot (opened, mobile)', () => {
        const { baseElement } = renderModal({ ...withSubtitle, isOpen: true }, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    it('matches snapshot (only subtitle)', () => {
        const { baseElement } = renderModal({
            subtitle: 'Subtitle',
            isOpen: true,
        });

        expect(baseElement).toMatchSnapshot();
    });

    it('matches snapshot (custom button labels)', () => {
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

    it('matches snapshot (closed)', () => {
        const { baseElement } = renderModal({ ...withSubtitle, isOpen: false });

        expect(baseElement).toMatchSnapshot();
    });

    it('matches snapshot (custom footer content)', () => {
        const customContent = <p>Custom content</p>;
        const { baseElement } = renderModal({ isOpen: true, footerContent: customContent });

        expect(baseElement).toMatchSnapshot();
    });
});
