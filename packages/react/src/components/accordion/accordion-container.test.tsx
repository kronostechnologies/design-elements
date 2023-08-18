import React from 'react';
import { mountWithTheme } from '../../test-utils/renderer';
import { AccordionContainer, Accordion } from './index';

describe('AccordionContianer', () => {

    it('Should have the last accordion opne by default', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer defaultExpandedItemIds={['3']}>
                <Accordion title='Panel 1' id='1'>
                    Content for Panel 1
                </Accordion>
                <Accordion title='Panel 2' id='2'>
                    Content for Panel 2
                </Accordion>
                <Accordion title='Panel 3' id='3'>
                    Content for Panel 3
                </Accordion>
            </AccordionContainer>,
        );

        const button = wrapper.find('.accordion-button').last();
        const container = wrapper.find('.accordion-content').last();
        expect(button.prop('aria-expanded')).toBe(true);
        expect(container.prop('aria-expanded')).toBe(true);

    });

    it('Should have the First and Last accordion opne by default', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer defaultExpandedItemIds={['1', '3']}>
                <Accordion title='Panel 1' id='1'>
                    Content for Panel 1
                </Accordion>
                <Accordion title='Panel 2' id='2'>
                    Content for Panel 2
                </Accordion>
                <Accordion title='Panel 3' id='3'>
                    Content for Panel 3
                </Accordion>
            </AccordionContainer>,
        );

        const firstButton = wrapper.find('.accordion-button').first();
        const firstContainer = wrapper.find('.accordion-content').first();
        const lastButton = wrapper.find('.accordion-button').last();
        const LastContainer = wrapper.find('.accordion-content').last();
        expect(firstButton.prop('aria-expanded')).toBe(true); 
        expect(firstContainer.prop('aria-expanded')).toBe(true); 
        expect(lastButton.prop('aria-expanded')).toBe(true); 
        expect(LastContainer.prop('aria-expanded')).toBe(true); 

    });

    it('Should have the First accordion disabled by default', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer disabledItemIds={['1']}>
                <Accordion title='Panel 1' id='1'>
                    Content for Panel 1
                </Accordion>
                <Accordion title='Panel 2' id='2'>
                    Content for Panel 2
                </Accordion>
                <Accordion title='Panel 3' id='3'>
                    Content for Panel 3
                </Accordion>
            </AccordionContainer>,
        );

        const firstButton = wrapper.find('.accordion-button').first();
        expect(firstButton.prop('disabled')).toBe(true);

    });

    it('Should have multiple accordions open when using mode=multi', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer mode='multi'>
                <Accordion title='Panel 1' id='1'>
                    Content for Panel 1
                </Accordion>
                <Accordion title='Panel 2' id='2'>
                    Content for Panel 2
                </Accordion>
                <Accordion title='Panel 3' id='3'>
                    Content for Panel 3
                </Accordion>
            </AccordionContainer>,
        );

        //Click first
        wrapper.find('.accordion-button').first().simulate('click');

        const button = wrapper.find('.accordion-button').first();
        const container = wrapper.find('.accordion-content').first();
        expect(button.prop('aria-expanded')).toBe(true);
        expect(container.prop('aria-expanded')).toBe(true);

        
        //Click last
        wrapper.find('.accordion-button').last().simulate('click');
        
        const buttonRefreshed = wrapper.find('.accordion-button').first();
        const containerfreshed = wrapper.find('.accordion-content').first();
        const lastButton = wrapper.find('.accordion-button').last();
        const lastContainer = wrapper.find('.accordion-content').last();
        expect(buttonRefreshed.prop('aria-expanded')).toBe(true);
        expect(containerfreshed.prop('aria-expanded')).toBe(true);
        expect(lastButton .prop('aria-expanded')).toBe(true);
        expect(lastContainer.prop('aria-expanded')).toBe(true);
    });

    it('Should have single accordion open when not using mode prop or using mode=single', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer >
                <Accordion title='Panel 1' id='1'>
                    Content for Panel 1
                </Accordion>
                <Accordion title='Panel 2' id='2'>
                    Content for Panel 2
                </Accordion>
                <Accordion title='Panel 3' id='3'>
                    Content for Panel 3
                </Accordion>
            </AccordionContainer>,
        );

        // Click first
        wrapper.find('.accordion-button').first().simulate('click');

        const button = wrapper.find('.accordion-button').first();
        const container = wrapper.find('.accordion-content').first();
        expect(button.prop('aria-expanded')).toBe(true);
        expect(container.prop('aria-expanded')).toBe(true);

        
        // Click last
        wrapper.find('.accordion-button').last().simulate('click');
        
        const buttonRefreshed = wrapper.find('.accordion-button').first();
        const containerfreshed = wrapper.find('.accordion-content').first();
        const lastButton = wrapper.find('.accordion-button').last();
        const lastContainer = wrapper.find('.accordion-content').last();
        expect(buttonRefreshed.prop('aria-expanded')).toBe(false);
        expect(containerfreshed.prop('aria-expanded')).toBe(false);
        expect(lastButton .prop('aria-expanded')).toBe(true);
        expect(lastContainer.prop('aria-expanded')).toBe(true);
    });

    it('Should only render Accordion child', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer>
                <Accordion title='Panel 1' id='1'>
                    Content for Panel 1
                </Accordion>
                <Accordion title='Panel 2' id='2'>
                    Content for Panel 2
                </Accordion>
            </AccordionContainer>,
        );
      
        const renderedAccordionComponents = wrapper.find('Accordion');
        expect(renderedAccordionComponents).toHaveLength(2);

        // Additional checks, e.g., check the content of the accordion items
        expect(renderedAccordionComponents.first().text()).toContain('Content for Panel 1');
        expect(renderedAccordionComponents.last().text()).toContain('Content for Panel 2');
    });
      
    it('Should update default expandedItemId state correctly', () => {
        const setHookState = (newState: any) =>
            jest.fn().mockImplementation(() => [newState.expandedItemIds, newState.setExpandedItemIds]);

        // Store the original useState function
        const originalUseState = jest.fn();

        React.useState = setHookState({
            expandedItemIds: [],
            setExpandedItemIds: originalUseState, 
          });

          mountWithTheme(
            <AccordionContainer defaultExpandedItemIds={['3']}>
                <Accordion title='Panel 1' id='1'>
                    Content for Panel 1
                </Accordion>
                <Accordion title='Panel 2' id='2'>
                    Content for Panel 2
                </Accordion>
                <Accordion title='Panel 3' id='3'>
                    Content for Panel 3
                </Accordion>
            </AccordionContainer>,
          );

        // Assert that useState was called with the expected initial state
        expect(React.useState).toHaveBeenCalledWith(['3']);
  
        // Restore the original useState function
        React.useState = originalUseState;
    });
});

