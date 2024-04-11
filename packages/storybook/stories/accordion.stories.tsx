import { Accordion } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Accordion> = {
    title: 'Components/Accordion',
    component: Accordion,
    argTypes: {
        items: {
            control: { type: null },
        },
        onToggle: {
            control: { type: null },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const SingleSelect: Story = {
    args: {
        items: [
            {
                title: 'Panel Title 1',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 2',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 3',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
        ],
    },
};

export const MultiSelect: Story = {
    args: {
        items: [
            {
                title: 'Panel Title 1',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 2',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 3',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
        ],
        mode: 'multi',
    },
};
