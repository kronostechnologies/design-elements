import React from 'react';

import { ExternalLink } from '@equisoft/design-elements-react';

export default {
    title: 'External Link',
    component: ExternalLink,
};

export const normal = () => (
    <ExternalLink href="#" label="External Link"/>
);

export const withIcon = () => (
    <ExternalLink href="#" label="External Link" iconName="mail"/>
);
export const onlyIcon = () => (
    <ExternalLink href="#" iconName="mail"/>
);
export const disabled = () => (
    <>
        <ExternalLink href="#" label="External Link" iconName="mail" disabled/><br/>
        <ExternalLink href="#" label="External Link" disabled/><br/>
    </>
);
export const withCallback = () => (
    <ExternalLink href="#" label="External Link" onClick={() => console.log('Link clicked')}/>
);
