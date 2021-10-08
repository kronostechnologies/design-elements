import React from 'react';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { UserProfile } from './user-profile';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { NavItemProps } from '../dropdown-menu/list-items';

jest.mock('../../utils/uuid');

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

    test('Matches Snapshot (mobile)', () => {
        const tree = renderWithProviders(<UserProfile username="Test Button" options={options} />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches Snapshot (defaultOpen)', () => {
        const tree = renderWithProviders(<UserProfile defaultOpen username="Test Button" options={options} />);

        expect(tree).toMatchSnapshot();
    });
});
