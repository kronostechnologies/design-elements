import { Button, SideDrawer } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Side Drawer',
    component: SideDrawer,
    parameters: rawCodeParameters,
};

export const Default: Story = () => {
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
