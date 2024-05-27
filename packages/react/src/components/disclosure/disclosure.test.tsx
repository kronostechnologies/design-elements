import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Disclosure } from './disclosure';

describe('DisclosureWidget', () => {
    const buttonAriaControls = 'idPopup';
    const contentToDisplay = jest.fn();
    const buttonLabel = 'buttonLabel';

    it('button click should display content', async () => {
        render(
            <Disclosure>
                {contentToDisplay}
            </Disclosure>
        );

        await userEvent.click(screen.getByText(buttonLabel));

        expect(contentToDisplay).toHaveBeenCalledTimes(1);
    });

    it('button click should set aria-expanded to true', async () => {
        render(
            <Disclosure>
                {contentToDisplay}
            </Disclosure>
        );

        await userEvent.click(screen.getByText(buttonLabel));

        expect(screen.getByText(buttonLabel)).toHaveAttribute('aria-expanded', true);
    });

    it('aria-expanded should be set to false by default', () => {
        render(
            <Disclosure>
                {contentToDisplay}
            </Disclosure>
        );

        expect(screen.getByText(buttonLabel)).toHaveAttribute('aria-expanded', false);
    });

    it('button-aria-controls provided should set button aria-controls to provided aria-controls', () => {
        render(
            <Disclosure>
                {contentToDisplay}
            </Disclosure>
        );

        expect(screen.getByText(buttonLabel)).toHaveAttribute('aria-controls', buttonAriaControls);
    });

    it('tab pressed should focus on button', async () => {
        render(
            <Disclosure>
                {contentToDisplay}
            </Disclosure>
        );

        await userEvent.tab()

        expect(screen.getByText(buttonLabel)).toHaveFocus();
    });
});
