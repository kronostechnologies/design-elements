import React, { ReactElement } from 'react';

import { renderWithProviders } from '@design-elements/test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { SideDrawer } from './side-drawer';

const renderComponent = (component: ReactElement, device?: DeviceType) => {
    return renderWithProviders(component, device);
};

describe('Side Drawer', () => {
    test('Is open', () => {
        const tree = renderComponent(
            <SideDrawer open>
                <p>Test</p>
            </SideDrawer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Is closed on right side', () => {
        const tree = renderComponent(
            <SideDrawer open={false}>
                <p>Test</p>
            </SideDrawer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Is closed on left side', () => {
        const tree = renderComponent(
            <SideDrawer open={false} drawerOrigin="left">
                <p>Test</p>
            </SideDrawer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has nested drawer', () => {
        const tree = renderComponent(
            <SideDrawer open drawerOrigin="left">
                <SideDrawer open nested>
                    <p>Test</p>
                </SideDrawer>
            </SideDrawer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has width set to 50%', () => {
        const tree = renderComponent(
            <SideDrawer open width="50%">
                <p>Test</p>
            </SideDrawer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has different height when in mobile', () => {
        const tree = renderComponent(
            <SideDrawer open width="50%">
                    <p>Test</p>
            </SideDrawer>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
