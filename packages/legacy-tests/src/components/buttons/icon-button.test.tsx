import { shallow } from 'enzyme';
import { IconButton } from '~/components/buttons/icon-button';
import { mountWithProviders, mountWithTheme } from '../../test-utils/renderer';

describe('Icon Button', () => {
    it('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
                onClick={callback}
            />,
        );

        wrapper.simulate('click');
        expect(callback).toHaveBeenCalled();
    });

    it('onClick callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <IconButton
                label="home"
                iconName="home"
                onClick={callback}
                buttonType="primary"
                disabled
            />,
        );

        wrapper.simulate('click');
        expect(callback).not.toHaveBeenCalled();
    });

    it('focusable button has no tabIndex prop', () => {
        const wrapper = mountWithProviders(<IconButton
            iconName="home"
            buttonType="primary"
            label="home"
        />);

        expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBeNull();
    });

    it('non-focusable button has tabIndex=-1', () => {
        const wrapper = mountWithProviders(<IconButton
            iconName="home"
            buttonType="primary"
            label="home"
            focusable={false}
        />);

        expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe('-1');
    });

    it('focusable button has focus styles', () => {
        const wrapper = mountWithProviders(<IconButton
            iconName="home"
            buttonType="primary"
            label="home"
        />);

        expect(wrapper).toHaveStyleRule('outline', '2px solid #84C6EA', {
            modifier: ':focus-visible',
        });
    });

    it('non-focusable button does not have focus styles', () => {
        const wrapper = mountWithProviders(<IconButton
            iconName="home"
            buttonType="primary"
            label="home"
            focusable={false}
        />);

        expect(wrapper).not.toHaveStyleRule('outline', 'none', {
            modifier: ':focus',
        });
    });
});
