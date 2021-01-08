import React from 'react';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { Avatar } from './avatar';

describe('Avatar', () => {
    test('should display expected username initials', () => {
        const wrapper = mountWithProviders(<Avatar username="John Doe" />);

        const avatarInitials = getByTestId(wrapper, 'avatar-initials');

        expect(avatarInitials.prop('children')).toBe('JD');
    });

    test('Matches Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches small avatar Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size={AvatarSize.Small} />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches medium avatar Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size={AvatarSize.Medium} />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches large avatar Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size={AvatarSize.Large} />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches mobile Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches mobile small avatar Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size={AvatarSize.Small} />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches mobile medium avatar Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size={AvatarSize.Medium} />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches mobile large avatar Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size={AvatarSize.Large} />, 'mobile');

        expect(tree).toMatchSnapshot();
    });
});
