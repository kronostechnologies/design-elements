import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../theme-wrapper/theme-wrapper.test';
import { MobileMenuItem } from './mobile-menu-item';

describe('Mobile Menu', () => {
    test('Matches snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <MobileMenuItem>
                    Test
                </MobileMenuItem>,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
