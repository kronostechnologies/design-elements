import { NumericInput } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Components/Numeric Input',
    component: NumericInput,
};

export const Default: Story = () => (
    <NumericInput
        label="Number"
        defaultValue="50"
    />
);
