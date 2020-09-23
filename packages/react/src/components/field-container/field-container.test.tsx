import React from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { FieldContainer } from './field-container';

describe('Field Container', () => {
    test('normal', () => {
        const tree = renderWithProviders(
            <FieldContainer valid {...defaultProps}>
                Children
            </FieldContainer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('invalid', () => {
        const tree = renderWithProviders(
            <FieldContainer valid={false} {...defaultProps}>
                Children
            </FieldContainer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has no margin', () => {
        const tree = renderWithProviders(
            <FieldContainer valid disableMargin {...defaultProps}>
                Children
            </FieldContainer>,
        );

        expect(tree).toMatchSnapshot();
    });
});

const defaultProps = {
    fieldId: 'test-id',
    label: 'test label',
    validationErrorMessage: 'This text area input is invalid',
};
