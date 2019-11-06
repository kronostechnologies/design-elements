import React from 'react';

import { Link } from '@equisoft/design-elements-react';

export default {
    title: 'Link',
    component: Link,
};

export const all = () => (
    <>
        <Link href="/story" label="Navigation Link" iconName="mail"/><br/>
        <Link href="/story" label="Navigation Link"/><br/>
        <Link type="ext" href="#" label="External Link"  iconName="mail"/><br/>
        <Link type="ext" href="#" label="External Link"/><br/>
    </>
);

export const disabled = () => (
    <>
        <Link href="/story" label="Navigation Link" iconName="mail" disabled/><br/>
        <Link href="/story" label="Navigation Link" disabled/><br/>
        <Link type="ext" href="#" label="External Link" iconName="mail" disabled/><br/>
        <Link type="ext" href="#" label="External Link" disabled/><br/>
    </>
);
export const withIcon = () => (
    <Link href="/story" label="Navigation Link" iconName="mail"/>
);
export const navigationLink = () => (
    <Link href="/story" label="Navigation Link"/>
);
export const externalLink = () => (
    <Link type="ext" href="#" label="External Link"/>
);
