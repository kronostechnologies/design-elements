import { renderWithProviders } from '../../test-utils/renderer';
import { Combobox } from './combobox';

const provinces = [
    { value: 'Alberta' },
    { value: 'British Columbia' },
    { value: 'Manitoba' },
    { value: 'New Brunswick' },
    { value: 'Newfoundland and Labrador' },
    { value: 'Northwest Territories' },
    { value: 'Nova Scotia' },
    { value: 'Nunavut' },
    { value: 'Ontario' },
    { value: 'Prince Edward Island' },
    { value: 'Quebec' },
    { value: 'Saskatchewan' },
    { value: 'Yukon' },
];

describe('Combobox', () => {
    test('matches the snapshot', () => {
        const { container } = renderWithProviders(
            <Combobox
                defaultOpen
                label="Select an option"
                hint="Hint"
                options={provinces}
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches the snapshot (invalid)', () => {
        const { container } = renderWithProviders(
            <Combobox
                defaultOpen
                label="Select an option"
                options={provinces}
                valid={false}
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches the snapshot (disabled)', () => {
        const { container } = renderWithProviders(
            <Combobox
                defaultOpen
                label="Select an option"
                options={provinces}
                disabled
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches the snapshot (mobile)', () => {
        const { container } = renderWithProviders(
            <Combobox
                defaultOpen
                options={provinces}
            />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
