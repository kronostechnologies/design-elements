import React from 'react';

import { Link } from '@equisoft/design-elements-react';

export default {
    title: 'Link',
    component: Link,
};

export const all = () => (
    <div>
        <Link href="/story" label="Navigation Link" iconName="mail"/>
        <Link href="/" label="Navigation Link"/>
        <Link type="ext" href="https://github.com/" label="External Link"  iconName="mail"/>
        <Link type="ext" href="https://github.com/" label="External Link"/>
    </div>
);

export const disabled = () => (
    <>
        <Link href="/" label="Navigation Link" iconName="mail" disabled/>
        <Link href="/" label="Navigation Link" disabled/>
        <Link type="ext" href="https://github.com/" label="External Link" iconName="mail" disabled/>
        <Link type="ext" href="https://github.com/" label="External Link" disabled/>
    </>
);
export const withIcon = () => (
    <Link href="/story" label="Navigation Link" iconName="mail"/>
);
export const navigationLink = () => (
    <Link href="/story" label="Navigation Link"/>
);
export const externalLink = () => (
    <Link type="ext" href="https://github.com/" label="External Link"/>
);
