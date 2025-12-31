import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { RadioButtonGroup } from './radio-button-group';

const Buttons = [
    { label: 'Earth', value: 'earth' },
    { label: 'Mars', value: 'mars', defaultChecked: true },
    { label: 'Pluto', value: 'pluto', disabled: true },
    { label: 'Saturn', value: 'saturn' },
];

describe('Radio button', () => {
    it('onChange callback is called when changed', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(
            <RadioButtonGroup label="Planets" groupName="planets" buttons={Buttons} onChange={callback} />,
        );

        await user.click(screen.getByLabelText(Buttons[0].label));

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('Can be used as a controlled input', () => {
        const onChange = jest.fn();

        renderWithProviders(
            <RadioButtonGroup
                groupName="color"
                checkedValue="red"
                buttons={[{ label: 'Red', value: 'red' }]}
                onChange={onChange}
            />,
        );

        expect(screen.getByLabelText('Red')).toBeChecked();
    });

    it('defaultChecked should show content from radio button', () => {
        const buttons = [{
            label: 'With Content',
            value: 'content',
            defaultChecked: true,
            content: {
                element: <div data-testid="content-div">Test</div>,
            },
        }];

        renderWithProviders(
            <RadioButtonGroup
                groupName="withContent"
                buttons={buttons}
            />,
        );

        expect(screen.getByTestId('content-div')).toBeVisible();
    });

    it('should show content from radio button with checkedValue', () => {
        const buttons = [{
            label: 'With Content',
            value: 'content',
            content: {
                element: <div data-testid="content-div">Test</div>,
            },
        }];

        renderWithProviders(
            <RadioButtonGroup
                checkedValue="content"
                groupName="withContent"
                buttons={buttons}
            />,
        );

        expect(screen.getByTestId('content-div')).toBeVisible();
    });

    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(
            <RadioButtonGroup
                id="test-id"
                label="Planets"
                groupName="planets"
                buttons={Buttons}
            />,
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
