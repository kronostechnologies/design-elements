import React from 'react';
import renderer from 'react-test-renderer';
import { ExternalLink } from '../external-link/external-link';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { MobileMenuItem } from './mobile-menu-item';

describe('Mobile Menu', () => {
    test('matches snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <MobileMenuItem>
                    <p>Test</p>
                </MobileMenuItem>,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('adds styles to External Link', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <MobileMenuItem>
                    <ExternalLink label="Test Link"/>
                </MobileMenuItem>,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
