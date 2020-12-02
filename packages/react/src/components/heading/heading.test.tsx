import { mount } from 'enzyme';
import React from 'react';

import { renderWithProviders } from '@design-elements/test-utils/renderer';
import { Heading, Tag, Type } from './heading';

interface TestCases {
    type: Type;
    tag: Tag;
}

const testCases: TestCases[] = [
    { type: 'xlarge', tag: 'h1' },
    { type: 'large', tag: 'h2' },
    { type: 'medium', tag: 'h3' },
    { type: 'small', tag: 'h4' },
];

describe('Heading', () => {
    testCases.forEach(({ type, tag }) => {
        test(`should return a ${tag} element when type is set to ${type}`, () => {
            const wrapper = mount(<Heading type={type}>Heading</Heading>);

            expect(wrapper.find(tag)).toHaveLength(1);
        });

        test(`matches snapshot (${type})`, () => {
            const tree = renderWithProviders(<Heading type={type}>Heading</Heading>);

            expect(tree).toMatchSnapshot();
        });
    });

    test('overwrites default html tag when tag prop is set', () => {
        const wrapper = mount(<Heading type="xlarge" tag="h3" />);

        expect(wrapper.find('h3')).toHaveLength(1);
    });

    test('matches snapshot (no margin)', () => {
        const tree = renderWithProviders(<Heading type="medium" noMargin>Heading</Heading>);

        expect(tree).toMatchSnapshot();
    });
});
