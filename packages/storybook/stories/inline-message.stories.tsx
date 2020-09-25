import { InlineMessage } from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'Inline Message',
    component: InlineMessage,
};

export const inlineMessage = () => (
    <>
        <InlineMessage type="info">
            Here's a contextual notice with an icon and title.
        </InlineMessage><br/>
        <InlineMessage type="success">
            Here's a contextual notice with an icon and title.
        </InlineMessage><br/>
        <InlineMessage type="alert">
            Here's a contextual notice with an icon and title.
        </InlineMessage><br/>
        <InlineMessage type="error">
            Here's a contextual notice with an icon and title.
        </InlineMessage><br/>
    </>
);
