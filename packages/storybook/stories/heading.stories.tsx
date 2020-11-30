import { Heading } from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'Heading',
    component: Heading,
};

export const normal = () => (
    <>
        <Heading type="xlarge">Heading (Xlarge)</Heading>
        <Heading type="large">Heading (Large)</Heading>
        <Heading type="large" bold>Heading (Large bold)</Heading>
        <Heading type="medium">Heading (Medium)</Heading>
        <Heading type="medium" bold>Heading (Medium bold)</Heading>
        <Heading type="small">Heading (Small)</Heading>
        <Heading type="small" bold>Heading (Small bold)</Heading>
    </>
);

export const withoutMargins = () => (
    <Heading type="medium" noMargin>Heading (Medium)</Heading>
);

export const withDifferentTag = () => (
    <Heading type="medium" tag="h4">Heading (Medium)</Heading>
);
