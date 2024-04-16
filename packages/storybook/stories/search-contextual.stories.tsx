import { SearchContextual } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Search Contextual',
    component: SearchContextual,
};

export const Default: Story = () => (
    <SearchContextual />
);

export const EventCallbacks: Story = () => (
    <SearchContextual
        onChange={(value) => console.info(`New value is : ${value}`)}
        onSearch={(value) => console.info(`Searching for: ${value}`)}
        onInputFocus={() => console.info('Input focused')}
    />
);
EventCallbacks.parameters = rawCodeParameters;

