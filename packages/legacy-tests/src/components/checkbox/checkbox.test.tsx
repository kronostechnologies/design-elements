import { Checkbox } from '~/components/checkbox/checkbox';
import { doNothing } from '../../test-utils/callbacks';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme } from '../../test-utils/renderer';

const defaultProps = {
    label: 'Boat',
    name: 'vehicule',
    value: 'boat',
};

describe('Checkbox', () => {
    it('has controllable data-testid', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <Checkbox data-testid="some-data-testid" {...defaultProps} onChange={callback} />,
        );

        expect(getByTestId(wrapper, 'some-data-testid').exists()).toBe(true);
    });

    it('onChange callback should be called when checkbox is checked / unchecked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} onChange={callback} />);

        wrapper.find('input').simulate('change');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should be default checked when defaultChecked prop is set to true', () => {
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} defaultChecked />);

        const input = wrapper.find('input');
        expect(input.prop('defaultChecked')).toBe(true);
    });

    it('should be checked when checked prop is set to true', () => {
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} checked onChange={doNothing} />);

        const input = wrapper.find('input');
        expect(input.prop('checked')).toBe(true);
    });

    it('should be disabled when disabled prop is set to true', () => {
        const wrapper = mountWithTheme(<Checkbox {...defaultProps} disabled />);

        const input = wrapper.find('input');
        expect(input.prop('disabled')).toBe(true);
    });

    it('matches snapshot', () => {
        const tree = mountWithTheme(<Checkbox {...defaultProps} />);

        expect(tree).toMatchSnapshot();
    });
});
