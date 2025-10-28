import { FilterMulti, type FilterOption } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof FilterMulti> = {
    title: 'Components/FilterMulti',
    component: FilterMulti,
    args: {
        label: 'Something',
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
            { label: 'Option 4', value: 'option4' },
        ],
    },
};

export default meta;

type Story = StoryObj<typeof FilterMulti>;

export const Default: Story = {
    render: (args) => {
        const [value, setValue] = useState<string[]>();
        return (
            <FilterMulti
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onChange={setValue}
                value={value}
            />
        );
    },
};

export const Async: Story = {
    render: (args) => {
        const [value, setValue] = useState<string[]>();
        return (
            <FilterMulti
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                async
                onChange={setValue}
                value={value}
            />
        );
    },
};

const moreThanTenOptions: FilterOption[] = Array.from({ length: 15 }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: `option${i + 1}`,
}));

export const WithSearch: Story = {
    render: (args) => {
        const [value, setValue] = useState<string[]>();
        return (
            <FilterMulti
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onChange={setValue}
                options={moreThanTenOptions}
                value={value}
            />
        );
    },
};
