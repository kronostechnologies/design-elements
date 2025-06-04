import { Heading, Tag, Type } from '~/components/heading/heading';
import { mountWithTheme } from '../../test-utils/renderer';

interface TestCases {
    type: Type;
    tag: Tag;
}

const testCases: TestCases[] = [
    { type: 'xlarge', tag: 'h1' },
    { type: 'large', tag: 'h2' },
    { type: 'medium', tag: 'h3' },
    { type: 'small', tag: 'h4' },
    { type: 'subtitle', tag: 'h2' },
];

describe('Heading', () => {
    testCases.forEach(({ type, tag }) => {
        it(`should return a ${tag} element when type is set to ${type}`, () => {
            const wrapper = mountWithTheme(<Heading type={type}>Heading</Heading>);

            expect(wrapper.find(tag)).toHaveLength(1);
        });

        it(`matches snapshot (${type})`, () => {
            const tree = mountWithTheme(<Heading type={type}>Heading</Heading>);

            expect(tree).toMatchSnapshot();
        });
    });

    it('overwrites default html tag when tag prop is set', () => {
        const wrapper = mountWithTheme(<Heading type="xlarge" tag="h3" />);

        expect(wrapper.find('h3')).toHaveLength(1);
    });

    it('matches snapshot (no margin)', () => {
        const tree = mountWithTheme(<Heading type="medium" noMargin>Heading</Heading>);

        expect(tree).toMatchSnapshot();
    });
});
