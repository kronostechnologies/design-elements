import { Heading } from '@equisoft/design-elements-react';
import { VoidFunctionComponent } from 'react';

export default {
    title: 'Foundations/Typography/Heading',
    component: Heading,
};

export const Normal: VoidFunctionComponent = () => (
    <>
        <Heading type="xlarge">Heading (Xlarge)</Heading>
        <Heading type="large">Heading (Large)</Heading>
        <Heading type="large" bold>Heading (Large bold)</Heading>
        <Heading type="medium">Heading (Medium)</Heading>
        <Heading type="medium" bold>Heading (Medium bold)</Heading>
        <Heading type="small">Heading (Small)</Heading>
        <Heading type="small" bold>Heading (Small bold)</Heading>
        <Heading type="subtitle">Heading (Subtitle)</Heading>
        <Heading type="subtitle" bold>Heading (Subtitle bold)</Heading>
    </>
);

export const WithoutMargins: VoidFunctionComponent = () => (
    <Heading type="medium" noMargin>Heading (Medium)</Heading>
);

export const WithDifferentTag: VoidFunctionComponent = () => (
    <Heading type="medium" tag="h4">Heading (Medium)</Heading>
);
