import { shallow } from 'enzyme';
import { doNothing } from '../../test-utils/callbacks';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';
import { RadioButtonGroup } from './radio-button-group';

const Buttons = [
    { label: 'Earth', value: 'earth' },
    { label: 'Mars', value: 'mars', defaultChecked: true },
    { label: 'Pluto', value: 'pluto', disabled: true },
    { label: 'Saturn', value: 'saturn' },
];

describe('Radio button', () => {
    test('should have controllable data-testid', () => {
        const callback = jest.fn();
        const dataTestId = 'radio-button-group-id';
        const wrapper = mountWithTheme(
            <RadioButtonGroup
                data-testid={dataTestId}
                label="Planets"
                groupName="planets"
                buttons={Buttons}
                onChange={callback}
            />,
        );

        expect(getByTestId(wrapper, `${dataTestId}-${Buttons[0].value}`).exists()).toBe(true);
    });

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

    test('defaultChecked should show content from radio button', () => {
        const wrapper = shallow(
            <RadioButtonGroup
                groupName="withContent"
                buttons={[{
                    label: 'With Content',
                    value: 'content',
                    defaultChecked: true,
                    content: {
                        element: <div data-testid="content-div">Test</div>,
                    },
                }]}
            />,
        );

        expect(getByTestId(wrapper, 'content-wrapper').prop('isExpanded')).toBe(true);
    });

    test('should show content from radio button with checkedValue', () => {
        const wrapper = shallow(
            <RadioButtonGroup
                checkedValue="content"
                groupName="withContent"
                buttons={[{
                    label: 'With Content',
                    value: 'content',
                    content: {
                        element: <div data-testid="content-div">Test</div>,
                    },
                }]}
            />,
        );

        expect(getByTestId(wrapper, 'content-wrapper').prop('isExpanded')).toBe(true);
    });

    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <RadioButtonGroup
                id='test-id'
                label="Planets"
                groupName="planets"
                buttons={Buttons}
            />,
        );

        expect(tree).toMatchSnapshot();
    });
});
