import { ThemeWrapped } from '@design-elements/test-utils/theme-wrapped';
import { render } from '@testing-library/react';
import React from 'react';
import { ModalAlert } from './modal-alert';
jest.mock('uuid/v4');

describe('Modal Alert', () => {
    test('Matches snapshot (opened)', () => {
        const tree = render(
            ThemeWrapped(
                <ModalAlert
                    ariaHideApp={false}
                    title="Title"
                    subtitle="Subtitle"
                    isOpen={true}
                    onRequestClose={() => {}}
                >
                    Test Content
                </ModalAlert>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (not titles)', () => {
        const tree = render(
            ThemeWrapped(
                <ModalAlert
                    ariaHideApp={false}
                    isOpen={true}
                    onRequestClose={() => {}}
                >
                    Test Content
                </ModalAlert>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (closed)', () => {
        const tree = render(
            ThemeWrapped(
                <ModalAlert
                    ariaHideApp={false}
                    title="Title"
                    subtitle="Subtitle"
                    isOpen={false}
                    onRequestClose={() => {}}
                >
                    Test Content
                </ModalAlert>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });
});
