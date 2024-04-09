import { Accordion, ItemsProps } from '@equisoft/design-elements-react';
import { Meta, StoryFn } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

// eslint-disable-next-line import/no-default-export
const accordionMeta: Meta<typeof Accordion> = {
    title: 'Components/Accordion',
    component: Accordion,
    parameters: rawCodeParameters,
    tags: ['autodocs'],
    argTypes: {
        id: {
            table: { disable: false },
        },
        items: {
            table: { disable: false },
        },
        mode: {
            table: { disable: false },
        },
    },
};

export default accordionMeta;

type Story = StoryFn<typeof Accordion>;

export const SingleSelect: Story = () => {
    const items: ItemsProps[] = [
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
    ];

    return <Accordion id="singleselect" items={items} />;
};

export const MultiSelect: Story = () => {
    const items: ItemsProps[] = [
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
    ];

    return <Accordion mode="multi" id="multiselect" items={items} />;
};
