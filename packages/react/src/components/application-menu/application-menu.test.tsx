import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { DeviceContextWrapped } from '../../test-utils/device-context-wrapped';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { ApplicationMenu } from './application-menu';

const renderComponent = (children: ReactElement) => (
    renderer.create(
        ThemeWrapped(
            <Router>
                {children}
            </Router>,
        ),
    ).toJSON()
);

describe('Application Menu', () => {
    test('Matches the snapshot (desktop)', () => {
        const tree = renderComponent(
            <ApplicationMenu mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </ApplicationMenu>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot (mobile)', () => {
        const tree = renderComponent(
            DeviceContextWrapped(
                <ApplicationMenu mobileDrawerContent={(<p>Test</p>)}>
                    Hello, World!
                </ApplicationMenu>,
                'mobile',
            ),
        );

        expect(tree).toMatchSnapshot();
    });

    test('mobileDrawerContent prop adds a side drawer and burger button in mobile', () => {
        const tree = renderComponent(
            DeviceContextWrapped(
                <ApplicationMenu mobileDrawerContent={(<p>Test</p>)}>
                    Hello, World!
                </ApplicationMenu>,
                'mobile',
            ),
        );

        expect(tree).toMatchSnapshot();
    });
});
