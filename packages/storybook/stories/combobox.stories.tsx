import { Combobox } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';

export default {
    title: 'Controls/Combobox',
    component: Combobox,
};

const options = [
    {
        label: 'Option A',
        value: 'optionA',
    },
    {
        label: 'Option B',
        value: 'optionB',
    },
    {
        label: 'Option C',
        value: 'optionC',
    },
    {
        label: 'Option D',
        value: 'optionD',
    },
];

export const Normal: Story = () => (
    <>
        <Combobox
            options={options}
        />
    </>
);
