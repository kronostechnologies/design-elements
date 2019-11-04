import React from 'react';

import { Link } from '@equisoft/design-elements-react';

export default {
    title: 'Link',
    component: Link,
};

export const all = () => (
    <div>
        <Link href="/story" label="Navigation Link"/>
        <Link href="/" label="Navigation Link" disabled/>
        <Link type="ext" href="https://github.com/" label="External Link"/>
        <Link type="ext" href="https://github.com/" label="External Link" disabled/>
    </div>
);

export const disabled = () => (
    <>
        <Link href="/" label="Navigation Link" disabled/>
        <Link type="ext" href="https://github.com/" label="External Link" disabled/>
    </>
);
export const navigationLink = () => (
    <Link href="/story" label="Navigation Link"/>
);
export const externalLink = () => (
    <Link type="ext" href="https://github.com/" label="External Link"/>
);
