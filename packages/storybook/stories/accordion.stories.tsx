import { Accordion, AccordionItem } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Accordion> = {
    title: 'Components/Accordion',
    component: Accordion,
    argTypes: {
        items: {
            control: { disable: true },
        },
        onToggle: {
            control: { disable: true },
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
        ] satisfies AccordionItem[],
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
        ] satisfies AccordionItem[],
        mode: 'multi',
    },
};
