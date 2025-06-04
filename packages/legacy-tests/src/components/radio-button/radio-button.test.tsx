import { RadioButton } from '~/components/radio-button/radio-button';
import { doNothing } from '../../test-utils/callbacks';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme } from '../../test-utils/renderer';

describe('Radio button', () => {
    it('should have controllable data-testid', () => {
        const wrapper = mountWithTheme(<RadioButton checked data-testid="radiobutton-testid" />);

        expect(getByTestId(wrapper, 'radiobutton-testid').exists()).toBe(true);
    });

    it('should be checked by default is defaultChecked prop is present', () => {
        const wrapper = mountWithTheme(<RadioButton defaultChecked />);

        const input = wrapper.find('input[type="radio"]');
        expect(input.prop('defaultChecked')).toBe(true);
    });

    it('onChange callback should be called when radio button is checked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<RadioButton onChange={callback} />);

        wrapper.find('input[type="radio"]').simulate('change');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should be checked when checked prop is set to true', () => {
        const wrapper = mountWithTheme(<RadioButton checked onChange={doNothing} />);

        const input = wrapper.find('input[type="radio"]');
        expect(input.prop('checked')).toBe(true);
    });

    it('should be disabled when disabled prop is set to true', () => {
        const wrapper = mountWithTheme(<RadioButton disabled />);

        const input = wrapper.find('input[type="radio"]');
        expect(input.prop('disabled')).toBe(true);
    });

    it('matches snapshot', () => {
        const tree = mountWithTheme(<RadioButton label="This is a label" />);

        expect(tree).toMatchSnapshot();
    });
});
