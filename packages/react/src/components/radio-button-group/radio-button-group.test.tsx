import { doNothing } from '../../test-utils/callbacks';
import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';
import { RadioButtonGroup } from './radio-button-group';

const Buttons = [
    { label: 'Earth', value: 'earth' },
    { label: 'Mars', value: 'mars', defaultChecked: true },
    { label: 'Pluto', value: 'pluto', disabled: true },
    { label: 'Saturn', value: 'saturn' },
];

describe('Radio button', () => {
    test('onChange callback is called when changed', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <RadioButtonGroup label="Planets" groupName="planets" buttons={Buttons} onChange={callback} />,
        );

        wrapper.find('input').at(0).simulate('change');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Can be used as a controlled input', () => {
        const wrapper = mountWithTheme(
            <RadioButtonGroup
                groupName="color"
                checkedValue="red"
                buttons={[{ label: 'Red', value: 'red' }]}
                onChange={doNothing}
            />,
        );

        const input = wrapper.find('input[type="radio"]').at(0);
        expect(input.prop('checked')).toBe(true);
    });

    test('Matches the snapshot', () => {
        const tree = renderWithTheme(<RadioButtonGroup label="Planets" groupName="planets" buttons={Buttons} />);

        expect(tree).toMatchSnapshot();
    });
});
