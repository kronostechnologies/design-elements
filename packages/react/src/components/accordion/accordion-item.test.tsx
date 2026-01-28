import { mountWithTheme } from '../../test-utils/renderer';
import { Accordion, ItemsProps } from './index';

describe('AccordionItem Component', () => {
    it('should toggle the icon when the button is clicked and `expanded` is updated', () => {
        const items: ItemsProps[] = [
            {
                title: 'Panel Title 1',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
        ];

        const wrapper = mountWithTheme(
            <Accordion id="test" items={items} />,
        );

        // Initial icon state
        expect(wrapper.find('Icon').prop('name')).toBe('chevronRight');

        // Simulate a button click
        wrapper.find('Button').simulate('click');
        expect(wrapper.find('Icon').prop('name')).toBe('chevronDown');
    });
});
