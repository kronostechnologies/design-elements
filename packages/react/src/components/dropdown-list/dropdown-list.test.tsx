import { fireEvent, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { type Overflow } from '../../hooks/use-overflow';
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

jest.mock('../../hooks/use-overflow', () => ({
    useOverflow: (): Overflow => ({
        horizontal: false,
        vertical: false,
    }),
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
    function clickDropdownListOption(id: string): void {
        const option = screen.getByTestId(id);
        fireEvent.click(option);
    }

    describe('default value', () => {
        test('the specified defaultValues are independently displayed when list is multiselect', () => {
            renderWithProviders(<DropdownList options={provinces} defaultValue={['nl', 'qc']} multiselect />);

            expect(screen.queryByTestId('listboxtag-qc')).toBeInTheDocument();
            expect(screen.queryByTestId('listboxtag-nl')).toBeInTheDocument();
            expect(screen.getByTestId('tag-wrapper').children).toHaveLength(2);
            expect(screen.getByTestId('input')).toHaveProperty('value', 'nl|qc');
        });
    });

    describe('option selection', () => {
        test('clicking an option selects it and adds it to the input values when list is multiselect', () => {
            renderWithProviders(<DropdownList options={provinces} defaultOpen multiselect />);

            clickDropdownListOption('listitem-nl');
            clickDropdownListOption('listitem-qc');

            expect(screen.getByTestId('textbox')).toHaveAttribute('value', 'nl|qc');
            expect(screen.getByTestId('input')).toHaveValue('nl|qc');
        });

        test('options are disabled when max number of selectable options is reached', () => {
            renderWithProviders(
                <DropdownList options={provinces} defaultOpen multiselect maxSelectableOptions={2} />,
            );

            clickDropdownListOption('listitem-on');
            clickDropdownListOption('listitem-qc');

            const disabledOptions = [
                screen.getByTestId('listitem-ab'),
                screen.getByTestId('listitem-bc'),
                screen.getByTestId('listitem-mb'),
                screen.getByTestId('listitem-nb'),
                screen.getByTestId('listitem-nl'),
                screen.getByTestId('listitem-nt'),
                screen.getByTestId('listitem-ns'),
                screen.getByTestId('listitem-nu'),
                screen.getByTestId('listitem-pe'),
                screen.getByTestId('listitem-sk'),
                screen.getByTestId('listitem-yt'),
            ];
            disabledOptions.forEach((option) => {
                expect(option).toHaveAttribute('aria-disabled', 'true');
            });
        });

        test('selected options are not disabled when max number of selectable options is reached', () => {
            renderWithProviders(
                <DropdownList options={provinces} defaultOpen multiselect maxSelectableOptions={2} />,
            );

            clickDropdownListOption('listitem-on');
            clickDropdownListOption('listitem-qc');

            const selectedOptions = [
                screen.getByTestId('listitem-on'),
                screen.getByTestId('listitem-qc'),
            ];
            selectedOptions.forEach((option) => {
                expect(option).toHaveAttribute('aria-disabled', 'false');
            });
        });
    });

    describe('keyboard navigation', () => {
        test('Enter removes the focused Tag when list is multiselect', () => {
            renderWithProviders(
                <DropdownList options={provinces} defaultValue={['ab', 'bc']} defaultOpen multiselect />,
            );

            fireEvent.keyDown(
                screen.getByTestId('listboxtag-bc'),
                { key: 'Enter', preventDefault: jest.fn() },
            );

            expect(screen.getByTestId('textbox')).toHaveAttribute('value', 'ab');
            expect(screen.getByTestId('input')).toHaveAttribute('value', 'ab');
        });
    });

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
