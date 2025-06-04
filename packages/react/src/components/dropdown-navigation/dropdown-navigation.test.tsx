import { renderWithProviders } from '../../test-utils/renderer';
import { DropdownNavigation } from './dropdown-navigation';

const options = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testb',
    },
    {
        label: 'Option C',
        value: 'optionC',
        href: '/testc',
    },
    {
        label: 'Option D',
        value: 'optionD',
        href: '/testd',
    },
];

describe('DropdownNavigation', () => {
    test('Matches Snapshot', () => {
        const { container } = renderWithProviders(
            <DropdownNavigation options={options}>
                Test Button
            </DropdownNavigation>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches Snapshot (tag="nav")', () => {
        const { container } = renderWithProviders(
            <DropdownNavigation tag="nav" options={options}>
                Test Button
            </DropdownNavigation>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches Snapshot (defaultOpen)', () => {
        const { container } = renderWithProviders(
            <DropdownNavigation defaultOpen options={options}>
                Test Button
            </DropdownNavigation>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
