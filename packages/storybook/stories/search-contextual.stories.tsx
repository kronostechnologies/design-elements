import { SearchContextual } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import { useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Controls/Search Contextual',
    component: SearchContextual,
};

export const Contextual: Story = () => (
    <SearchContextual />
);

export const Disabled: Story = () => (
    <SearchContextual disabled />
);

export const EventCallbacks: Story = () => (
    <SearchContextual
        onChange={(value) => console.info(`New value is : ${value}`)}
        onSearch={(value) => console.info(`Searching for: ${value}`)}
        onInputFocus={() => console.info('Input focused')}
    />
);
EventCallbacks.parameters = rawCodeParameters;

export const WithReset: Story = () => {
    const [value, setValue] = useState('');

    return (
        <SearchContextual
            value={value}
            onChange={setValue}
            onReset={() => setValue('')}
        />
    );
};
WithReset.parameters = rawCodeParameters;
