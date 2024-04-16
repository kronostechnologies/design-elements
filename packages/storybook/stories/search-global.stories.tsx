import { SearchGlobal } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Search Global',
    component: SearchGlobal,
};

export const Default: Story = () => (
    <SearchGlobal />
);

export const EventCallbacks: Story = () => (
    <SearchGlobal
        onChange={(value) => console.info(`New value is : ${value}`)}
        onSearch={(value) => console.info(`Searching for: ${value}`)}
        onInputFocus={() => console.info('Input focused')}
    />
);
EventCallbacks.parameters = rawCodeParameters;
