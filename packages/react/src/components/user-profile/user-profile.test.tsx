import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { NavItemProps } from '../dropdown-menu';
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
        it('should return first item that is not disabled', () => {
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

        it('should return undefined when every items are disabled', () => {
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

    it('matches Snapshot (`full-name`)', async () => {
        const user = userEvent.setup();
        const { baseElement, getByTestId } = renderWithProviders(
            <UserProfile username="Test Button" options={options} variant="full-name" />,
            'desktop',
        );

        const element = getByTestId('menu-button');
        await user.click(element);

        expect(baseElement).toMatchSnapshot();
    });

    it('matches Snapshot (tag="nav")', async () => {
        const user = userEvent.setup();
        const { baseElement, getByTestId } = renderWithProviders(
            <UserProfile tag="nav" username="Test Button" options={options} variant="full-name" />,
        );

        const element = getByTestId('menu-button');
        await user.click(element);

        expect(baseElement).toMatchSnapshot();
    });

    it('matches Snapshot (variant=`avatar-only`)', () => {
        const { container } = renderWithProviders(
            <UserProfile
                variant="avatar-only"
                username="Test Button"
                options={options}
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches Snapshot (mobile)', async () => {
        const user = userEvent.setup();
        const { baseElement, getByTestId } = renderWithProviders(
            <UserProfile username="Test Button" options={options} />,
            'mobile',
        );

        const element = getByTestId('menu-button');
        await user.click(element);

        expect(baseElement).toMatchSnapshot();
    });

    it('matches Snapshot (defaultOpen)', async () => {
        const user = userEvent.setup();
        const { baseElement, getByTestId } = renderWithProviders(
            <UserProfile defaultOpen username="Test Button" options={options} variant="full-name" />,
        );

        const element = getByTestId('menu-button');
        await user.click(element);

        expect(baseElement).toMatchSnapshot();
    });

    it('should contain username', () => {
        const username = 'John Doe';
        renderWithProviders(<UserProfile username={username} options={options} variant="full-name" />);

        expect(screen.getByTestId('menu-button')).toHaveTextContent(username);
    });

    it('should call on click when an option is clicked', async () => {
        const user = userEvent.setup();
        const username = 'John Doe';
        renderWithProviders(<UserProfile username={username} options={options} />);

        await user.click(screen.getByTestId('menu-button'));

        const actionA = screen.getByTestId('listitem-optionA');
        await user.click(actionA);

        expect(onClick).toHaveBeenCalled();
    });

    it('should not call on click when an option is disabled', async () => {
        const user = userEvent.setup();
        const username = 'John Doe';
        renderWithProviders(<UserProfile username={username} options={options} />);

        await user.click(screen.getByTestId('menu-button'));

        const actionB = screen.getByTestId('listitem-optionB');
        await expect(user.click(actionB)).toReject();

        expect(onClick).not.toHaveBeenCalled();
    });

    it('should have caret and label when variant is "full-name"', () => {
        const username = 'John Doe';
        renderWithProviders(
            <UserProfile
                username={username}
                options={options}
                variant="full-name"
            />,
        );

        const button = screen.getByTestId('menu-button');
        expect(button).toHaveTextContent(username);
    });

    it('should not have caret or label when variant is null', () => {
        const username = 'John Doe';
        renderWithProviders(
            <UserProfile
                username={username}
                options={options}
            />,
        );

        const button = screen.getByTestId('menu-button');
        expect(button).not.toHaveTextContent(username);
    });

    it('should not have caret or label when variant is "avatar-only"', () => {
        const username = 'John Doe';
        renderWithProviders(
            <UserProfile
                username={username}
                options={options}
                variant="avatar-only"
            />,
        );

        const button = screen.getByTestId('menu-button');
        expect(button).not.toHaveTextContent(username);
    });
});
