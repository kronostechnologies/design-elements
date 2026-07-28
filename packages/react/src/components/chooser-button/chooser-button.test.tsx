import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { ChooserButton } from './chooser-button';

describe('Chooser Button', () => {
    it('onChange Callback is called when changed', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();

        renderWithProviders(
            <ChooserButton
                groupName="maritalStatus"
                onChange={callback}
                type="radio"
                value="test value"
            >
                Children
            </ChooserButton>,
        );

        await user.click(screen.getByText('Children'));

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('Matches the snapshot', () => {
        const { asFragment } = renderWithProviders(
            <ChooserButton
                groupName="maritalStatus"
                onChange={jest.fn()}
                type="radio"
                value="test value"
                defaultChecked
            >
                Children
            </ChooserButton>,
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
