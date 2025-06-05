import { shallow } from 'enzyme';
import { ShadowWrapper } from '~/components/shadow-wrapper/shadow-wrapper';

jest.mock('~/styles', () => ({
    mainCss: 'main css',
}));

describe('Shadow Wrapper', () => {
    it('is div element by default', () => {
        const wrapper = shallow(<ShadowWrapper>Test</ShadowWrapper>);

        expect(wrapper.html()).toBe('<div></div>');
    });

    it('is set to tagName element', () => {
        const wrapper = shallow(<ShadowWrapper tagName="section">Test</ShadowWrapper>);

        expect(wrapper.html()).toBe('<section></section>');
    });

    it('should inject main css', () => {
        const wrapper = shallow(<ShadowWrapper>Test</ShadowWrapper>);

        expect(wrapper.find('style').text()).toEqual('main css');
    });
});
