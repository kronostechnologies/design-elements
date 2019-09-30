import React from 'react';
import renderer from 'react-test-renderer';
import { ProgressBar } from '../src/components/results/progress-bar/progress-bar';

describe('ProgressBar', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <ProgressBar
                color="rgb(101,226,255)"
                descriptionLabel="You"
                resultLabel="50k - 100k$"
                percent={100}
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Has secondary styles', () => {
        const tree = renderer.create(
            <ProgressBar
                color="rgb(101,226,255)"
                descriptionLabel="You"
                resultLabel="50k - 100k$"
                percent={100}
                secondary
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
