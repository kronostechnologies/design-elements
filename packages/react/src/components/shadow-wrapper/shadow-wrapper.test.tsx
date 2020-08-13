import { shallow } from 'enzyme';
import React from 'react';
import { ShadowWrapper } from './shadow-wrapper';

describe('Shadow Wrapper', () => {
    test('is div element by default', () => {
        const wrapper = shallow(<ShadowWrapper>Test</ShadowWrapper>);

        expect(wrapper.html()).toBe('<div></div>');
    });

    test('is set to tagName element', () => {
        const wrapper = shallow(<ShadowWrapper tagName="section">Test</ShadowWrapper>);

        expect(wrapper.html()).toBe('<section></section>');
    });
});
