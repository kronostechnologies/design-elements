import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { NavItemProps } from '../dropdown-menu/list-items';
import { getFirstFocusableItem, UserProfile } from './user-profile';

const onClick = jest.fn();
const options: NavItemProps[] = [
    {
        href: '/testa',
        label: 'Option A',
        onClick,
        value: 'optionA',
    },
    {
        disabled: true,
        href: '/testb',
        label: 'Option B',
        onClick,
        value: 'optionB',
    },
    {
        href: '/testc',
        label: 'Option C',
        value: 'optionC',
    },
    {
        href: 'www.test.ca',
        isHtmlLink: true,
        label: 'Option D',
        target: '_blank',
        value: 'optionD',
    },
    {
        href: 'www.test.ca',
        isExternalLink: true,
        label: 'Option E',
        value: 'optionE',
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
        const { container } = renderWithProviders(<UserProfile username="Test Button" options={options} />, 'desktop');

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches Snapshot (tag="nav")', () => {
        const { container } = renderWithProviders(<UserProfile tag="nav" username="Test Button" options={options} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches Snapshot (mobile)', () => {
        const { container } = renderWithProviders(<UserProfile username="Test Button" options={options} />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches Snapshot (defaultOpen)', () => {
        const { container } = renderWithProviders(<UserProfile defaultOpen username="Test Button" options={options} />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
