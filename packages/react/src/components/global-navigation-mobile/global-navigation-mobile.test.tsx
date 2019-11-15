import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../theme-wrapper/theme-wrapper.test';
import { GlobalNavigationMobile } from './global-navigation-mobile';

describe('Global Navigation Mobile', () => {
    test('is open', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <GlobalNavigationMobile open>
                    <ul>
                        <li>Test</li>
                    </ul>
                </GlobalNavigationMobile>,
            ),
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('is closed', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <GlobalNavigationMobile open={false}>
                    <ul>
                        <li>Test</li>
                    </ul>
                </GlobalNavigationMobile>,
            ),
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
