import { StoryFn as Story } from '@storybook/react';
import { PasswordInput } from '@equisoft/design-elements-react';

export default {
    title: 'Components/Password Input',
    component: PasswordInput,
};

export const Default: Story = () => (
    <PasswordInput
        label="Password Label"
        defaultValue="Pass123"
        onChange={(password, event) => {
            console.info(password);
            console.info(event);
        }}
    />
);
