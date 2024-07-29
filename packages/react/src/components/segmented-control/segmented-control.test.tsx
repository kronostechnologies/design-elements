import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithProviders } from '../../test-utils/renderer';
import { SegmentedControl } from './segmented-control';

const buttonGroup = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2', defaultPressed: true },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
];

describe('SegmentedControl', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<SegmentedControl onClick={callback} buttonGroup={buttonGroup} groupName="Test1" />);

        getByTestId(wrapper, 'test-toggle-button-2').simulate('click', { currentTarget: { value: 'test' } });
        expect(callback).toHaveBeenCalled();
    });

    test('Is default pressed', () => {
        const wrapper = shallow(<SegmentedControl buttonGroup={buttonGroup} groupName="Test2" />);

        expect(getByTestId(wrapper, 'test-toggle-button-1').prop('pressed')).toBe(true);
    });

    test('Matches snapshot (desktop)', () => {
        const tree = renderWithProviders(
            <SegmentedControl buttonGroup={buttonGroup} groupName="Test4" />,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (mobile)', () => {
        const tree = renderWithProviders(
            <SegmentedControl buttonGroup={buttonGroup} groupName="Test4" />,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
