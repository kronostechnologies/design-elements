import { doNothing } from '../../test-utils/callbacks';
import { mountWithTheme } from '../../test-utils/renderer';
import { Checkbox } from './checkbox';

const defaultProps = {
    label: 'Boat',
    name: 'vehicule',
    value: 'boat',
};

describe('Checkbox', () => {
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

    test('matches snapshot', () => {
        const tree = mountWithTheme(<Checkbox {...defaultProps} />);

        expect(tree).toMatchSnapshot();
    });
});
