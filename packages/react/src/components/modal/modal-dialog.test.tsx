import { ThemeWrapped } from '@design-elements/test-utils/theme-wrapped';
import { render } from '@testing-library/react';
import React from 'react';
import { ModalDialog } from './modal-dialog';
jest.mock('uuid/v4');

describe('Modal Dialog', () => {
    test('Matches snapshot (opened)', () => {
        const tree = render(
            ThemeWrapped(
                <ModalDialog
                    ariaHideApp={false}
                    title="Title"
                    subtitle="Subtitle"
                    isOpen={true}
                    onRequestClose={() => {}}
                >
                    Test Content
                </ModalDialog>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (not titles)', () => {
        const tree = render(
            ThemeWrapped(
                <ModalDialog
                    ariaHideApp={false}
                    isOpen={true}
                    onRequestClose={() => {}}
                >
                    Test Content
                </ModalDialog>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (closed)', () => {
        const tree = render(
            ThemeWrapped(
                <ModalDialog
                    ariaHideApp={false}
                    title="Title"
                    subtitle="Subtitle"
                    isOpen={false}
                    onRequestClose={() => {}}
                >
                    Test Content
                </ModalDialog>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });
});
