import { ReactNode } from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { DropdownList } from './dropdown-list';

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (children: ReactNode, _: Element | DocumentFragment) => (
        <div data-testid="mock-portal">{children}</div>
    ),
}));

jest.mock('../toast/toast-provider', () => ({
    ToastProvider: ({ children }: { children: ReactNode }) => children,
}));

const provinces = [
    { value: 'ab', label: 'Alberta' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'mb', label: 'Manitoba' },
    { value: 'nb', label: 'New Brunswick' },
    { value: 'nl', label: 'Newfoundland and Labrador' },
    { value: 'nt', label: 'Northwest Territories' },
    { value: 'ns', label: 'Nova Scotia' },
    { value: 'nu', label: 'Nunavut' },
    { value: 'on', label: 'Ontario' },
    { value: 'pe', label: 'Prince Edward Island' },
    { value: 'qc', label: 'Quebec' },
    { value: 'sk', label: 'Saskatchewan' },
    { value: 'yt', label: 'Yukon' },
];

describe('Dropdown list', () => {
    test('matches the snapshot', () => {
        const { container } = renderWithProviders(
            <DropdownList
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
            <DropdownList
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
            <DropdownList
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
            <DropdownList
                defaultOpen
                options={provinces}
            />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches the snapshot (multiselect)', () => {
        const { container } = renderWithProviders(
            <DropdownList
                defaultOpen
                options={provinces}
                multiselect
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches the snapshot (icon)', () => {
        const { container } = renderWithProviders(
            <DropdownList
                defaultOpen
                label="Select an option"
                hint="Hint"
                options={provinces}
                iconName="menu"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
