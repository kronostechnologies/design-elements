import { SearchGlobal } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

const SearchGlobalMeta: Meta<typeof SearchGlobal> = {
    title: 'Components/Search Global',
    component: SearchGlobal,
    args: {
        onChange: (value) => console.info(`New value is : ${value}`),
        onSearch: (value) => console.info(`Searching for: ${value}`),
        onInputFocus: () => console.info('Input focused'),
    },
    argTypes: {
        onChange: {
            control: { disable: true },
        },
        onSearch: {
            control: { disable: true },
        },
        onInputFocus: {
            control: { disable: true },
        },
    },
};

export default SearchGlobalMeta;
type Story = StoryObj<typeof SearchGlobal>;

export const Default: Story = { ...SearchGlobalMeta };

export const EventCallbacks: Story = {
    ...SearchGlobalMeta,
    parameters: rawCodeParameters,
};
