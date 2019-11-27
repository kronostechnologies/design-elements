import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../theme-wrapper/theme-wrapper.test';
import { ProgressCircle } from './progress-circle';

describe('ProgressCircle', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <ProgressCircle
                    percent={66}
                    color={'#304E63'}
                    descriptionLabel="RRSP"
                    resultLabel="56 k$"
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
