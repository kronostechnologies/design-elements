import { Button, SideDrawer } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
    background-color: #094c6c;
    border-radius: 8px;
    height: 20vh;
    margin-bottom: 16px;

    &:nth-child(2n) {
        background-color: #012639;
    }
`;

export default {
    title: 'Structure/Side Drawer',
    component: SideDrawer,
};

export const Normal: Story = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <SideDrawer open={isDrawerOpen}>
                <h3>Drawer Content</h3>
                <Button label="Close drawer" buttonType="primary" onClick={() => setDrawerOpen(false)} />
            </SideDrawer>
            <Button label="Click to open side-drawer" buttonType="primary" onClick={() => setDrawerOpen(true)} />
        </>
    );
};

export const WithNestedDrawer: Story = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [isNestedDrawerOpen, setNestedDrawerOpen] = useState(false);

    return (
        <>
            <SideDrawer open={isDrawerOpen}>
                <h3>Drawer Content</h3>
                <SideDrawer open={isNestedDrawerOpen} nested>
                    <h3>Nested Drawer Content</h3>
                    <Button label="Close drawer" buttonType="primary" onClick={() => setNestedDrawerOpen(false)} />
                </SideDrawer>
                <Button label="Open nested drawer" buttonType="primary" onClick={() => setNestedDrawerOpen(true)} />
                <br />
                <Button label="Close drawer" buttonType="primary" onClick={() => setDrawerOpen(false)} />
            </SideDrawer>
            <Button
                label="Click to open side-drawer"
                buttonType="primary"
                onClick={() => setDrawerOpen(true)}
            />
        </>
    );
};

export const Scrollable: Story = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <SideDrawer open={isDrawerOpen}>
                <h3>Drawer with scrollable content</h3>
                <div>
                    {[...Array(6).keys()].map((el) => <Box key={el} />)}
                </div>
                <Button label="Close drawer" buttonType="primary" onClick={() => setDrawerOpen(false)} />
            </SideDrawer>
            <Button label="Click to open side-drawer" buttonType="primary" onClick={() => setDrawerOpen(true)} />
        </>
    );
};

export const LeftOrigin: Story = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <SideDrawer open={isDrawerOpen} drawerOrigin="left">
                <h3>Drawer Content</h3>
                <Button label="Close drawer" buttonType="primary" onClick={() => setDrawerOpen(false)} />
            </SideDrawer>
            <Button label="Click to open side-drawer" buttonType="primary" onClick={() => setDrawerOpen(true)} />
        </>
    );
};

export const VariableWidth: Story = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <SideDrawer open={isDrawerOpen} width="50%">
                <h3>Drawer content</h3>
                <Button label="Close drawer" buttonType="primary" onClick={() => setDrawerOpen(false)} />
            </SideDrawer>
            <Button
                label="Click to open side-drawer"
                buttonType="primary"
                onClick={() => setDrawerOpen(true)}
            />
        </>
    );
};
