import type { Meta } from '@storybook/react';
import { SingleOpenAccordionGroup, MultiOpenAccordionGroup, Accordion } from '@equisoft/design-elements-react';

// The meta object defines the story's properties and behavior
const meta: Meta<typeof Accordion> = {
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
  },
};

export default meta;

export const DefaultSingleOpen = () => (
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

export const DefaultMultiOpen = () => (
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

export const SingleOpenExpanded = () => (
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

export const MultiOpenExpanded = () => (
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
