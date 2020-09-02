import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { ThemeWrapped } from '@design-elements/test-utils/theme-wrapped';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { ModalAbstract } from './modal-abstract';
jest.mock('uuid/v4');

describe('Modal Abstract', () => {
    test('onConfirm callback is called when confirm-button is clicked', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(
                <ModalAbstract
                    ariaHideApp={false}
                    modalType="dialog"
                    isOpen={true}
                    onConfirm={callback}
                    onRequestClose={() => {}}
                >
                    Test Content
                </ModalAbstract>,
            ),
        );

        getByTestId(wrapper, 'confirm-button').simulate('click');

        expect(callback).toHaveBeenCalled();
    });

    describe('Dialog', () => {
        test('Matches snapshot (opened)', () => {
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

    describe('Alert', () => {
        test('Matches snapshot (opened)', () => {
            const tree = render(
                ThemeWrapped(
                    <ModalAbstract
                        modalType="alert"
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

        test('Matches snapshot (not titles)', () => {
            const tree = render(
                ThemeWrapped(
                    <ModalAbstract
                        modalType="alert"
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
                        modalType="alert"
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
});
