import { SearchContextual } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

const SearchContextualMeta: Meta<typeof SearchContextual> = {
    title: 'Components/Search Contextual',
    component: SearchContextual,
    argTypes: {
        onChange: {
            control: { type: null },
        },
        onInputFocus: {
            control: { type: null },
        },
        onReset: {
            control: { type: null },
        },
        onSearch: {
            control: { type: null },
        },
    },
};

export default SearchContextualMeta;
type Story = StoryObj<typeof SearchContextual>;

export const Default: Story = {};

export const EventCallbacks: Story = {
    parameters: rawCodeParameters,
    args: {
        onChange: (value) => console.info(`New value is : ${value}`),
        onSearch: (value) => console.info(`Searching for: ${value}`),
        onInputFocus: () => console.info('Input focused'),
    },
};
