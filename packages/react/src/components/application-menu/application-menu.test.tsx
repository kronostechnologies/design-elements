import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { ApplicationMenu } from './application-menu';

const setup = (children: ReactElement) => (
    renderer.create(
        ThemeWrapped(
            <Router>
                {children}
            </Router>,
        ),
    ).toJSON()
);

describe('Application Menu', () => {
    test('Matches the snapshot', () => {
        const tree = setup(
            <ApplicationMenu mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </ApplicationMenu>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has burger button and side drawer when screen width is under 576px', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
        const tree = setup(
            <ApplicationMenu mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </ApplicationMenu>,
        );

        expect(tree).toMatchSnapshot();
    });
});
