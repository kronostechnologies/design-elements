import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders } from '@design-elements/test-utils/renderer';
import React from 'react';
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

    test('Matches mobile Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });
});
