import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { MobileMenu } from './mobile-menu';

describe('Mobile Menu', () => {
    test('matches snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <MobileMenu>
                    <p>Test</p>
                </MobileMenu>,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
