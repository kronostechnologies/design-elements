import { AccordionContainer, Accordion } from '@equisoft/design-elements-react';
import { Meta, StoryFn } from '@storybook/react';

// eslint-disable-next-line import/no-default-export
const accordionMeta: Meta<typeof Accordion> = {
    title: 'Disclosure/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    argTypes: {
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

type Story = StoryFn<typeof Accordion>;

export const Default: Story = () => (
    <AccordionContainer>
        <Accordion title="Panel Title 1" id="1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 2" id="2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 3" id="3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
    </AccordionContainer>
);

export const MultiOpenToggle: Story = () => (
    <AccordionContainer mode="multi">
        <Accordion title="Panel Title 1" id="1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 2" id="2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 3" id="3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
    </AccordionContainer>
);

export const SingleDefaultExpanded: Story = () => (
    <AccordionContainer defaultExpandedItemIds={['3']}>
        <Accordion title="Panel Title 1" id="1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 2" id="2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 3" id="3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
    </AccordionContainer>
);

export const MultiDefaultExpanded: Story = () => (
    <AccordionContainer defaultExpandedItemIds={['1', '3']}>
        <Accordion title="Panel Title 1" id="1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 2" id="2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 3" id="3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
    </AccordionContainer>
);

export const SingleDisabled: Story = () => (
    <AccordionContainer disabledItemIds={['2']}>
        <Accordion title="Panel Title 1" id="1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 2" id="2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 3" id="3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
    </AccordionContainer>
);

export const MultiDisabled: Story = () => (
    <AccordionContainer disabledItemIds={['1', '3']}>
        <Accordion title="Panel Title 1" id="1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 2" id="2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 3" id="3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
    </AccordionContainer>
);
