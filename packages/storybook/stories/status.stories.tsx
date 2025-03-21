import { Status } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    component: Status,
    title: 'Components/Deprecated/Status (deprecated)',
    tags: ['autodocs'],
};

export const Normal: Story = () => (
    <>
        <Status type="enabled" label="Enabled" />
        <Status type="disabled" label="Disabled" />
        <Status type="blocked" label="Blocked" />
    </>
);
