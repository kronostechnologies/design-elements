import React from 'react';
import renderer from 'react-test-renderer';
import { ProgressCircle } from '../src/components/results/progress-circle/progress-circle';

describe('ProgressCircle', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <ProgressCircle
                percent={66}
                color={'#304E63'}
                descriptionLabel="RRSP"
                resultLabel="56 k$"
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Has secondary styles', () => {
        const tree = renderer.create(
            <ProgressCircle
                percent={66}
                color={'#304E63'}
                descriptionLabel="RRSP"
                resultLabel="56 k$"
                secondary
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
