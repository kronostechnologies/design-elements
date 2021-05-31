import { InlineMessage } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Feedback/Inline Message',
    component: InlineMessage,
};

export const AllMessageTypes: Story = () => (
    <>
        <InlineMessage type="info">
            Here&apos;s a contextual notice with an icon and title.
        </InlineMessage>
        <br />
        <InlineMessage type="success">
            Here&apos;s a contextual notice with an icon and title.
        </InlineMessage>
        <br />
        <InlineMessage type="alert">
            Here&apos;s a contextual notice with an icon and title.
        </InlineMessage>
        <br />
        <InlineMessage type="error">
            Here&apos;s a contextual notice with an icon and title.
        </InlineMessage>
        <br />
    </>
);
