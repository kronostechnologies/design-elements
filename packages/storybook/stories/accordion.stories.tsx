import { AccordionContainer, Accordion } from '@equisoft/design-elements-react';
import { Meta, StoryFn } from '@storybook/react';

// eslint-disable-next-line import/no-default-export
const accordionMeta: Meta<typeof Accordion> = {
    title: 'Disclosure/Accordion',
    component: Accordion,
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

type Story = StoryFn<typeof Accordion>;

export const Default: Story = () => (
    <AccordionContainer id="default">
        <Accordion title="Panel Title 1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
    </AccordionContainer>
);

export const MultiOpenToggle: Story = () => (
    <AccordionContainer mode="multi" id="multi">
        <Accordion title="Panel Title 1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
    </AccordionContainer>
);

export const DefaultExpanded: Story = () => (
    <AccordionContainer id="single">
        <Accordion title="Panel Title 1" isExpanded>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
    </AccordionContainer>
);

export const DefaultDisabled: Story = () => (
    <AccordionContainer id="diabled">
        <Accordion title="Panel Title 1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 2" disabled>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
        <Accordion title="Panel Title 3">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur.</p>
        </Accordion>
    </AccordionContainer>
);
