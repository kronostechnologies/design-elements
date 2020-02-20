import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Headband } from './equisoft-default';

const setup = (children: ReactElement) => (
    renderer.create(
        ThemeWrapped(
            <Router>
                {children}
            </Router>,
        ),
    ).toJSON()
);

describe('Headband', () => {
    test('Matches the snapshot', () => {
        const tree = setup(
            <Headband mobileDrawerContent={(<p>Test</p>)} routerLink={Link}>
                Hello, World!
            </Headband>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has burger button and side drawer', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
        const tree = setup(
            <Headband mobileDrawerContent={(<p>Test</p>)} routerLink={Link}>
                Hello, World!
            </Headband>,
        );

        expect(tree).toMatchSnapshot();
    });
});
