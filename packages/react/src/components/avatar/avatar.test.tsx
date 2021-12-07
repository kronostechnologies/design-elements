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
        const tree = renderWithProviders(<Avatar username="AB" size="small" />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches medium avatar Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size="medium" />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches large avatar Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size="large" />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches mobile Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches mobile small avatar Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size="small" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches mobile medium avatar Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size="medium" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches mobile large avatar Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size="large" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches small avatar with image Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size="small" imgSrc="anImage" />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches medium avatar with image Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size="medium" imgSrc="anImage" />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches large avatar with image Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size="large" imgSrc="anImage" />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches mobile avatar with image Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" imgSrc="anImage" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches mobile small avatar with image Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size="small" imgSrc="anImage" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches mobile medium avatar with image Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size="medium" imgSrc="anImage" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches mobile large avatar with image Snapshot', () => {
        const tree = renderWithProviders(<Avatar username="AB" size="large" imgSrc="anImage" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Should use user icon when username is empty on desktop', () => {
        const tree = renderWithProviders(<Avatar username="" />);

        expect(tree).toMatchSnapshot();
    });

    test('Should use bigger user icon when username is empty on mobile', () => {
        const tree = renderWithProviders(<Avatar username="" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Should use user icon when username is undefined', () => {
        const tree = renderWithProviders(<Avatar />);

        expect(tree).toMatchSnapshot();
    });
});
