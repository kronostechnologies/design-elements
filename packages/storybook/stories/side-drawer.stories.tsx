import { Button, SideDrawer } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

const SideDrawerMeta: Meta<typeof SideDrawer> = {
    title: 'Components/Side Drawer',
    component: SideDrawer,
    parameters: rawCodeParameters,
};

export default SideDrawerMeta;
type Story = StoryObj<typeof SideDrawer>;

export const Default: Story = {
    render: (args) => {
        const [isDrawerOpen, setDrawerOpen] = useState(false);

        return (
            <>
                <SideDrawer
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...args}
                    open={isDrawerOpen}
                >
                    <h3>Drawer Content</h3>
                    <Button label="Close drawer" buttonType="primary" onClick={() => setDrawerOpen(false)} />
                </SideDrawer>
                <Button label="Click to open side-drawer" buttonType="primary" onClick={() => setDrawerOpen(true)} />
            </>
        );
    },
};
