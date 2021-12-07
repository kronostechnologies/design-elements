import { Status } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';

export default {
    component: Status,
    title: 'Data/Status',
};

export const Normal: Story = () => (
    <>
        <Status type="enabled" label="Enabled" />
        <Status type="disabled" label="Disabled" />
        <Status type="blocked" label="Blocked" />
    </>
);
