import { Button, Icon } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { InvertedBackground } from './utils/inverted-background';
import { rawCodeParameters } from './utils/parameters';

const PlusIcon = styled(Icon).attrs({ name: 'plusSign', size: '16' })`
    margin-right: var(--spacing-1x);
`;

const ChevronDownIcon = styled(Icon).attrs({ name: 'chevronDown', size: '16' })`
    margin-left: var(--spacing-1x);
`;

export default {
    title: 'Components/Button',
    component: Button,
};

export const Buttons: Story = () => (
    <>
        <Button label="Primary" buttonType="primary" />
        <Button label="Secondary" buttonType="secondary" />
        <Button label="Tertiary" buttonType="tertiary" />
        <Button label="Destructive-Primary" buttonType="destructive-primary" />
        <Button label="Destructive-Secondary" buttonType="destructive-secondary" />
        <Button label="Destructive-Tertiary" buttonType="destructive-tertiary" />
    </>
);

export const Disabled: Story = () => (
    <>
        <Button label="Primary" buttonType="primary" disabled />
        <Button label="Secondary" buttonType="secondary" disabled />
        <Button label="Tertiary" buttonType="tertiary" disabled />
        <Button label="Destructive-Primary" buttonType="destructive-primary" disabled />
        <Button label="Destructive-Secondary" buttonType="destructive-secondary" disabled />
        <Button label="Destructive-Tertiary" buttonType="destructive-tertiary" disabled />
    </>
);

export const Inverted: Story = () => (
    <InvertedBackground>
        <Button label="Primary" buttonType="primary" inverted />
        <Button label="Secondary" buttonType="secondary" inverted />
        <Button label="Tertiary" buttonType="tertiary" inverted />
        <Button label="Destructive-Primary" buttonType="destructive-primary" inverted />
        <Button label="Destructive-Secondary" buttonType="destructive-secondary" inverted />
        <Button label="Destructive-Tertiary" buttonType="destructive-tertiary" inverted />
    </InvertedBackground>
);
export const InvertedDisabled: Story = () => (
    <InvertedBackground>
        <Button label="Primary" buttonType="primary" inverted disabled />
        <Button label="Secondary" buttonType="secondary" inverted disabled />
        <Button label="Tertiary" buttonType="tertiary" inverted disabled />
        <Button label="Destructive-Primary" buttonType="destructive-primary" inverted disabled />
        <Button label="Destructive-Secondary" buttonType="destructive-secondary" inverted disabled />
        <Button label="Destructive-Tertiary" buttonType="destructive-tertiary" inverted disabled />
    </InvertedBackground>
);

export const EventCallback: Story = () => (
    <Button
        label="See Console For Callback"
        onClick={() => console.info('The button has been clicked!')}
        buttonType="primary"
    />
);
EventCallback.parameters = rawCodeParameters;

export const WithIcons: Story = () => (
    <>
        <Button buttonType="primary">
            <PlusIcon />
            Primary
            <ChevronDownIcon />
        </Button>
        <Button buttonType="secondary">
            <PlusIcon />
            Secondary
            <ChevronDownIcon />
        </Button>
        <Button buttonType="tertiary">
            <PlusIcon />
            Tertiary
            <ChevronDownIcon />
        </Button>
        <Button buttonType="destructive-primary">
            <PlusIcon />
            Destructive Primary
            <ChevronDownIcon />
        </Button>
        <Button buttonType="destructive-secondary">
            <PlusIcon />
            Destructive Secondary
            <ChevronDownIcon />
        </Button>
        <Button buttonType="destructive-tertiary">
            <PlusIcon />
            Destructive Tertiary
            <ChevronDownIcon />
        </Button>
    </>
);

export const Small: Story = () => (
    <>
        <Button label="Primary" buttonType="primary" size="small" />
        <Button label="Secondary" buttonType="secondary" size="small" />
        <Button label="Tertiary" buttonType="tertiary" size="small" />
        <Button label="Destructive-Primary" buttonType="destructive-primary" size="small" />
        <Button label="Destructive-Secondary" buttonType="destructive-secondary" size="small" />
        <Button label="Destructive-Tertiary" buttonType="destructive-tertiary" size="small" />
    </>
);
