import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { Avatar } from './avatar';
import { AZ_BG_COLORS, AZ_TXT_COLORS } from './avatar.constants';

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

    it('renders custom icon when iconName is provided', () => {
        const { container } = renderWithProviders(<Avatar iconName="organization" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    describe('color generation from username', () => {
        it('should use generated background color from username when no bgColor provided', () => {
            const { container } = renderWithProviders(<Avatar username="Alice" />);
            const element = container.firstChild as HTMLElement;

            expect(element).toHaveStyle({ backgroundColor: AZ_BG_COLORS[0] });
        });

        it('should use generated text color from username when no bgColor provided', () => {
            const { container } = renderWithProviders(<Avatar username="Alice" />);
            const element = container.firstChild as HTMLElement;

            expect(element).toHaveStyle({ color: AZ_TXT_COLORS[0] });
        });

        it('should use provided bgColor and not override text color with generated one', () => {
            const { container } = renderWithProviders(<Avatar username="Alice" bgColor="#123456" />);
            const element = container.firstChild as HTMLElement;

            expect(element).toHaveStyle({ backgroundColor: '#123456' });
            // Text color should come from theme token, not from generated colors
            expect(element).not.toHaveStyle({ color: AZ_TXT_COLORS[0] });
        });

        it('should use different colors for different first letters', () => {
            const containerA = renderWithProviders(<Avatar username="Alice" />).container;
            const containerB = renderWithProviders(<Avatar username="Bob" />).container;

            const elementA = containerA.firstChild as HTMLElement;
            const elementB = containerB.firstChild as HTMLElement;

            expect(elementA).toHaveStyle({ backgroundColor: AZ_BG_COLORS[0] });
            expect(elementB).toHaveStyle({ backgroundColor: AZ_BG_COLORS[1] });
        });

        it('should fall back to theme colors for non-username variant', () => {
            const { container } = renderWithProviders(<Avatar />);
            const element = container.firstChild as HTMLElement;

            const computedStyle = window.getComputedStyle(element);
            expect(computedStyle.backgroundColor).not.toBe(AZ_BG_COLORS[0]);
        });

        it('should use same colors for same first letter (case-insensitive)', () => {
            const containerLower = renderWithProviders(<Avatar username="alice" />).container;
            const containerUpper = renderWithProviders(<Avatar username="ALICE" />).container;

            const elementLower = containerLower.firstChild as HTMLElement;
            const elementUpper = containerUpper.firstChild as HTMLElement;

            expect(elementLower).toHaveStyle({ backgroundColor: AZ_BG_COLORS[0], color: AZ_TXT_COLORS[0] });
            expect(elementUpper).toHaveStyle({ backgroundColor: AZ_BG_COLORS[0], color: AZ_TXT_COLORS[0] });
        });

        it('should handle accented first character by mapping to base letter', () => {
            const containerAccented = renderWithProviders(<Avatar username="Éric" />).container;
            const containerUnaccented = renderWithProviders(<Avatar username="Eric" />).container;

            const elementAccented = containerAccented.firstChild as HTMLElement;
            const elementUnaccented = containerUnaccented.firstChild as HTMLElement;

            expect(elementAccented).toHaveStyle({ backgroundColor: AZ_BG_COLORS[4] });
            expect(elementUnaccented).toHaveStyle({ backgroundColor: AZ_BG_COLORS[4] });
        });
    });
});
