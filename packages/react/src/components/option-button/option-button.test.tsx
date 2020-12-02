import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { OptionButton } from './option-button';

jest.mock('uuid/v4');

describe('Option Button', () => {
    test('Is checked', () => {
        const tree = renderer.create(
            ThemeWrapped(<OptionButton label="option" name="test" value={2} checked />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(<OptionButton label="option" name="test" value={2} />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
