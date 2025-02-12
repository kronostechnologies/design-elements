import { Button, SectionalBanner } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';

const Container = styled.div`
    > * + * {
        margin-top: 1rem;
    }
`;

const meta: Meta<typeof SectionalBanner> = {
    title: 'Components/Sectional Banner',
    component: SectionalBanner,
    decorators: [decorateWith(Container)],
    argTypes: {
        onButtonClicked: {
            control: { disable: true },
        },
        onDismiss: {
            control: { disable: true },
        },
    },
};

export default meta;

type Story = StoryObj<typeof SectionalBanner>;

export const Neutral: Story = {
    args: {
        title: 'Neutral',
        type: 'neutral',
        buttonLabel: 'Click me',
    },
    render: (args) => {
        const [dismissed, setDismissed] = useState<boolean>(false);

        return !dismissed ? (
            <SectionalBanner
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onDismiss={() => setDismissed(true)}
            >
                Here&apos;s a contextual notice with an icon and title.
            </SectionalBanner>
        ) : (
            <Button buttonType="primary" onClick={() => setDismissed(false)}>Show banner</Button>
        );
    },
};

export const Informative: Story = {
    args: {
        title: 'Informative',
        type: 'info',
        buttonLabel: 'Click me',
    },
    render: (args) => {
        const [dismissed, setDismissed] = useState<boolean>(false);

        return !dismissed ? (
            <SectionalBanner
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onDismiss={() => setDismissed(true)}
            >
                <p>Here&apos;s a contextual notice with an icon and title.</p>
                <ul>
                    <li>patate</li>
                    <li>patate</li>
                    <li>patate</li>
                </ul>
            </SectionalBanner>
        ) : (
            <Button buttonType="primary" onClick={() => setDismissed(false)}>Show banner</Button>
        );
    },
};

export const Success: Story = {
    args: {
        title: 'Success',
        type: 'success',
    },
    render: (args) => {
        const [dismissed, setDismissed] = useState<boolean>(false);

        return !dismissed ? (
            <SectionalBanner
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onDismiss={() => setDismissed(true)}
            >
                Here&apos;s a contextual notice with an icon and title.
            </SectionalBanner>
        ) : (
            <Button buttonType="primary" onClick={() => setDismissed(false)}>Show banner</Button>
        );
    },
};

export const Warning: Story = {
    args: {
        title: 'Warning',
        type: 'warning',
    },
    render: (args) => {
        const [dismissed, setDismissed] = useState<boolean>(false);

        return !dismissed ? (
            <SectionalBanner
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onDismiss={() => setDismissed(true)}
            >
                Here&apos;s a contextual notice with an icon and title.
            </SectionalBanner>
        ) : (
            <Button buttonType="primary" onClick={() => setDismissed(false)}>Show banner</Button>
        );
    },
};

export const Alert: Story = {
    args: {
        title: 'Alert',
        type: 'alert',
    },
    render: (args) => {
        const [dismissed, setDismissed] = useState<boolean>(false);

        return !dismissed ? (
            <SectionalBanner
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onDismiss={() => setDismissed(true)}
            >
                <p>Here&apos;s a contextual notice with an icon and title.</p>
                <p>Some sub title</p>
                <ul>
                    <li>Some bullet points</li>
                    <li>Some bullet points</li>
                </ul>
            </SectionalBanner>
        ) : (
            <Button buttonType="primary" onClick={() => setDismissed(false)}>Show banner</Button>
        );
    },
};

export const Discovery: Story = {
    args: {
        title: 'Discovery',
        type: 'discovery',
    },
    render: (args) => {
        const [dismissed, setDismissed] = useState<boolean>(false);

        return !dismissed ? (
            <SectionalBanner
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onDismiss={() => setDismissed(true)}
            >
                Here&apos;s a contextual notice with an icon and title.
            </SectionalBanner>
        ) : (
            <Button buttonType="primary" onClick={() => setDismissed(false)}>Show banner</Button>
        );
    },
};
