import { shallow } from 'enzyme';
import { SegmentedControl } from '~/components/segmented-control/segmented-control';
import { getByTestId } from '../../test-utils/enzyme-selectors';

const buttonGroup = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2', defaultPressed: true },
    { label: 'Option 3', value: 'option3', disabled: true },
    { label: 'Option 4', value: 'option4' },
];

describe('SegmentedControl', () => {
    it('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<SegmentedControl onClick={callback} buttonGroup={buttonGroup} groupName="Test1" />);

        getByTestId(wrapper, 'test-toggle-button-2').simulate('click', { currentTarget: { value: 'test' } });
        expect(callback).toHaveBeenCalled();
    });

    it('Is default pressed', () => {
        const wrapper = shallow(<SegmentedControl buttonGroup={buttonGroup} groupName="Test2" />);

        expect(getByTestId(wrapper, 'test-toggle-button-1').prop('pressed')).toBe(true);
    });

    it('should have aria-pressed="true" for the default pressed button', () => {
        const wrapper = shallow(<SegmentedControl buttonGroup={buttonGroup} groupName="Test2" />);
        const button = getByTestId(wrapper, 'test-toggle-button-1');

        expect(button.prop('aria-pressed')).toBe(true);
    });

    it('should have aria-disabled="true" for disabled button', () => {
        const wrapper = shallow(<SegmentedControl buttonGroup={buttonGroup} groupName="Test" />);
        const button = getByTestId(wrapper, 'test-toggle-button-2');

        expect(button.prop('aria-disabled')).toBe(true);
    });
});
