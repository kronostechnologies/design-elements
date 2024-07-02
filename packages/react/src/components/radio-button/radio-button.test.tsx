import { mountWithTheme } from '../../test-utils/renderer';
import { RadioButton } from './radio-button';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { doNothing } from '../../test-utils/callbacks';

describe('Radio button', () => {
    test('should have controllable data-testid', () => {
        const wrapper = mountWithTheme(<RadioButton checked data-testid="radiobutton-testid" />);

        expect(getByTestId(wrapper, 'radiobutton-testid').exists()).toBe(true);
    });

    test('should be checked by default is defaultChecked prop is present', () => {
        const wrapper = mountWithTheme(<RadioButton defaultChecked />);

        const input = wrapper.find('input[type="radio"]');
        expect(input.prop('defaultChecked')).toBe(true);
    });

    test('onChange callback should be called when radio button is checked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<RadioButton onChange={callback} />);

        wrapper.find('input[type="radio"]').simulate('change');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should be checked when checked prop is set to true', () => {
        const wrapper = mountWithTheme(<RadioButton checked onChange={doNothing} />);

        const input = wrapper.find('input[type="radio"]');
        expect(input.prop('checked')).toBe(true);
    });

    test('should be disabled when disabled prop is set to true', () => {
        const wrapper = mountWithTheme(<RadioButton disabled />);

        const input = wrapper.find('input[type="radio"]');
        expect(input.prop('disabled')).toBe(true);
    });

    test('matches snapshot', () => {
        const tree = mountWithTheme(<RadioButton label="This is a label" />);

        expect(tree).toMatchSnapshot();
    });
});
