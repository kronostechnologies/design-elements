import { Checkbox } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Components/Checkbox',
    component: Checkbox,
};

export const Default: Story = () => (
    <>
        <Checkbox label="Send by email" name="checkbox2" value="normal" />
    </>
);
