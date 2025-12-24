import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { Avatar } from './avatar';

describe('Avatar', () => {
    it('Matches Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches small avatar Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" size="small" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches medium avatar Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" size="medium" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches large avatar Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" size="large" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches mobile Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches mobile small avatar Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" size="small" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches mobile medium avatar Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" size="medium" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches mobile large avatar Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" size="large" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches small avatar with image Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" size="small" imgSrc="anImage" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches medium avatar with image Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" size="medium" imgSrc="anImage" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches large avatar with image Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" size="large" imgSrc="anImage" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches mobile avatar with image Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" imgSrc="anImage" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches mobile small avatar with image Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" size="small" imgSrc="anImage" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches mobile medium avatar with image Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" size="medium" imgSrc="anImage" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Matches mobile large avatar with image Snapshot', () => {
        const { container } = renderWithProviders(<Avatar username="AB" size="large" imgSrc="anImage" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Should use user icon when username is empty on desktop', () => {
        const { container } = renderWithProviders(<Avatar username="" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Should use bigger user icon when username is empty on mobile', () => {
        const { container } = renderWithProviders(<Avatar username="" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Should use user icon when username is undefined', () => {
        const { container } = renderWithProviders(<Avatar />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should display expected username initials', () => {
        renderWithProviders(<Avatar username="John Doe" />);

        expect(screen.getByTestId('avatar-initials')).toHaveTextContent('JD');
    });
});
