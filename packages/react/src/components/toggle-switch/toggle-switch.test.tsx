import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders, renderWithTheme } from '../../test-utils/renderer';
import { ToggleSwitch } from './toggle-switch';

describe('ToggleSwitch', () => {
    test('onToggle callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<ToggleSwitch onToggle={callback} label="Switch" toggled />);

        getByTestId(wrapper, 'toggle-switch').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(false);
    });

    test('onToggle callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(<ToggleSwitch onToggle={callback} disabled label="Switch" toggled />);

        getByTestId(wrapper, 'toggle-switch').simulate('click');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('renders label to the right when labelPosition is "right" (by default)', () => {
        const wrapper = mountWithProviders(
            <ToggleSwitch label="Switch" toggled onToggle={jest.fn()} />,
        );

        const label = getByTestId(wrapper, 'switch-label');
        const button = wrapper.find('[role="switch"]').at(0);

        expect(button.getDOMNode().nextSibling).toBe(label.getDOMNode());
    });

    test('renders label to the left when labelPosition is "left"', () => {
        const wrapper = mountWithProviders(
            <ToggleSwitch label="Switch" labelPosition="left" toggled onToggle={jest.fn()} />,
        );

        const label = getByTestId(wrapper, 'switch-label');
        const button = wrapper.find('[role="switch"]').at(0);

        expect(label.getDOMNode().nextSibling).toBe(button.getDOMNode());
    });

    test('has disabled styles', () => {
        const tree = renderWithTheme(<ToggleSwitch disabled label="Switch" toggled onToggle={jest.fn()} />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (desktop)', () => {
        const tree = renderWithProviders(<ToggleSwitch label="Switch" toggled onToggle={jest.fn()} />, 'desktop');

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (mobile)', () => {
        const tree = renderWithProviders(<ToggleSwitch label="Switch" toggled onToggle={jest.fn()} />, 'mobile');

        expect(tree).toMatchSnapshot();
    });
});
