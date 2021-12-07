import { shallow } from 'enzyme';
import { ShadowWrapper } from './shadow-wrapper';

jest.mock('../../styles', () => ({
    mainCss: 'main css',
}));

describe('Shadow Wrapper', () => {
    test('is div element by default', () => {
        const wrapper = shallow(<ShadowWrapper>Test</ShadowWrapper>);

        expect(wrapper.html()).toBe('<div></div>');
    });

    test('is set to tagName element', () => {
        const wrapper = shallow(<ShadowWrapper tagName="section">Test</ShadowWrapper>);

        expect(wrapper.html()).toBe('<section></section>');
    });

    test('should inject main css', () => {
        const wrapper = shallow(<ShadowWrapper>Test</ShadowWrapper>);

        expect(wrapper.find('style').text()).toEqual('main css');
    });
});
