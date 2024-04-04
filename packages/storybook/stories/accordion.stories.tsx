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

export const Default: Story = () => {
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

    return <Accordion id="default" items={items} />;
};

export const MultiOpenToggle: Story = () => {
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

    return <Accordion mode="multi" id="multi" items={items} />;
};

export const DefaultExpanded: Story = () => {
    const items: ItemsProps[] = [
        {
            title: 'Panel Title 1',
            content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            expanded: true,
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

    return <Accordion id="expanded" items={items} />;
};

export const DefaultDisabled: Story = () => {
    const items: ItemsProps[] = [
        {
            title: 'Panel Title 1',
            content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
        },
        {
            title: 'Panel Title 2',
            content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            disabled: true,
        },
        {
            title: 'Panel Title 3',
            content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
        },
    ];

    return <Accordion id="disabled" items={items} />;
};

export const OnToggle: Story = () => {
    const onToggle = (itemId: string, expanded: boolean): void => {
        // eslint-disable-next-line no-console
        console.log(itemId, expanded);
    };
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

    return <Accordion id="handleToggle" items={items} onToggle={onToggle} />;
};
