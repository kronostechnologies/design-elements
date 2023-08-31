import { AccordionItem, Accordion } from '@equisoft/design-elements-react';
import { Meta, StoryFn } from '@storybook/react';

// eslint-disable-next-line import/no-default-export
const accordionMeta: Meta<typeof AccordionItem> = {
    title: 'Disclosure/Accordion',
    component: AccordionItem,
    tags: ['autodocs'],
    argTypes: {
        id: {
            table: { disable: true },
        },
        type: {
            table: { disable: true },
        },
        isExpanded: {
            table: { disable: true },
        },
        onToggle: {
            table: { disable: true },
        },
        disabled: {
            table: { disable: true },
        },
        onKeyDown: {
            table: { disable: true },
        },
        buttonRef: {
            table: { disable: true },
        },
    },
};

export default accordionMeta;

type Story = StoryFn<typeof AccordionItem>;

export const Default: Story = () => (
    <Accordion id="default">
        <AccordionItem title="Panel Title 1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </AccordionItem>
        <AccordionItem title="Panel Title 2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </AccordionItem>
        <AccordionItem title="Panel Title 3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </AccordionItem>
    </Accordion>
);

export const MultiOpenToggle: Story = () => (
    <Accordion mode="multi" id="multi">
        <AccordionItem title="Panel Title 1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </AccordionItem>
        <AccordionItem title="Panel Title 2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </AccordionItem>
        <AccordionItem title="Panel Title 3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </AccordionItem>
    </Accordion>
);

export const DefaultExpanded: Story = () => (
    <Accordion id="single">
        <AccordionItem title="Panel Title 1" isExpanded>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </AccordionItem>
        <AccordionItem title="Panel Title 2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </AccordionItem>
        <AccordionItem title="Panel Title 3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </AccordionItem>
    </Accordion>
);

export const DefaultDisabled: Story = () => (
    <Accordion id="diabled">
        <AccordionItem title="Panel Title 1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </AccordionItem>
        <AccordionItem title="Panel Title 2" disabled>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </AccordionItem>
        <AccordionItem title="Panel Title 3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </AccordionItem>
    </Accordion>
);
