import React from 'react';

import { Button, SideDrawer } from '@equisoft/design-elements-react';
import { forceReRender } from '@storybook/react';

export default {
    title: 'Side Drawer',
    component: SideDrawer,
};

type drawerType = 'main' | 'second' | 'nested' | 'scrollable' | 'left';

const allDrawers = {
    main: false,
    second: false,
    nested: false,
    scrollable: false,
    left: false,
};

const HandleClick = (drawer: drawerType) => {
    allDrawers[drawer] = !allDrawers[drawer];
    forceReRender();
};

export const normal = () => (
    <>
        <SideDrawer open={allDrawers.main}>
            <h3>Drawer Content</h3>
            <Button label="Close drawer" buttonType="primary" onClick={() => HandleClick('main')}/>
        </SideDrawer>
        <Button label="Click to open side-drawer" buttonType="primary" onClick={() => HandleClick('main')}/>
    </>
);

export const withNestedDrawer = () => (
    <>
        <SideDrawer open={allDrawers.second}>
            <h3>Drawer Content</h3>
            <SideDrawer open={allDrawers.nested} nested>
                <h3>Nested Drawer Content</h3>
                <Button label="Close drawer" buttonType="primary" onClick={() => HandleClick('nested')}/>
            </SideDrawer>
            <Button label="Open nested drawer" buttonType="primary" onClick={() => HandleClick('nested')} /><br/>
            <Button label="Close drawer" buttonType="primary" onClick={() => HandleClick('second')}/>
        </SideDrawer>
        <Button label="Click to open side-drawer" buttonType="primary" onClick={() => HandleClick('second')}/>
    </>
);

export const scrollable = () => (
    <>
        <SideDrawer open={allDrawers.scrollable}>
            <h3>Drawer Content</h3>
            <div style={{ backgroundColor: 'lightgray', height: '1200px', margin: '20px 0' }}/>
            <Button label="Close drawer" buttonType="primary" onClick={() => HandleClick('scrollable')}/>
        </SideDrawer>
        <Button label="Click to open side-drawer" buttonType="primary" onClick={() => HandleClick('scrollable')}/>
    </>
);

export const leftOrigin = () => (
    <>
        <SideDrawer open={allDrawers.left} drawerOrigin="left">
            <h3>Drawer Content</h3>
            <Button label="Close drawer" buttonType="primary" onClick={() => HandleClick('left')}/>
        </SideDrawer>
        <Button label="Click to open side-drawer" buttonType="primary" onClick={() => HandleClick('left')}/>
    </>
);
