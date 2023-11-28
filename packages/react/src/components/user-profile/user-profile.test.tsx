import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { NavItemProps } from '../dropdown-menu/list-items';
import { getFirstFocusableItem, UserProfile } from './user-profile';

const onClick = jest.fn();
const options: NavItemProps[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
        onClick,
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testb',
        onClick,
        disabled: true,
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

describe('UserProfile', () => {
    beforeEach(() => {
        onClick.mockReset();
    });

    describe('getFirstFocusableItem', () => {
        test('should return first item that is not disabled', () => {
            const testOptions: NavItemProps[] = [
                {
                    label: 'Option A',
                    value: 'optionA',
                    href: '/testa',
                    disabled: true,
                },
                {
                    label: 'Option B',
                    value: 'optionB',
                    href: '/testb',
                },
            ];

            const result = getFirstFocusableItem(testOptions);

            expect(result).toBe(testOptions[1]);
        });

        test('should return undefined when every items are disabled', () => {
            const testOptions: NavItemProps[] = [
                {
                    label: 'Option A',
                    value: 'optionA',
                    href: '/testa',
                    disabled: true,
                },
                {
                    label: 'Option B',
                    value: 'optionB',
                    href: '/testb',
                    disabled: true,
                },
            ];

            const result = getFirstFocusableItem(testOptions);

            expect(result).toBe(undefined);
        });
    });

    test('should contain username', () => {
        const username = 'John Doe';
        const wrapper = mountWithProviders(<UserProfile username={username} options={options} />);

        expect(getByTestId(wrapper, 'menu-button').contains(username)).toBe(true);
    });

    test('should call on click when an option is clicked', () => {
        const username = 'John Doe';
        const wrapper = mountWithProviders(<UserProfile username={username} options={options} />);

        const actionA = getByTestId(wrapper, 'action-optionA');
        actionA.invoke('onClick')();

        expect(onClick).toHaveBeenCalled();
    });

    test('should not call on click when an option is disabled', () => {
        const username = 'John Doe';
        const wrapper = mountWithProviders(<UserProfile username={username} options={options} />);

        const actionB = getByTestId(wrapper, 'action-optionB');
        expect(actionB.prop('onClick')).toBe(undefined);
    });

    test('Matches Snapshot (desktop)', () => {
        const tree = renderWithProviders(<UserProfile username="Test Button" options={options} />, 'desktop');

        expect(tree).toMatchSnapshot();
    });

    test('Matches Snapshot (tag="nav")', () => {
        const tree = renderWithProviders(<UserProfile tag="nav" username="Test Button" options={options} />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches Snapshot (mobile)', () => {
        const tree = renderWithProviders(<UserProfile username="Test Button" options={options} />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches Snapshot (defaultOpen)', () => {
        const tree = renderWithProviders(<UserProfile defaultOpen username="Test Button" options={options} />);

        expect(tree).toMatchSnapshot();
    });
});
