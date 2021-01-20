import React from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { ApplicationMenu } from './application-menu';

describe('Application Menu', () => {
    test('Matches the snapshot (desktop)', () => {
        const tree = renderWithProviders(
            <ApplicationMenu mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </ApplicationMenu>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot (mobile)', () => {
        const tree = renderWithProviders(
            <ApplicationMenu mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </ApplicationMenu>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('mobileDrawerContent prop adds a side drawer and burger button in mobile', () => {
        const tree = renderWithProviders(
            <ApplicationMenu mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </ApplicationMenu>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
