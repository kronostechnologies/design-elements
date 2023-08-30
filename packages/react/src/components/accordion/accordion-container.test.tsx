import ReactDOM from 'react-dom';
import { mountWithTheme } from '../../test-utils/renderer';
import { AccordionContainer, Accordion } from './index';

describe('AccordionContianer', () => {
    const divElement = document.createElement('div');

    beforeAll(() => {
        document.body.appendChild(divElement);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(divElement);
    });

    it('Should only render Accordion child', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer id="test">
                <Accordion title='Panel 1'>
                    Content for Panel 1
                </Accordion>
                <div>test</div>
                <Accordion title='Panel 2'>
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

    it('Should have the last accordion opne by default', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer id="test2">
                <Accordion title='Panel 1'>
                    Content for Panel 1
                </Accordion>
                <Accordion title='Panel 2'>
                    Content for Panel 2
                </Accordion>
                <Accordion title='Panel 3' isExpanded>
                    Content for Panel 3
                </Accordion>
            </AccordionContainer>,
        );

        const button = wrapper.find('.accordion-button').last();
        const container = wrapper.find('.accordion-content').last();
        expect(button.prop('aria-expanded')).toBe(true);
        expect(container.prop('aria-expanded')).toBe(true);
    });

    it('Should have multiple accordions open when using mode=multi', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer id="test3" mode='multi'>
                <Accordion title='Panel 1'>
                    Content for Panel 1
                </Accordion>
                <Accordion title='Panel 2'>
                    Content for Panel 2
                </Accordion>
                <Accordion title='Panel 3'>
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
        expect(buttonRefreshed.prop('aria-expanded')).toBe(true);
        expect(containerfreshed.prop('aria-expanded')).toBe(true);
        expect(lastButton.prop('aria-expanded')).toBe(true);
        expect(lastContainer.prop('aria-expanded')).toBe(true);
    });

    it('Should have single accordion open when not using mode prop or using mode=single', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer id="test4">
                <Accordion title='Panel 1'>
                    Content for Panel 1
                </Accordion>
                <Accordion title='Panel 2'>
                    Content for Panel 2
                </Accordion>
                <Accordion title='Panel 3'>
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
        expect(lastButton.prop('aria-expanded')).toBe(true);
        expect(lastContainer.prop('aria-expanded')).toBe(true);
    });

    it('Should have the First accordion disabled by default', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer id="test5">
                <Accordion title='Panel 1' disabled>
                    Content for Panel 1
                </Accordion>
                <Accordion title='Panel 2'>
                    Content for Panel 2
                </Accordion>
                <Accordion title='Panel 3'>
                    Content for Panel 3
                </Accordion>
            </AccordionContainer>,
        );

        const firstButton = wrapper.find('.accordion-button').first();
        expect(firstButton.prop('disabled')).toBe(true);
    });

    // Focus Management
    it('Should go to the next Accordion button when ArrowDown is pressed', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer id='test6'>
                <Accordion title='Accordion 1'>
                    <div>Accordion content 1</div>
                </Accordion>
                <Accordion title='Accordion 2'>
                    <div>Accordion content 2</div>
                </Accordion>
            </AccordionContainer>,
            { attachTo: divElement },
        );

        wrapper.find('.accordion-button').first().simulate('keydown', { key: 'ArrowDown' });
        const activeElement = document.activeElement;
        expect(activeElement instanceof HTMLButtonElement).toBe(true);
        expect(activeElement?.id).toBe(wrapper.find('.accordion-button').last().prop('id'));
    });

    it('Should go to the Last Accordion button when ArrowUp is pressed on First Accordion', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer id='test7'>
                <Accordion title='Accordion 1'>
                    <div>Accordion content 1</div>
                </Accordion>
                <Accordion title='Accordion 2'>
                    <div>Accordion content 2</div>
                </Accordion>
                <Accordion title='Accordion 3'>
                    <div>Accordion content 3</div>
                </Accordion>
            </AccordionContainer>,
            { attachTo: divElement },
        );

        wrapper.find('.accordion-button').first().simulate('keydown', { key: 'ArrowUp' });
        const activeElement = document.activeElement;
        expect(activeElement instanceof HTMLButtonElement).toBe(true);
        expect(activeElement?.id).toBe(wrapper.find('.accordion-button').last().prop('id'));
    });

    it('Should go to the First Accordion button when ArrowDown is pressed on Last Accordion', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer id='test8'>
                <Accordion title='Accordion 1'>
                    <div>Accordion content 1</div>
                </Accordion>
                <Accordion title='Accordion 2'>
                    <div>Accordion content 2</div>
                </Accordion>
                <Accordion title='Accordion 3'>
                    <div>Accordion content 3</div>
                </Accordion>
            </AccordionContainer>,
            { attachTo: divElement },
        );

        wrapper.find('.accordion-button').last().simulate('keydown', { key: 'ArrowDown' });

        const activeElementRefreshed = document.activeElement;
        expect(activeElementRefreshed instanceof HTMLButtonElement).toBe(true);
        expect(activeElementRefreshed?.id).toBe(wrapper.find('.accordion-button').first().prop('id'));
    });
});
