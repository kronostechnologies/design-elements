import { SearchGlobal } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Search/Search Global',
    component: SearchGlobal,
};

export const Global: Story = () => (
    <SearchGlobal/>
);
export const Disabled: Story = () => (
    <SearchGlobal disabled />
);
export const EventCallback: Story = () => (
    <SearchGlobal
        onSearch={(value) => console.info(`Searching for: ${value}`)}
    />
);
