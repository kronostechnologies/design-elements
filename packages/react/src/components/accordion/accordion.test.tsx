import ReactDOM from 'react-dom';
import { mountWithTheme } from '../../test-utils/renderer';
import { Accordion } from './index';

describe('AccordionContianer', () => {
    const divElement = document.createElement('div');

    beforeAll(() => {
        document.body.appendChild(divElement);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(divElement);
    });

    it('should toggle expansion in single mode', () => {
        const items = [
            {
                title: 'Panel Title 1',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 2',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 3',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
        ];

        const wrapper = mountWithTheme(
            <Accordion id="test" mode="single" items={items} />,
        );

        // Initially, no accordion items should be expanded
        expect(wrapper.find('AccordionItem').at(0).prop('expanded')).toBe(false);
        expect(wrapper.find('AccordionItem').at(1).prop('expanded')).toBe(false);
        expect(wrapper.find('AccordionItem').at(2).prop('expanded')).toBe(false);

        // Simulate a click on the first accordion item
        wrapper.find('button').at(0).simulate('click');

        // Only the first accordion item should be expanded in single mode
        expect(wrapper.find('AccordionItem').at(0).prop('expanded')).toBe(true);
        expect(wrapper.find('AccordionItem').at(1).prop('expanded')).toBe(false);
        expect(wrapper.find('AccordionItem').at(2).prop('expanded')).toBe(false);
    });

    it('should toggle expansion in multi mode when item is expanded', () => {
        const items = [
            {
                title: 'Panel Title 1',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 2',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
        ];

        const wrapper = mountWithTheme(
            <Accordion id="test" mode="multi" items={items} />,
        );

        // Initially, both accordion items should not be expanded
        expect(wrapper.find('AccordionItem').at(0).prop('expanded')).toBe(false);
        expect(wrapper.find('AccordionItem').at(1).prop('expanded')).toBe(false);

        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find('AccordionItem').at(0).prop('expanded')).toBe(true);
        expect(wrapper.find('AccordionItem').at(1).prop('expanded')).toBe(false);

        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find('AccordionItem').at(0).prop('expanded')).toBe(false);
    });

    it('should toggle expansion in multi mode when item is not expanded', () => {
        const items = [
            {
                title: 'Panel Title 1',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 2',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
        ];

        const wrapper = mountWithTheme(
            <Accordion id="test" mode="multi" items={items} />,
        );

        // Initially, both accordion items should not be expanded
        expect(wrapper.find('AccordionItem').at(0).prop('expanded')).toBe(false);
        expect(wrapper.find('AccordionItem').at(1).prop('expanded')).toBe(false);

        // Simulate a click on the second accordion item's button to expand it
        wrapper.find('button').at(1).simulate('click');
        expect(wrapper.find('AccordionItem').at(0).prop('expanded')).toBe(false);
        expect(wrapper.find('AccordionItem').at(1).prop('expanded')).toBe(true);
    });

    // Focus management
    it('should handle ArrowUp key press', () => {
        const items = [
            {
                title: 'Panel Title 1',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 2',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 3',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
        ];

        const wrapper = mountWithTheme(
            <Accordion id="test" mode="multi" items={items} />,
            { attachTo: divElement },
        );

        wrapper.find('Button').first().simulate('keydown', { key: 'ArrowUp' });
        const activeElement = document.activeElement;
        expect(activeElement instanceof HTMLButtonElement).toBe(true);
        expect(activeElement?.id).toBe(wrapper.find('Button').last().prop('id'));

        wrapper.detach();
    });

    it('should handle ArrowDown key press', () => {
        const items = [
            {
                title: 'Panel Title 1',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 2',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 3',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
        ];

        const wrapper = mountWithTheme(
            <Accordion id="test" mode="multi" items={items} />,
            { attachTo: divElement },
        );

        wrapper.find('Button').last().simulate('keydown', { key: 'ArrowDown' });
        const activeElement = document.activeElement;
        expect(activeElement instanceof HTMLButtonElement).toBe(true);
        expect(activeElement?.id).toBe(wrapper.find('Button').first().prop('id'));

        wrapper.detach();
    });

    it('should handle ArrowDown key press with disabled items', () => {
        const items = [
            {
                title: 'Panel Title 1',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 2',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
                disabled: true,
            },
            {
                title: 'Panel Title 3',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
        ];

        const wrapper = mountWithTheme(
            <Accordion id="test" mode="multi" items={items} />,
            { attachTo: divElement },
        );

        wrapper.find('Button').first().simulate('keydown', { key: 'ArrowDown' });
        const activeElement = document.activeElement;
        expect(activeElement instanceof HTMLButtonElement).toBe(true);
        expect(activeElement?.id).toBe(wrapper.find('Button').last().prop('id'));

        wrapper.detach();
    });

    it('should handle ArrowDown key press with disabled items', () => {
        const items = [
            {
                title: 'Panel Title 1',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 2',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
                disabled: true,
            },
            {
                title: 'Panel Title 3',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
        ];

        const wrapper = mountWithTheme(
            <Accordion id="test" mode="multi" items={items} />,
            { attachTo: divElement },
        );

        wrapper.find('Button').last().simulate('keydown', { key: 'ArrowUp' });
        const activeElement = document.activeElement;
        expect(activeElement instanceof HTMLButtonElement).toBe(true);
        expect(activeElement?.id).toBe(wrapper.find('Button').first().prop('id'));

        wrapper.detach();
    });
});
