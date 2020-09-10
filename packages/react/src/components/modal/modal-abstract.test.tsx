import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { mountWithProviders } from '@design-elements/test-utils/renderer';
import { ThemeWrapped } from '@design-elements/test-utils/theme-wrapped';
import { render } from '@testing-library/react';
import React from 'react';
import { ModalAbstract } from './modal-abstract';
jest.mock('uuid/v4');

describe('Modal Abstract', () => {
    test('onConfirm callback is called when confirm-button is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(
            <ModalAbstract
                ariaHideApp={false}
                modalType="dialog"
                isOpen={true}
                onConfirm={callback}
                onRequestClose={() => {}}
            >
                Test Content
            </ModalAbstract>,
        );

        getByTestId(wrapper, 'confirm-button').simulate('click');

        expect(callback).toHaveBeenCalled();
    });

    test('Matches snapshot (opened, dialog)', () => {
        const tree = render(
            ThemeWrapped(
                <ModalAbstract
                    modalType="dialog"
                    ariaHideApp={false}
                    title="Title"
                    subtitle="Subtitle"
                    isOpen={true}
                    onRequestClose={() => {}}
                >
                    Test Content
                </ModalAbstract>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (opened, alert)', () => {
        const tree = render(
            ThemeWrapped(
                <ModalAbstract
                    modalType="dialog"
                    ariaHideApp={false}
                    title="Title"
                    subtitle="Subtitle"
                    isOpen={true}
                    onRequestClose={() => {}}
                >
                    Test Content
                </ModalAbstract>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (only title)', () => {
        const tree = render(
            ThemeWrapped(
                <ModalAbstract
                    modalType="dialog"
                    ariaHideApp={false}
                    title="Title"
                    isOpen={true}
                    onRequestClose={() => {}}
                >
                    Test Content
                </ModalAbstract>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (only subtitle)', () => {
        const tree = render(
            ThemeWrapped(
                <ModalAbstract
                    modalType="dialog"
                    ariaHideApp={false}
                    subtitle="Subtitle"
                    isOpen={true}
                    onRequestClose={() => {}}
                >
                    Test Content
                </ModalAbstract>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (not titles)', () => {
        const tree = render(
            ThemeWrapped(
                <ModalAbstract
                    modalType="dialog"
                    ariaHideApp={false}
                    isOpen={true}
                    onRequestClose={() => {}}
                >
                    Test Content
                </ModalAbstract>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (closed)', () => {
        const tree = render(
            ThemeWrapped(
                <ModalAbstract
                    modalType="dialog"
                    ariaHideApp={false}
                    title="Title"
                    subtitle="Subtitle"
                    isOpen={false}
                    onRequestClose={() => {}}
                >
                    Test Content
                </ModalAbstract>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });
});
