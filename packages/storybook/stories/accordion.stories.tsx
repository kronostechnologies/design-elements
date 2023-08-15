import { SingleOpenAccordionGroup, MultiOpenAccordionGroup, Accordion } from '@equisoft/design-elements-react';
import { Meta, StoryFn } from '@storybook/react';

// eslint-disable-next-line import/no-default-export
const accordionMeta: Meta<typeof Accordion> = {
    title: 'Disclosure/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    argTypes: {
        // isExpanded and onToggle are the properties we want to hide from the UI
        isExpanded: {
        table: { disable: true },
        },
        onToggle: {
        table: { disable: true },
        },
        disabled: {
            table: { disable: true },
        },
    },
};
  
export default accordionMeta;

type Story = StoryFn<typeof Accordion>;

export const SingleOpen: Story = () => (
    <SingleOpenAccordionGroup>
        <Accordion title="Panel Title 1" id="1" noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
        <Accordion title="Panel Title 2" id="2"  noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
        <Accordion title="Panel Title 3" id="3"  noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
    </SingleOpenAccordionGroup>

);

export const MultiOpen: Story = () => (
    <MultiOpenAccordionGroup>
        <Accordion title="Panel Title 1" id="1" noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
        <Accordion title="Panel Title 2" id="2"  noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
        <Accordion title="Panel Title 3" id="3"  noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
    </MultiOpenAccordionGroup>

);

export const SingleDefaultExpanded: Story = () => (
    <SingleOpenAccordionGroup defaultExpandedItemId="3">
        <Accordion title="Panel Title 1" id="1" noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
        <Accordion title="Panel Title 2" id="2"  noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
        <Accordion title="Panel Title 3" id="3"  noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
    </SingleOpenAccordionGroup>

);

export const MultiDefaultExpanded: Story = () => (
    <MultiOpenAccordionGroup defaultExpandedItemIds={['1', '3']}>
        <Accordion title="Panel Title 1" id="1" noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
        <Accordion title="Panel Title 2" id="2"  noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
        <Accordion title="Panel Title 3" id="3"  noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
    </MultiOpenAccordionGroup>

);

export const SingleDisabled: Story = () => (
    <SingleOpenAccordionGroup disabledItems={['2']}>
        <Accordion title="Panel Title 1" id="1" noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
        <Accordion title="Panel Title 2" id="2"  noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
        <Accordion title="Panel Title 3" id="3"  noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
    </SingleOpenAccordionGroup>

);

export const MultiDisabled: Story = () => (
    <MultiOpenAccordionGroup disabledItems={['1', '3']}>
        <Accordion title="Panel Title 1" id="1" noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
        <Accordion title="Panel Title 2" id="2"  noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
        <Accordion title="Panel Title 3" id="3"  noMargin>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim viverra justo, nisl sit nascetur amet id egestas lorem. Nisl, quam a semper turpis viverra eu id laoreet. Elit dignissim sit arcu faucibus ipsum. Fermentum, nibh massa feugiat dictum proin ac varius.</p>
        </Accordion>
    </MultiOpenAccordionGroup>

);
