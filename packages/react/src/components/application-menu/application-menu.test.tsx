import React, { ReactElement } from 'react';

import { renderWithProviders } from '@design-elements/test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { ApplicationMenu } from './application-menu';

const renderComponent = (component: ReactElement, device?: DeviceType) => {
    return renderWithProviders(component, device);
};

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
            <ApplicationMenu mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </ApplicationMenu>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('mobileDrawerContent prop adds a side drawer and burger button in mobile', () => {
        const tree = renderComponent(
            <ApplicationMenu mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </ApplicationMenu>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
