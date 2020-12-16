import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { InvalidField } from './invalid-field';

describe('Invalid field', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(<InvalidField controlId="test-id" feedbackMsg="Feedback Message" />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
