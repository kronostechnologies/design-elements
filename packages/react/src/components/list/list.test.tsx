import { mount, shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { List } from './list';

describe('List', () => {
    const defaultValue = 'optionB';
    const options = [
        {
            label: 'Option A',
            value: 'optionA',
        },
        {
            label: 'Option B',
            value: 'optionB',
        },
        {
            label: 'Option C',
            value: 'optionC',
        },
        {
            label: 'Option D',
            value: 'optionD',
        },
        {
            label: 'Option E',
            value: 'optionE',
        },
        {
            label: 'Option F',
            value: 'optionF',
        },
    ];
    const onChange = jest.fn();

    test('Renders all the options', () => {
        const wrapper = mount(
            <List options={options} />,
        );
        expect(wrapper.find('li').length).toBe(6);
    });

    test('Correctly set the default option', () => {
        const wrapper = mount(
            <List options={options} defaultValue={defaultValue} />,
        );
        expect(wrapper.prop('defaultValue')).toEqual(defaultValue);
    });

    test('Calls onChange callback when an option is selected', () => {
        const wrapper = shallow(
            <List options={options} defaultValue={defaultValue} onChange={onChange} />,
        );

        wrapper.childAt(2).simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('Should have the check indicator if selected', () => {
        const wrapper = shallow(
            <List options={options} defaultValue={defaultValue} onChange={onChange} withCheck={true} />,
        );

        expect(wrapper.childAt(3).children()).toHaveLength(1);
        wrapper.childAt(3).simulate('click');
        expect(wrapper.childAt(3).children()).toHaveLength(2);
        expect(wrapper.childAt(3).html().match('svg')).toHaveLength(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <List
                options={options}
                withCheck={true}
                defaultValue={defaultValue}
                onChange={onChange}
                numberOfItemsVisible={3}
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
