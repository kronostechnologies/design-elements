import React from 'react';
import renderer from 'react-test-renderer';
import { FieldContainer } from './field-container';

describe('Field Container', () => {
    test('Valid field snapshot', () => {
        const tree = renderer.create(
            <FieldContainer
                fieldId="test-id"
                label="test label"
                valid
                validationErrorMessage="This text area input is invalid"
            >
                Children
            </FieldContainer>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Invalid field snapshot', () => {
        const tree = renderer.create(
            <FieldContainer
                fieldId="test-id"
                label="test label"
                valid={false}
                validationErrorMessage="This text area input is invalid"
            >
                Children
            </FieldContainer>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
