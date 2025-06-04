import { doNothing } from '../../test-utils/callbacks';
import { mountWithTheme } from '../../test-utils/renderer';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { Checkbox } from './checkbox';

const defaultProps = {
    label: 'Boat',
    name: 'vehicule',
    value: 'boat',
};

describe('Checkbox', () => {
    test('has controllable data-testid', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <Checkbox data-testid="some-data-testid" {...defaultProps} onChange={callback} />,
        );

        expect(getByTestId(wrapper, 'some-data-testid').exists()).toBe(true);
    });

    test('onChange callback should be called when checkbox is checked / unchecked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} onChange={callback} />);

        wrapper.find('input').simulate('change');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should be default checked when defaultChecked prop is set to true', () => {
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} defaultChecked />);

        const input = wrapper.find('input');
        expect(input.prop('defaultChecked')).toBe(true);
    });

    test('should be checked when checked prop is set to true', () => {
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} checked onChange={doNothing} />);

        const input = wrapper.find('input');
        expect(input.prop('checked')).toBe(true);
    });

    test('should be disabled when disabled prop is set to true', () => {
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} disabled />);

        const input = wrapper.find('input');
        expect(input.prop('disabled')).toBe(true);
    });

    test('should be required when required prop is set to true', () => {
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} required />);

        const input = wrapper.find('input');
        expect(input.prop('required')).toBe(true);
    });

    test('should display warning message if input is invalid and not checked', () => {
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} id="checkbox-test" required valid={false} />);

        const warning = wrapper.find('checkbox-test');
        expect(warning).toBeDefined();
    });

    test('should hide warning message if input is invalid and then checked', () => {
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} id="checkbox-test" required valid={false} />);

        const warningPreCheck = wrapper.find('checkbox-test');
        expect(warningPreCheck).toBeDefined();

        wrapper.find('input').simulate('change');

        const warningPostCheck = wrapper.find('checkbox-test');
        expect(warningPostCheck).toEqual({});
    });

    test('should have aria-labelledby prop when warning message is displayed and input is invalid', () => {
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} required id="checkbox-test" valid={false} />);

        const input = wrapper.find('input');
        expect(input.prop('aria-labelledby')).toBe('checkbox-test');
    });

    test('should have empty aria-labelledby prop when input is valid', () => {
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} required id="checkbox-test" />);

        const input = wrapper.find('input');
        expect(input.prop('aria-labelledby')).toBe('');
    });

    test('should have aria-invalid prop set to true when warning message is displayed and input is invalid', () => {
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} required id="checkbox-test" valid={false} />);

        const input = wrapper.find('input');
        expect(input.prop('aria-invalid')).toBe(true);
    });

    test('should have aria-invalid prop set to false when input is valid', () => {
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} required id="checkbox-test" />);

        const input = wrapper.find('input');
        expect(input.prop('aria-invalid')).toBe(false);
    });

    test('matches snapshot', () => {
        const tree = mountWithTheme(<Checkbox {...defaultProps} />);

        expect(tree).toMatchSnapshot();
    });
});
