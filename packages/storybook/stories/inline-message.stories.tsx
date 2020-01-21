import React from 'react';

import { InlineMessage } from '@equisoft/design-elements-react';

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

export const mobile = () => (
    <>
        <InlineMessage device="mobile" type="info">
            Here's a contextual notice with an icon and title.
        </InlineMessage><br/>
        <InlineMessage device="mobile" type="success">
            Here's a contextual notice with an icon and title.
        </InlineMessage><br/>
        <InlineMessage device="mobile" type="alert">
            Here's a contextual notice with an icon and title.
        </InlineMessage><br/>
        <InlineMessage device="mobile" type="error">
            Here's a contextual notice with an icon and title.
        </InlineMessage><br/>
    </>
);
