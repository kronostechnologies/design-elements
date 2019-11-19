import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../theme-wrapper/theme-wrapper.test';
import { SideDrawer } from './side-drawer';

describe('Side Drawer', () => {
    test('is open', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <SideDrawer open>
                    <ul>
                        <li>Test</li>
                    </ul>
                </SideDrawer>,
            ),
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('is closed on right side', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <SideDrawer open={false}>
                    <ul>
                        <li>Test</li>
                    </ul>
                </SideDrawer>,
            ),
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('is closed on left side', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <SideDrawer open={false} drawerOrigin="left">
                    <ul>
                        <li>Test</li>
                    </ul>
                </SideDrawer>,
            ),
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
