import React, { ReactElement } from 'react';
import renderer from 'react-test-renderer';

import { DeviceContextWrapped } from '../../test-utils/device-context-wrapped';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { SideDrawer } from './side-drawer';

const renderComponent = (component: ReactElement) => {
    return renderer.create(ThemeWrapped(component)).toJSON();
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
            DeviceContextWrapped(
                <SideDrawer open width="50%">
                        <p>Test</p>
                </SideDrawer>,
                'mobile',
            ),
        );

        expect(tree).toMatchSnapshot();
    });
});
