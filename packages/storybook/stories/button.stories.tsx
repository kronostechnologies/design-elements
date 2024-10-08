import { Button, Icon } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

const PlusIcon = styled(Icon).attrs({ name: 'plusSign', size: '16' })`
    margin-right: var(--spacing-1x);
`;

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        onClick: {
            control: { disable: true },
        },
        onKeyDown: {
            control: { disable: true },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        buttonType: 'primary',
        label: 'Primary',
    },
};

export const Secondary: Story = {
    args: {
        buttonType: 'secondary',
        label: 'Secondary',
    },
};

export const Tertiary: Story = {
    args: {
        buttonType: 'tertiary',
        label: 'Tertiary',
    },
};

export const DestructivePrimary: Story = {
    args: {
        buttonType: 'destructive-primary',
        label: 'Destructive Primary',
    },
};

export const DestructiveSecondary: Story = {
    args: {
        buttonType: 'destructive-secondary',
        label: 'Destructive Secondary',
    },
};

export const DestructiveTertiary: Story = {
    args: {
        buttonType: 'destructive-tertiary',
        label: 'Destructive Tertiary',
    },
};

export const PrimaryLoading: Story = {
    args: {
        buttonType: 'primary',
        disabled: true,
        label: 'Submit',
        loading: true,
    },
};

export const PrimaryWithIcon: Story = {
    args: {
        buttonType: 'primary',
    },
    render: (args) => (
        <Button {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            <PlusIcon />
            Add
        </Button>
    ),
};

export const PrimaryWithIconsOnBothSides: Story = {
    args: {
        buttonType: 'primary',
        label: 'Icons on both sides',
        size: 'medium',
        leftIconName: 'chevronLeft',
        rightIconName: 'chevronRight',
    },
    render: (args) => (
        <Button {...args /* eslint-disable-line react/jsx-props-no-spreading */} />
    ),
};
