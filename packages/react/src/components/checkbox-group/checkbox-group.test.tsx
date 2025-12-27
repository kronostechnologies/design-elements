import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { CheckboxGroup, type CheckboxGroupItem } from './checkbox-group';

const checkboxGroupItems: CheckboxGroupItem[] = [
    { label: 'Boat', name: 'vehicule1', value: 'boat' },
    {
        label: 'Plane', name: 'vehicule2', value: 'plane', defaultChecked: true,
    },
    {
        label: 'Car', name: 'vehicule3', value: 'car', disabled: true,
    },
    { label: 'Bike', name: 'vehicule4', value: 'bike' },
];

function targetChecked(checked: boolean): object {
    return expect.objectContaining({ target: expect.objectContaining({ checked }) });
}

describe('CheckboxGroup', () => {
    it('calls onChange callback when checkbox is checked / unchecked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(
            <CheckboxGroup
                checkboxGroup={checkboxGroupItems}
                onChange={callback}
            />,
        );

        const boatCheckbox = screen.getByLabelText('Boat');
        await user.click(boatCheckbox);

        expect(callback).toHaveBeenCalledWith(targetChecked(true));

        await user.click(boatCheckbox);

        expect(callback).toHaveBeenCalledWith(targetChecked(false));
    });

    it('can be used as a controlled value', () => {
        renderWithProviders(
            <CheckboxGroup
                checkboxGroup={checkboxGroupItems.filter((x) => x.defaultChecked !== true)}
                checkedValues={['boat', 'bike']}
                onChange={jest.fn()}
            />,
        );

        const boatCheckbox = screen.getByLabelText('Boat');
        expect(boatCheckbox).toBeChecked();
        const bikeCheckbox = screen.getByLabelText('Bike');
        expect(bikeCheckbox).toBeChecked();
    });

    it('matches the snapshot', () => {
        const { container } = renderWithProviders(
            <CheckboxGroup label="Vehicule" checkboxGroup={checkboxGroupItems} />,
        );

        expect(container).toMatchSnapshot();
    });
});
