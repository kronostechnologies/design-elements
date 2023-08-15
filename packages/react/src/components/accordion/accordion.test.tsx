import { mountWithTheme } from '../../test-utils/renderer';
import { Accordion, AccordionItem } from './index';

describe('Accordion Component', () => {

  it('passes props to AccordionItem correctly', () => {
    const wrapper = mountWithTheme(
      <Accordion title="Accordion 1" id="1" type="medium">
        <div>Accordion content</div>
      </Accordion>
    );

    const accordionItem = wrapper.find(AccordionItem);
    expect(accordionItem.prop('headerId')).toBe('idHeader1');
    expect(accordionItem.prop('panelId')).toBe('idPanel1');
    expect(accordionItem.prop('title')).toBe('Accordion 1');
    expect(accordionItem.prop('type')).toBe('medium');
  });

  it('sets correct ARIA attributes for accessibility', () => {

    const wrapper = mountWithTheme(
      <Accordion title="Accordion Title" id="2" type="medium">
        <div>Accordion content</div>
      </Accordion>
    );

    const AccordionButton = wrapper.find('.accordion-button').at(0);
    const accordionSection = wrapper.find('.accordion-content').at(0);

    expect(AccordionButton.prop('aria-expanded')).toBe(false); 
    expect(AccordionButton.prop('aria-controls')).toBe('idPanel2');
    expect(accordionSection.prop('aria-labelledby')).toBe('idHeader2');
    expect(accordionSection.prop('aria-expanded')).toBe(false); 

    // Simulate click to expand
    AccordionButton.simulate('click');

    setTimeout(() => {
        expect(AccordionButton.prop('aria-expanded')).toBe(true);
        expect(accordionSection.prop('aria-expanded')).toBe(true); 
     }, 100);

  });

});