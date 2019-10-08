import React from 'react';
import renderer from 'react-test-renderer';
import { InvalidField } from './invalid-field';

describe('Invalid field', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <InvalidField controlId="test-id" feedbackMsg="Feedback Message"/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
