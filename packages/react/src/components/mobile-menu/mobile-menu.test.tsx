import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../theme-wrapper/theme-wrapper.test';
import { MobileMenu } from './mobile-menu';

describe('Mobile Menu', () => {
    test('Matches snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <MobileMenu>
                    Test
                </MobileMenu>,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
