import React from 'react';

import { Link } from '@equisoft/design-elements-react';

export default {
    title: 'Link',
    component: Link,
};

export const all = () => (
    <div>
        <Link href="https://github.com/" label="Navigation Link"/>
        <Link type="ext" href="https://github.com/" label="External Link" disabled/>
    </div>
);
