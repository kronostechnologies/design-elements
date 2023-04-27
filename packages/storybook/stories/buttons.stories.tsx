import { Button, Icon } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
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
    title: 'Controls/Button',
    component: Button,
};

export const Buttons: Story = () => (
    <>
        <Button label="Primary" buttonType="primary" />
        <Button label="Secondary" buttonType="secondary" />
        <Button label="Tertiary" buttonType="tertiary" />
        <Button label="Destructive" buttonType="destructive" />
    </>
);

export const Disabled: Story = () => (
    <>
        <Button label="Primary" buttonType="primary" disabled />
        <Button label="Secondary" buttonType="secondary" disabled />
        <Button label="Tertiary" buttonType="tertiary" disabled />
        <Button label="Destructive" buttonType="destructive" disabled />
    </>
);

export const Inverted: Story = () => (
    <InvertedBackground>
        <Button label="Primary" buttonType="primary" inverted />
        <Button label="Secondary" buttonType="secondary" inverted />
        <Button label="Tertiary" buttonType="tertiary" inverted />
        <Button label="Destructive" buttonType="destructive" inverted />
    </InvertedBackground>
);
export const InvertedDisabled: Story = () => (
    <InvertedBackground>
        <Button label="Primary" buttonType="primary" inverted disabled />
        <Button label="Secondary" buttonType="secondary" inverted disabled />
        <Button label="Tertiary" buttonType="tertiary" inverted disabled />
        <Button label="Destructive" buttonType="destructive" inverted disabled />
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
        <Button buttonType="destructive">
            <PlusIcon />
            Destructive
            <ChevronDownIcon />
        </Button>
    </>
);

export const Small: Story = () => (
    <>
        <Button label="Primary" buttonType="primary" size="small" />
        <Button label="Secondary" buttonType="secondary" size="small" />
        <Button label="Tertiary" buttonType="tertiary" size="small" />
        <Button label="Destructive" buttonType="destructive" size="small" />
    </>
);
