import { ExternalLink } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Navigation/External Link',
    component: ExternalLink,
};

export const Normal: Story = () => (
    <ExternalLink label="External Link" />
);

export const WithIcon: Story = () => (
    <ExternalLink label="External Link" iconName="mail" />
);
export const OnlyIcon: Story = () => (
    <ExternalLink iconName="mail" />
);
export const Disabled: Story = () => (
    <>
        <ExternalLink label="External Link" iconName="mail" disabled />
        <br />
        <ExternalLink label="External Link" disabled />
        <br />
    </>
);
export const WithCallback: Story = () => (
    <ExternalLink label="External Link" onClick={() => console.info('Link clicked')} />
);
WithCallback.parameters = rawCodeParameters;
