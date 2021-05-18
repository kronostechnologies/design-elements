import React from 'react';
import { MenuButton } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';

export default {
    title: 'Menu Button',
    component: MenuButton,
};

const options = [
    {
        label: 'Aption 1',
        onClick: () => console.info('Option 1 clicked'),
    },
    {
        label: 'Bption 2',
        onClick: () => console.info('Option 2 clicked'),
    },
    {
        label: 'Cption 3',
        onClick: () => console.info('Option 3 clicked'),
    },
];

export const Normal: Story = () => (
    <div style={{ display: 'flex' }}>
        <MenuButton options={options} buttonType="primary" />
        <MenuButton options={options} buttonType="secondary" />
        <MenuButton options={options} buttonType="tertiary" />
        <MenuButton options={options} buttonType="destructive" />
    </div>
);

export const DefaultOpen: Story = () => (
    <MenuButton options={options} defaultOpen buttonType="primary" />
);
