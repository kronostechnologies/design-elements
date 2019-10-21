import React from 'react';

import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import DatePicker from './date-picker';

const setup = (position: string) => {
    const tree = renderer.create(
        <DatePicker label="Date" position={position} />,
    ).toJSON();
    return tree;
};

describe('Date Picker', () => {
    test('onDateChanged callback is called when date is blurred', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <DatePicker label="Date" onDateChanged={callback}/>,
        );
        wrapper.find('input').simulate('blur');
        expect(callback).toHaveBeenCalledTimes(1);
    });
    test('Renders top left calendar', () => {
        const tree = setup('topLeft');
        expect(tree).toMatchSnapshot();
    });
    test('Renders top right calendar', () => {
        const tree = setup('topRight');
        expect(tree).toMatchSnapshot();
    });
    test('Renders bottom left calendar', () => {
        const tree = setup('bottomLeft');
        expect(tree).toMatchSnapshot();
    });
    test('Renders bottom right calendar', () => {
        const tree = setup('bottomRight');
        expect(tree).toMatchSnapshot();
    });
    test('Renders calendar with error message', () => {
        const tree = renderer.create(
            <DatePicker label="Date" valid={false}/>,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
