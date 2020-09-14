import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { renderPortalWithProviders } from '@design-elements/test-utils/portal-renderer';
import { mountWithProviders } from '@design-elements/test-utils/renderer';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { ModalAbstract, ModalAbstractProps } from './modal-abstract';
jest.mock('uuid/v4');

describe('Modal-Abstract', () => {
    test('onConfirm callback is called when confirm-button is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(
            <ModalAbstract
                modalType="dialog"
                isOpen={true}
                onConfirm={callback}
                {...defaultProps}
            >
                Test Content
            </ModalAbstract>,
        );

        getByTestId(wrapper, 'confirm-button').simulate('click');

        expect(callback).toHaveBeenCalled();
    });

    test('Matches snapshot (opened, dialog, desktop)', () => {
        const tree = renderModal({ isOpen: true, modalType: 'dialog', ...defaultProps }, 'desktop');

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (opened, dialog, mobile)', () => {
        const tree = renderModal({ isOpen: true, modalType: 'dialog', ...defaultProps }, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (opened, alert, desktop)', () => {
        const tree = renderModal({ isOpen: true, modalType: 'alert', ...defaultProps }, 'desktop');

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (opened, alert, mobile)', () => {
        const tree = renderModal({ isOpen: true, modalType: 'alert', ...defaultProps }, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (only title)', () => {
        const tree = renderModal({
            modalType: 'dialog',
            ariaHideApp: false,
            title: 'Title',
            isOpen: true,
            onRequestClose: () => {},
        });

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (only subtitle)', () => {
        const tree = renderModal({
            modalType: 'dialog',
            ariaHideApp: false,
            subtitle: 'Subtitle',
            isOpen: true,
            onRequestClose: () => {},
        });

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (not titles)', () => {
        const tree = renderModal({
            modalType: 'dialog',
            ariaHideApp: false,
            isOpen: true,
            onRequestClose: () => {},
        });

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (closed)', () => {
        const tree = renderModal({ isOpen: false, modalType: 'dialog', ...defaultProps });

        expect(tree).toMatchSnapshot();
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
