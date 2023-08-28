import { mountWithTheme } from '../../test-utils/renderer';
import { AccordionContainer, Accordion } from './index';

describe('Accordion Component', () => {
    it('Should, on load, rewrite props and add to Accordion children correctly', () => {
        const wrapper = mountWithTheme(
            <Accordion title='Accordion 1' id='1' type='medium'>
                <div>Accordion content 1</div>
            </Accordion>,
        );

        const accordionItem = wrapper.find('.accordion-content').at(0);
        const accordionButton = wrapper.find('.accordion-button').at(0);

        expect(accordionButton.prop('id')).toBe('idHeader1');
        expect(accordionButton.prop('aria-controls')).toBe('idPanel1');
        expect(accordionItem.prop('aria-labelledby')).toBe('idHeader1');
        expect(accordionItem.prop('id')).toBe('idPanel1');
    });

    it('Should update ARIA attributes on toggle', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer>
                <Accordion title='Accordion 2' id='2' type='medium'>
                    <div>Accordion content 2</div>
                </Accordion>
            </AccordionContainer>,
        );

        // First click
        wrapper.find('.accordion-button').first().simulate('click');

        const button = wrapper.find('.accordion-button').first();
        const container = wrapper.find('.accordion-content').first();
        expect(button.prop('aria-expanded')).toBe(true);
        expect(container.prop('aria-expanded')).toBe(true);

        // Second click
        wrapper.find('.accordion-button').first().simulate('click');

        const buttonRefreshed = wrapper.find('.accordion-button').first();
        const containerfreshed = wrapper.find('.accordion-content').first();
        expect(buttonRefreshed.prop('aria-expanded')).toBe(false);
        expect(containerfreshed.prop('aria-expanded')).toBe(false);
    });
});
