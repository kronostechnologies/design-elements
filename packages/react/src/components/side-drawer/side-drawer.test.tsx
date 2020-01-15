import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { SideDrawer } from './side-drawer';

describe('Side Drawer', () => {
    test('is open', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <SideDrawer open>
                    <p>Test</p>
                </SideDrawer>,
            ),
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('is closed on right side', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <SideDrawer open={false}>
                    <p>Test</p>
                </SideDrawer>,
            ),
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('is closed on left side', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <SideDrawer open={false} drawerOrigin="left">
                    <p>Test</p>
                </SideDrawer>,
            ),
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('has nested drawer', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <SideDrawer open drawerOrigin="left">
                    <SideDrawer open nested>
                        <p>Test</p>
                    </SideDrawer>
                </SideDrawer>,
            ),
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('has width set to 50%', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <SideDrawer open width="50%">
                        <p>Test</p>
                </SideDrawer>,
            ),
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
