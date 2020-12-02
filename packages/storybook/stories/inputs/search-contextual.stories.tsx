import { SearchContextual } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import * as React from 'react';

export default {
    title: 'Search/Search Contextual',
    component: SearchContextual,
};

export const Contextual: Story = () => (
    <SearchContextual />
);

export const Disabled: Story = () => (
    <SearchContextual disabled />
);
export const EventCallback: Story = () => (
    <SearchContextual
        onChange={(event) => console.info(`Searching for: ${event.currentTarget.value}`)}
    />
);
