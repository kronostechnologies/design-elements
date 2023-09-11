import { mountWithTheme } from '../../test-utils/renderer';
import { AccordionItem, Accordion } from './index';

describe('Accordion Component', () => {
    it('Should, on load, rewrite props and add to Accordion children correctly', () => {
        const wrapper = mountWithTheme(
            <AccordionItem title='Accordion 1' id="test1">
                <div>Accordion content 1</div>
            </AccordionItem>,
        );

        const accordionItem = wrapper.find('section').at(0);
        const accordionButton = wrapper.find('button').at(0);

        expect(accordionButton.prop('id')).toBe('test1');
        expect(accordionButton.prop('aria-controls')).toBe('panel-test1');
        expect(accordionItem.prop('aria-labelledby')).toBe('test1');
        expect(accordionItem.prop('id')).toBe('panel-test1');
    });

    it('Should update ARIA attributes on toggle', () => {
        const wrapper = mountWithTheme(
            <Accordion id="1">
                <AccordionItem title='Accordion 2' id="test2">
                    <div>Accordion content 2</div>
                </AccordionItem>
            </Accordion>,
        );

        // First click
        wrapper.find('button').first().simulate('click');

        const button = wrapper.find('button').first();
        const container = wrapper.find('section').first();
        expect(button.prop('aria-expanded')).toBe(true);
        expect(container.prop('aria-expanded')).toBe(true);

        // Second click
        wrapper.find('button').first().simulate('click');

        const buttonRefreshed = wrapper.find('button').first();
        const containerfreshed = wrapper.find('section').first();
        expect(buttonRefreshed.prop('aria-expanded')).toBe(false);
        expect(containerfreshed.prop('aria-expanded')).toBe(false);
    });
});
