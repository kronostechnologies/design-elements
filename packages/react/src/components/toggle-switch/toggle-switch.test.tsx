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
        const { getByTestId: byTestId, getByRole } = renderWithProviders(
            <ToggleSwitch label="Switch" toggled onToggle={jest.fn()} />,
        );

        const label = byTestId('switch-label');
        const button = getByRole('switch');

        expect(button?.nextSibling).toBe(label);
    });

    test('renders label to the left when labelPosition is "left"', () => {
        const { container } = renderWithProviders(
            <ToggleSwitch label="Switch" labelPosition="left" toggled onToggle={jest.fn()} />,
        );

        const label = container.querySelector('label');
        const button = container.querySelector('button');

        expect(label?.nextSibling).toBe(button);
    });

    test('has disabled styles', () => {
        const tree = renderWithTheme(<ToggleSwitch disabled label="Switch" toggled onToggle={jest.fn()} />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (desktop)', () => {
        const { container } = renderWithProviders(
            <ToggleSwitch label="Switch" toggled onToggle={jest.fn()} />,
            'desktop',
        );

        expect(container.children).toMatchSnapshot();
    });

    test('Matches snapshot (mobile)', () => {
        const { container } = renderWithProviders(
            <ToggleSwitch label="Switch" toggled onToggle={jest.fn()} />,
            'mobile',
        );

        expect(container.children).toMatchSnapshot();
    });
});
