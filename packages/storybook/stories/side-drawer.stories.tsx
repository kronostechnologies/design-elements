import React from 'react';
import styled from 'styled-components';

import { Button, SideDrawer } from '@equisoft/design-elements-react';
import { forceReRender } from '@storybook/react';

const Box = styled.div`
    background-color: #094C6C;
    border-radius: 8px;
    height: 20vh;
    margin-bottom: 16px;

    &:nth-child(2n) {
        background-color: #012639;
    }
`;

export default {
    title: 'Side Drawer',
    component: SideDrawer,
};

type DrawerType = 'normal' | 'withNestedDrawer' | 'nested' | 'scrollable' | 'left';

const allDrawers = {
    normal: false,
    withNestedDrawer: false,
    nested: false,
    scrollable: false,
    left: false,
};

const toggleDrawer = (drawer: DrawerType) => {
    allDrawers[drawer] = !allDrawers[drawer];
    forceReRender();
};

export const normal = () => (
    <>
        <SideDrawer open={allDrawers.normal}>
            <h3>Drawer Content</h3>
            <Button label="Close drawer" buttonType="primary" onClick={() => toggleDrawer('normal')}/>
        </SideDrawer>
        <Button label="Click to open side-drawer" buttonType="primary" onClick={() => toggleDrawer('normal')}/>
    </>
);

export const withNestedDrawer = () => (
    <>
        <SideDrawer open={allDrawers.withNestedDrawer}>
            <h3>Drawer Content</h3>
            <SideDrawer open={allDrawers.nested} nested>
                <h3>Nested Drawer Content</h3>
                <Button label="Close drawer" buttonType="primary" onClick={() => toggleDrawer('nested')}/>
            </SideDrawer>
            <Button label="Open nested drawer" buttonType="primary" onClick={() => toggleDrawer('nested')} /><br/>
            <Button label="Close drawer" buttonType="primary" onClick={() => toggleDrawer('withNestedDrawer')}/>
        </SideDrawer>
        <Button
            label="Click to open side-drawer"
            buttonType="primary"
            onClick={() => toggleDrawer('withNestedDrawer')}
        />
    </>
);

export const scrollable = () => (
    <>
        <SideDrawer open={allDrawers.scrollable}>
            <h3>Drawer with scrollable content</h3>
            <div>
                {[...Array(6).keys()].map(el => <Box key={el}/>)}
            </div>
            <Button label="Close drawer" buttonType="primary" onClick={() => toggleDrawer('scrollable')}/>
        </SideDrawer>
        <Button label="Click to open side-drawer" buttonType="primary" onClick={() => toggleDrawer('scrollable')}/>
    </>
);

export const leftOrigin = () => (
    <>
        <SideDrawer open={allDrawers.left} drawerOrigin="left">
            <h3>Drawer Content</h3>
            <Button label="Close drawer" buttonType="primary" onClick={() => toggleDrawer('left')}/>
        </SideDrawer>
        <Button label="Click to open side-drawer" buttonType="primary" onClick={() => toggleDrawer('left')}/>
    </>
);
