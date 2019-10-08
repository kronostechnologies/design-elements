import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
    const setup = (callback: ((event: React.ChangeEvent<HTMLInputElement>) => void) = () => {}) => {
        const wrapper = mount(
            <Checkbox defaultChecked onChange={callback}/>,
        );
        return wrapper;
    };

    test('onChange callback is called when content is changed', () => {
        const callback = jest.fn();
        const wrapper = setup(callback);

        wrapper.find('input').simulate('change');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <Checkbox defaultChecked onChange={() => {}} />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
