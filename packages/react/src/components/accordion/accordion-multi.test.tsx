//import React from 'react';
import { ReactWrapper} from 'enzyme';
import { mountWithTheme } from '../../test-utils/renderer';
import { MultiOpenAccordionGroup, Accordion } from './index';

describe('Accordion Multi Open components', () => {

  let multiWrapper: ReactWrapper;

  beforeEach(() => {
    multiWrapper = mountWithTheme(
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

  });

  it('should render Accordion components with expected props', () => {

    const accordions = multiWrapper.find(Accordion);

    // Ensure each Accordion component has the expected props
    accordions.forEach((element) => {
      const props = element.props();
      expect(props.id).toBeDefined();
      expect(props.title).toBeDefined();
      expect(props.children).toBeDefined();
    });
  });


  it('should only render Accordion components', () => {
    const wrapper =  mountWithTheme(
      <MultiOpenAccordionGroup>
        <Accordion id="1" title="Panel 1">
          Content for Panel 1
        </Accordion>
        <div>Invalid Child</div>
        <Accordion id="2" title="Panel 2">
          Content for Panel 2
        </Accordion>
      </MultiOpenAccordionGroup>
    );

    const accordions = wrapper.find(Accordion);

    // Ensure all elements in accordions list are of type Accordion
    accordions.forEach((element) => {
      expect(element.is(Accordion)).toBe(true);
    });

    // Ensure the invalid child is ignored (checking specific text content)
    const invalidChildText = wrapper.find('div').map((element) => element.text());
    expect(invalidChildText).not.toContain('Invalid Child');
  });

  it('MultiOpenAccordionGroup renders with default state', () => {
    
      const firstAccordion = multiWrapper.find(Accordion).at(0);
      const secondAccordion = multiWrapper.find(Accordion).at(1);
      const thirdAccordion = multiWrapper.find(Accordion).at(2);

      expect(firstAccordion.prop('isExpanded')).toBe(true);
      expect(secondAccordion.prop('isExpanded')).toBe(false);
      expect(thirdAccordion.prop('isExpanded')).toBe(true);
  });


  it('should toggle expandedItemIds correctly', () => {

      const secondAccordionButton = multiWrapper.find(Accordion).at(1).find('button.accordion-button');
      const thirdAccordionButton = multiWrapper.find(Accordion).at(2).find('button.accordion-button');
  
      // Initially, first and third accordion panels should be expanded
      expect(multiWrapper.find(Accordion).at(0).prop('isExpanded')).toBe(true);
      expect(multiWrapper.find(Accordion).at(1).prop('isExpanded')).toBe(false);
      expect(multiWrapper.find(Accordion).at(2).prop('isExpanded')).toBe(true);
  
      // Simulate click on the second Accordion button
      secondAccordionButton.simulate('click');
      expect(multiWrapper.find(Accordion).at(1).prop('isExpanded')).toBe(true);
  
      // Simulate click on the third Accordion button
      thirdAccordionButton.simulate('click');
      expect(multiWrapper.find(Accordion).at(2).prop('isExpanded')).toBe(false);

    });

  });