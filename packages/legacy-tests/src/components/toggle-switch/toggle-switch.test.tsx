import { shallow } from 'enzyme';
import { ToggleSwitch } from '~/components/toggle-switch/toggle-switch';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithTheme } from '../../test-utils/renderer';

describe('ToggleSwitch', () => {
    it('onToggle callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<ToggleSwitch onToggle={callback} label="Switch" toggled />);

        getByTestId(wrapper, 'toggle-switch').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(false);
    });

    it('onToggle callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(<ToggleSwitch onToggle={callback} disabled label="Switch" toggled />);

        getByTestId(wrapper, 'toggle-switch').simulate('click');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    it('has disabled styles', () => {
        const tree = renderWithTheme(<ToggleSwitch disabled label="Switch" toggled onToggle={jest.fn()} />);

        expect(tree).toMatchSnapshot();
    });
});
