import { fireEvent } from '@testing-library/react';
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

    test('Matches Snapshot (`full-name`)', () => {
        const { baseElement, getByTestId } = renderWithProviders(
            <UserProfile username="Test Button" options={options} variant='full-name' />,
            'desktop',
        );

        const element = getByTestId('menu-button');
        fireEvent.click(element);

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches Snapshot (tag="nav")', () => {
        const { baseElement, getByTestId } = renderWithProviders(
            <UserProfile tag="nav" username="Test Button" options={options} variant='full-name' />,
        );

        const element = getByTestId('menu-button');
        fireEvent.click(element);

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches Snapshot (variant=`avatar-only`)', () => {
        const { container } = renderWithProviders(
            <UserProfile
                variant='avatar-only'
                username="Test Button"
                options={options}
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches Snapshot (mobile)', () => {
        const { baseElement, getByTestId } = renderWithProviders(
            <UserProfile username="Test Button" options={options} />,
            'mobile',
        );

        const element = getByTestId('menu-button');
        fireEvent.click(element);

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches Snapshot (defaultOpen)', () => {
        const { baseElement, getByTestId } = renderWithProviders(
            <UserProfile defaultOpen username="Test Button" options={options} variant='full-name' />,
        );

        const element = getByTestId('menu-button');
        fireEvent.click(element);

        expect(baseElement).toMatchSnapshot();
    });
});
