import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { mountWithProviders } from '@design-elements/test-utils/renderer';
import { ThemeWrapped } from '@design-elements/test-utils/theme-wrapped';
import { render } from '@testing-library/react';
import React from 'react';
import { Modal } from './modal';

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

    test('Matches snapshot (opened)', () => {
        const tree = render(
            ThemeWrapped(
                <Modal ariaHideApp={false} isOpen={true} onRequestClose={() => {}}>
                    Test Content
                </Modal>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (closed)', () => {
        const tree = render(
            ThemeWrapped(
                <Modal ariaHideApp={false} isOpen={false} onRequestClose={() => {}}>
                    Test Content
                </Modal>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });
});
