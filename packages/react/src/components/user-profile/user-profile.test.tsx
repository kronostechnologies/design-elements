import { shallow } from 'enzyme';
import React from 'react';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { UserProfile } from './user-profile';
import { getByTestId } from '../../test-utils/enzyme-selectors';

jest.mock('../../utils/uuid');

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

describe('UserProfile', () => {
    test('should contain username', () => {
        const username = 'John Doe';
        const wrapper = shallow(<UserProfile username={username} options={options} />);

        expect(getByTestId(wrapper, 'user-profile').text()).toBe(username);
    });

    test('should have prefix when usernamePrefix is defined', () => {
        const wrapper = shallow(<UserProfile username="Test" usernamePrefix="prefix" options={options} />);

        expect(getByTestId(wrapper, 'username-prefix').exists()).toBe(true);
    });

    test('should not have prefix when usernamePrefix is defined given device is mobile', () => {
        const wrapper = mountWithProviders(
            <UserProfile username="Test" usernamePrefix="prefix" options={options} />,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(getByTestId(wrapper, 'username-prefix').exists()).toBe(false);
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

    test('Matches Snapshot (with username prefix)', () => {
        const tree = renderWithProviders(
            <UserProfile
                usernamePrefix="prefix"
                username="Test Button"
                options={options}
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches Snapshot (with avatarUsername)', () => {
        const tree = renderWithProviders(
            <UserProfile
                username="Test Button"
                avatarUsername="Avatar Username"
                options={options}
            />,
        );

        expect(tree).toMatchSnapshot();
    });
});
