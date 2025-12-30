import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { Heading, HeadingTag, HeadingType } from './heading';

interface TestCases {
    type: HeadingType;
    tag: HeadingTag;
    level: number;
}

const testCases: TestCases[] = [
    { type: 'xlarge', tag: 'h1', level: 1 },
    { type: 'large', tag: 'h2', level: 2 },
    { type: 'medium', tag: 'h3', level: 3 },
    { type: 'small', tag: 'h4', level: 4 },
    { type: 'subtitle', tag: 'h2', level: 2 },
];

describe('Heading', () => {
    testCases.forEach(({ type, tag, level }) => {
        it(`should return a ${tag} element when type is set to ${type}`, () => {
            renderWithProviders(<Heading type={type}>Heading</Heading>);

            expect(screen.getByRole('heading', { level })).toBeInTheDocument();
        });

        it(`matches snapshot (${type})`, () => {
            const { asFragment } = renderWithProviders(<Heading type={type}>Heading</Heading>);

            expect(asFragment()).toMatchSnapshot();
        });
    });

    it('overwrites default html tag when tag prop is set', () => {
        renderWithProviders(<Heading type="xlarge" tag="h3" />);

        expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('matches snapshot (no margin)', () => {
        const { asFragment } = renderWithProviders(<Heading type="medium" noMargin>Heading</Heading>);

        expect(asFragment()).toMatchSnapshot();
    });
});
