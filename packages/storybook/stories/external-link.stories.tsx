import React from 'react';

import { ExternalLink } from '@equisoft/design-elements-react';

export default {
    title: 'External Link',
    component: ExternalLink,
};

export const normal = () => (
    <ExternalLink label="External Link"/>
);

export const withIcon = () => (
    <ExternalLink label="External Link" iconName="mail"/>
);
export const onlyIcon = () => (
    <ExternalLink iconName="mail"/>
);
export const disabled = () => (
    <>
        <ExternalLink label="External Link" iconName="mail" disabled/><br/>
        <ExternalLink label="External Link" disabled/><br/>
    </>
);
export const withCallback = () => (
    <ExternalLink label="External Link" onClick={() => console.log('Link clicked')}/>
);
