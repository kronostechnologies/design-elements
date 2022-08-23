import { SearchGlobal } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import { useRef, useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Controls/Search Global',
    component: SearchGlobal,
};

export const Global: Story = () => (
    <SearchGlobal />
);
export const Disabled: Story = () => (
    <SearchGlobal disabled />
);
export const EventCallbacks: Story = () => (
    <SearchGlobal
        onChange={(value) => console.info(`New value is : ${value}`)}
        onSearch={(value) => console.info(`Searching for: ${value}`)}
        onInputFocus={() => console.info('Input focused')}
    />
);
EventCallbacks.parameters = rawCodeParameters;

export const WithReset: Story = () => {
    const [value, setValue] = useState('');

    return (
        <SearchGlobal
            value={value}
            onChange={setValue}
            onReset={() => setValue('')}
        />
    );
};
WithReset.parameters = rawCodeParameters;

export const WithForwardRef: Story = () => {
    const [value, setValue] = useState('');
    const ref = useRef<HTMLInputElement>();

    return (
        <SearchGlobal
            ref={ref}
            value={value}
            onChange={setValue}
            onReset={() => setValue('')}
        />
    );
};
WithForwardRef.parameters = rawCodeParameters;
