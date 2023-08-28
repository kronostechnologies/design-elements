import ReactDOM from 'react-dom';
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

describe('KeyBoard Use', () => {
    const divElement = document.createElement('div');

    beforeAll(() => {
        document.body.appendChild(divElement);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(divElement);
    });

    it('Should go to the next Accordion button when ArrowDown is pressed', () => {
        const wrapper = mountWithTheme(
            <AccordionContainer>
                <Accordion title='Accordion 1' id='1' type='medium'>
                    <div>Accordion content 1</div>
                </Accordion>
                <Accordion title='Accordion 2' id='2' type='medium'>
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
            <AccordionContainer>
                <Accordion title='Accordion 1' id='1' type='medium'>
                    <div>Accordion content 1</div>
                </Accordion>
                <Accordion title='Accordion 2' id='2' type='medium'>
                    <div>Accordion content 2</div>
                </Accordion>
                <Accordion title='Accordion 3' id='3' type='medium'>
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
            <AccordionContainer>
                <Accordion title='Accordion 1' id='1' type='medium'>
                    <div>Accordion content 1</div>
                </Accordion>
                <Accordion title='Accordion 2' id='2' type='medium'>
                    <div>Accordion content 2</div>
                </Accordion>
                <Accordion title='Accordion 3' id='3' type='medium'>
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
