import React from 'react';
import { ReactWrapper} from 'enzyme';
import { mountWithTheme} from '../../test-utils/renderer';
import { SingleOpenAccordionGroup, Accordion, AccordionItem } from './index';
import { Icon } from '../icon/icon';


describe('SingleOpenAccordionGroup renders with default state open', () => {

  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mountWithTheme(
     
        <SingleOpenAccordionGroup defaultExpandedItemId="3">
          <Accordion title="Panel 1" id="1" noMargin>
            Content for Panel 1
          </Accordion>
          <Accordion title="Panel 2" id="2" noMargin>
            Content for Panel 2
          </Accordion>
          <Accordion title="Panel 3" id="3" noMargin>
            Content for Panel 3
          </Accordion>
        </SingleOpenAccordionGroup>
    );

  });

  it('matches snapshot (no margin)', () => {
    const tree = mountWithTheme(<Accordion title="Panel 1" id="1" noMargin>Content for Panel 1 </Accordion>);
    expect(tree).toMatchSnapshot();
  });


  it('should render Accordion components with expected props', () => {

    const accordions = wrapper.find(Accordion);

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
      <SingleOpenAccordionGroup>
        <Accordion id="1" title="Panel 1">
          Content for Panel 1
        </Accordion>
        <div>Invalid Child</div>
        <Accordion id="2" title="Panel 2">
          Content for Panel 2
        </Accordion>
      </SingleOpenAccordionGroup>
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


  it('should render with defaultExpandedItemId', () => {

      const firstAccordion = wrapper.find(Accordion).at(0);
      const secondAccordion = wrapper.find(Accordion).at(1);
      const thridAccordion = wrapper.find(Accordion).at(2);

      expect(firstAccordion.prop('isExpanded')).toBe(false);
      expect(secondAccordion.prop('isExpanded')).toBe(false);
      expect(thridAccordion.prop('isExpanded')).toBe(true);
  });

  it('should update expandedItemId state correctly when toggling to a different panel', () => {

    const setStateMock = jest.fn();
    const useStateMock: any = (initialValue: any) => [initialValue, setStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const wrapper = mountWithTheme(
      <SingleOpenAccordionGroup defaultExpandedItemId="3">
        <Accordion title="Panel 1" id="1">
          Content for Panel 1
        </Accordion>
        <Accordion title="Panel 2" id="2">
          Content for Panel 2
        </Accordion>
        <Accordion title="Panel 3" id="3">
          Content for Panel 3
        </Accordion>
      </SingleOpenAccordionGroup>
    );

    const firstAccordionButton = wrapper.find(Accordion).at(0).find('button.accordion-button');
    firstAccordionButton.simulate('click');

    // Verify that the state update function was called with the expected value
    const updatedState = setStateMock.mock.calls[0][0];
    const expandedItemId = updatedState('3');
    expect(expandedItemId).toBe('1');

    jest.clearAllMocks();
  });

  it('should update expandedItemId state correctly when toggling to the same panel', () => {
    const setStateMock = jest.fn();
    const useStateMock: any = (initialValue: any) => [initialValue, setStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const wrapper = mountWithTheme(
      <SingleOpenAccordionGroup defaultExpandedItemId="3">
        <Accordion title="Panel 1" id="1">
          Content for Panel 1
        </Accordion>
        <Accordion title="Panel 2" id="2">
          Content for Panel 2
        </Accordion>
        <Accordion title="Panel 3" id="3">
          Content for Panel 3
        </Accordion>
      </SingleOpenAccordionGroup>
    );

    const firstAccordionButton = wrapper.find(Accordion).at(0).find('button.accordion-button');
    firstAccordionButton.simulate('click');

    // Simulate another click on the same Accordion button
    firstAccordionButton.simulate('click');

    // Verify that the state update function was called with the expected value
    const updatedState = setStateMock.mock.calls[0][0];
    const expandedItemId = updatedState('1');
    expect(expandedItemId).toBe(null);

    jest.clearAllMocks();
  });

  it('renders an icon based on the isExpanded prop', () => {
    const wrapper = mountWithTheme(
      <AccordionItem
        headerId="header1"
        panelId="panel1"
        title="Accordion 1"
        type="medium"
        isExpanded={true}
      >
        Content for the accordion panel
      </AccordionItem>
    );

    const icon = wrapper.find(Icon);
    expect(icon.prop('name')).toBe('carretDown');
  });

  it('renders the opposite icon when isExpanded is false', () => {
    const wrapper = mountWithTheme(
      <AccordionItem
        headerId="header2"
        panelId="panel2"
        title="Accordion 2"
        type="medium"
        isExpanded={false}
      >
        Content for the accordion panel
      </AccordionItem>
    );

    const icon = wrapper.find(Icon);
    expect(icon.prop('name')).toBe('carretRight');
  });

});