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
            control: { type: null },
        },
        onDismiss: {
            control: { type: null },
        },
    },
};

export default meta;

type Story = StoryObj<typeof SectionalBanner>;

export const Neutral: Story = {
    args: {
        type: 'neutral',
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
        type: 'info',
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

export const Success: Story = {
    args: {
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
        type: 'alert',
    },
    render: (args) => {
        const [dismissed, setDismissed] = useState<boolean>(false);

        return !dismissed ? (
            <SectionalBanner
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                onDismiss={() => setDismissed(true)}
            >
                Here&apos;s a contextual notice with an icon and title.
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
