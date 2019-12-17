import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { ProgressBar } from './progress-bar';

describe('ProgressBar', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <ProgressBar
                    color="rgb(101,226,255)"
                    descriptionLabel="You"
                    resultLabel="50k - 100k$"
                    percent={100}
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
