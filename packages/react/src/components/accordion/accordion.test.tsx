import ReactDOM from 'react-dom';
import { mountWithTheme } from '../../test-utils/renderer';
import { AccordionItem, Accordion } from './index';

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
            <Accordion id="test">
                <AccordionItem title='Panel 1'>
                    Content for Panel 1
                </AccordionItem>
                <div>test</div>
                <AccordionItem title='Panel 2'>
                    Content for Panel 2
                </AccordionItem>
            </Accordion>,
        );

        const renderedAccordionComponents = wrapper.find('AccordionItem');
        expect(renderedAccordionComponents).toHaveLength(2);

        // Additional checks, e.g., check the content of the accordion items
        expect(renderedAccordionComponents.first().text()).toContain('Content for Panel 1');
        expect(renderedAccordionComponents.last().text()).toContain('Content for Panel 2');
    });

    it('Should have the last accordion open by default', () => {
        const wrapper = mountWithTheme(
            <Accordion id="test2">
                <AccordionItem title='Panel 1'>
                    Content for Panel 1
                </AccordionItem>
                <AccordionItem title='Panel 2'>
                    Content for Panel 2
                </AccordionItem>
                <AccordionItem title='Panel 3' expanded>
                    Content for Panel 3
                </AccordionItem>
            </Accordion>,
        );

        const button = wrapper.find('Button').last();
        const container = wrapper.find('section').last();
        expect(button.prop('aria-expanded')).toBe(true);
        expect(container.prop('aria-expanded')).toBe(true);
    });

    it('Should have multiple accordions open when using mode=multi', () => {
        const wrapper = mountWithTheme(
            <Accordion id="test3" mode='multi'>
                <AccordionItem title='Panel 1'>
                    Content for Panel 1
                </AccordionItem>
                <AccordionItem title='Panel 2'>
                    Content for Panel 2
                </AccordionItem>
                <AccordionItem title='Panel 3'>
                    Content for Panel 3
                </AccordionItem>
            </Accordion>,
        );

        // Click first
        wrapper.find('Button').first().simulate('click');
        const button = wrapper.find('Button').first();
        const container = wrapper.find('section').first();
        expect(button.prop('aria-expanded')).toBe(true);
        expect(container.prop('aria-expanded')).toBe(true);

        // Click last
        wrapper.find('Button').last().simulate('click');
        const buttonRefreshed = wrapper.find('Button').first();
        const containerfreshed = wrapper.find('section').first();
        const lastButton = wrapper.find('Button').last();
        const lastContainer = wrapper.find('section').last();
        expect(buttonRefreshed.prop('aria-expanded')).toBe(true);
        expect(containerfreshed.prop('aria-expanded')).toBe(true);
        expect(lastButton.prop('aria-expanded')).toBe(true);
        expect(lastContainer.prop('aria-expanded')).toBe(true);
    });

    it('Should have single accordion open when not using mode prop or using mode=single', () => {
        const wrapper = mountWithTheme(
            <Accordion id="test4">
                <AccordionItem title='Panel 1'>
                    Content for Panel 1
                </AccordionItem>
                <AccordionItem title='Panel 2'>
                    Content for Panel 2
                </AccordionItem>
                <AccordionItem title='Panel 3'>
                    Content for Panel 3
                </AccordionItem>
            </Accordion>,
        );

        // Click first
        wrapper.find('Button').first().simulate('click');
        const button = wrapper.find('Button').first();
        const container = wrapper.find('section').first();
        expect(button.prop('aria-expanded')).toBe(true);
        expect(container.prop('aria-expanded')).toBe(true);

        // Click last
        wrapper.find('Button').last().simulate('click');
        const buttonRefreshed = wrapper.find('Button').first();
        const containerfreshed = wrapper.find('section').first();
        const lastButton = wrapper.find('Button').last();
        const lastContainer = wrapper.find('section').last();
        expect(buttonRefreshed.prop('aria-expanded')).toBe(false);
        expect(containerfreshed.prop('aria-expanded')).toBe(false);
        expect(lastButton.prop('aria-expanded')).toBe(true);
        expect(lastContainer.prop('aria-expanded')).toBe(true);
    });

    it('Should have the First accordion disabled by default', () => {
        const wrapper = mountWithTheme(
            <Accordion id="test5">
                <AccordionItem title='Panel 1' disabled>
                    Content for Panel 1
                </AccordionItem>
                <AccordionItem title='Panel 2'>
                    Content for Panel 2
                </AccordionItem>
                <AccordionItem title='Panel 3'>
                    Content for Panel 3
                </AccordionItem>
            </Accordion>,
        );

        const firstButton = wrapper.find('Button').first();
        expect(firstButton.prop('disabled')).toBe(true);
    });

    // Focus Management
    it('Should go to the next Accordion button when ArrowDown is pressed', () => {
        const wrapper = mountWithTheme(
            <Accordion id='test6'>
                <AccordionItem title='Accordion 1'>
                    <div>Accordion content 1</div>
                </AccordionItem>
                <AccordionItem title='Accordion 2'>
                    <div>Accordion content 2</div>
                </AccordionItem>
            </Accordion>,
            { attachTo: divElement },
        );

        wrapper.find('Button').first().simulate('keydown', { key: 'ArrowDown' });
        const activeElement = document.activeElement;
        expect(activeElement instanceof HTMLButtonElement).toBe(true);
        expect(activeElement?.id).toBe(wrapper.find('Button').last().prop('id'));
    });

    it('Should go to the Last Accordion button when ArrowUp is pressed on First Accordion', () => {
        const wrapper = mountWithTheme(
            <Accordion id='test7'>
                <AccordionItem title='Accordion 1'>
                    <div>Accordion content 1</div>
                </AccordionItem>
                <AccordionItem title='Accordion 2'>
                    <div>Accordion content 2</div>
                </AccordionItem>
                <AccordionItem title='Accordion 3'>
                    <div>Accordion content 3</div>
                </AccordionItem>
            </Accordion>,
            { attachTo: divElement },
        );

        wrapper.find('Button').first().simulate('keydown', { key: 'ArrowUp' });
        const activeElement = document.activeElement;
        expect(activeElement instanceof HTMLButtonElement).toBe(true);
        expect(activeElement?.id).toBe(wrapper.find('Button').last().prop('id'));
    });

    it('Should go to the First Accordion button when ArrowDown is pressed on Last Accordion', () => {
        const wrapper = mountWithTheme(
            <Accordion id='test8'>
                <AccordionItem title='Accordion 1'>
                    <div>Accordion content 1</div>
                </AccordionItem>
                <AccordionItem title='Accordion 2'>
                    <div>Accordion content 2</div>
                </AccordionItem>
                <AccordionItem title='Accordion 3'>
                    <div>Accordion content 3</div>
                </AccordionItem>
            </Accordion>,
            { attachTo: divElement },
        );

        wrapper.find('Button').last().simulate('keydown', { key: 'ArrowDown' });

        const activeElementRefreshed = document.activeElement;
        expect(activeElementRefreshed instanceof HTMLButtonElement).toBe(true);
        expect(activeElementRefreshed?.id).toBe(wrapper.find('Button').first().prop('id'));
    });
});
