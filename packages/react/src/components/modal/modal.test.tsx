import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { renderPortalWithProviders } from '@design-elements/test-utils/portal-renderer';
import { mountWithProviders } from '@design-elements/test-utils/renderer';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { Modal, ModalProps } from './modal';

describe('Modal', () => {
    test('onRequestClose callback is called when close-button is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(
            <Modal ariaHideApp={false} isOpen={true} onRequestClose={callback}>
                Test Content
            </Modal>,
        );

        getByTestId(wrapper, 'close-button').simulate('click');

        expect(callback).toHaveBeenCalled();
    });

    test('Matches snapshot (opened, desktop)', () => {
        const tree = renderModal({ isOpen: true, ...defaultProps }, 'desktop');

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (opened, mobile)', () => {
        const tree = renderModal({ isOpen: true, ...defaultProps }, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (no close button, desktop)', () => {
        const tree = renderModal({ isOpen: true, hasCloseButton: false, ...defaultProps }, 'desktop');

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (no close button, mobile)', () => {
        const tree = renderModal({ isOpen: true, hasCloseButton: false, ...defaultProps }, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (closed)', () => {
        const tree = renderModal({ isOpen: false, ...defaultProps });

        expect(tree).toMatchSnapshot();
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
