import { Avatar } from '~/components/avatar/avatar';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';

describe('Avatar', () => {
    it('should display expected username initials', () => {
        const wrapper = mountWithProviders(<Avatar username="John Doe" />);

        const avatarInitials = getByTestId(wrapper, 'avatar-initials');

        expect(avatarInitials.prop('children')).toBe('JD');
    });
});
