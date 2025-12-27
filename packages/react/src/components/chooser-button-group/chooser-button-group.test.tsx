import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/testing-library';
import { ChooserButtonGroup, type ChooserButtonOption } from './chooser-button-group';

describe('Chooser Button GroupItem', () => {
    const maritalStatus: ChooserButtonOption[] = [
        { value: 'single', label: 'Single, living alone or with a roommate' },
        { value: 'married', label: 'Married or living with a spouse' },
    ];

    const skipOption: ChooserButtonOption = {
        label: 'Would rather not say',
        value: 'skip',
    };

    it('onChange callback is called when chooser-button is changed', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();

        renderWithProviders(
            <ChooserButtonGroup
                inColumns
                groupName="maritalStatus"
                options={maritalStatus}
                skipOption={skipOption}
                onChange={callback}
            />,
        );

        await user.click(screen.getByLabelText('Single, living alone or with a roommate'));

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(maritalStatus[0]);
    });

    it('Matches the snapshot', () => {
        const { asFragment } = renderWithProviders(
            <ChooserButtonGroup
                inColumns
                groupName="maritalStatus"
                options={maritalStatus}
                skipOption={skipOption}
                value="married"
            />,
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
