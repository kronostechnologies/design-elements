import React from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { FieldContainer } from './field-container';

describe('Field Container', () => {
    test('matches snapshot', () => {
        const tree = renderWithProviders(
            <FieldContainer valid {...defaultProps}>
                Children
            </FieldContainer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('should have invalid styles given valid prop is set to false', () => {
        const tree = renderWithProviders(
            <FieldContainer valid={false} {...defaultProps}>
                Children
            </FieldContainer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('should not have margins given noMargin prop is set to true', () => {
        const tree = renderWithProviders(
            <FieldContainer valid noMargin {...defaultProps}>
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
