import { mount } from 'enzyme';
import React, { ChangeEvent } from 'react';
import renderer from 'react-test-renderer';
import { ChooseInput } from './choose-input';
jest.mock('uuid/v4');

describe('Choose Input', () => {
    const setup = (callback: ((event: ChangeEvent<HTMLInputElement>) => void) = () => {}) => {
        const wrapper = mount(
            <ChooseInput
                groupName="maritalStatus"
                onChange={callback}
                type="radio"
                value="test value"
            >
                Children
            </ChooseInput>,
        );
        return wrapper;
    };

    test('onChange Callback is called when changed', () => {
        const callback = jest.fn();
        const wrapper = setup(callback);
        wrapper.find('input').simulate('change');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <ChooseInput
                groupName="maritalStatus"
                onChange={() => {}}
                type="radio"
                value="test value"
                defaultChecked
            >
                Children
            </ChooseInput>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
