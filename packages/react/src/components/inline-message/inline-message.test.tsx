import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { InlineMessage } from './inline-message';

describe('Inline Message', () => {
    test('Matches snapshot (desktop)', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <InlineMessage type="info">
                    Test
                </InlineMessage>,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (mobile)', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <InlineMessage type="error" device="mobile">
                    Test
                </InlineMessage>,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
