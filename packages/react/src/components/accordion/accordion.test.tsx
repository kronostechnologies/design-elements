import { fireEvent, screen } from '@testing-library/react';
import { Accordion, type AccordionItem } from '.';
import { renderWithProviders } from '../../test-utils/testing-library';

describe('Accordion', () => {
    it('should toggle expansion in single mode', () => {
        const items: AccordionItem[] = [
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

        renderWithProviders(<Accordion id="test" mode="single" items={items} />);

        const buttons = screen.getAllByRole('button');

        expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
        expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
        expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');

        fireEvent.click(buttons[0]);

        expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
        expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
        expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');
    });

    it('should toggle expansion in multi mode and allow multiple expanded items', () => {
        const items: AccordionItem[] = [
            {
                title: 'Panel Title 1',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
            {
                title: 'Panel Title 2',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
        ];

        renderWithProviders(<Accordion id="test" mode="multi" items={items} />);

        const buttons = screen.getAllByRole('button');

        expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
        expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');

        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[1]);
        expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
        expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(buttons[1]);
        expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
        expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    });

    it('should handle ArrowUp key press', () => {
        const items: AccordionItem[] = [
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

        renderWithProviders(<Accordion id="test" mode="multi" items={items} />);

        const buttons = screen.getAllByRole('button');

        buttons[0].focus();
        fireEvent.keyDown(buttons[0], { key: 'ArrowUp' });

        expect(buttons[2]).toHaveFocus();
    });

    it('should handle ArrowDown key press', () => {
        const items: AccordionItem[] = [
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

        renderWithProviders(<Accordion id="test" mode="multi" items={items} />);

        const buttons = screen.getAllByRole('button');

        buttons[2].focus();
        fireEvent.keyDown(buttons[2], { key: 'ArrowDown' });

        expect(buttons[0]).toHaveFocus();
    });

    it('should handle ArrowDown key press with disabled items', () => {
        const items: AccordionItem[] = [
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

        renderWithProviders(<Accordion id="test" mode="multi" items={items} />);

        const buttons = screen.getAllByRole('button');

        buttons[0].focus();
        fireEvent.keyDown(buttons[0], { key: 'ArrowDown' });

        expect(buttons[2]).toHaveFocus();
    });

    it('should handle ArrowUp key press with disabled items', () => {
        const items: AccordionItem[] = [
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

        renderWithProviders(<Accordion id="test" mode="multi" items={items} />);

        const buttons = screen.getAllByRole('button');

        buttons[2].focus();
        fireEvent.keyDown(buttons[2], { key: 'ArrowUp' });

        expect(buttons[0]).toHaveFocus();
    });

    it('should toggle the icon when the button is clicked and `expanded` is updated', () => {
        const items: AccordionItem[] = [
            {
                title: 'Panel Title 1',
                content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
            },
        ];

        const { container } = renderWithProviders(<Accordion id="test" items={items} />);

        const button = screen.getByRole('button', { name: 'Panel Title 1' });
        expect(container).toMatchSnapshot();

        fireEvent.click(button);
        expect(container).toMatchSnapshot();
    });
});
