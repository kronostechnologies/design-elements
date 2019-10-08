import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { SearchContextual } from './search-contextual';
jest.mock('uuid/v4');

describe('Search Contextual', () => {
    test('onChange Callback is called when changed', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <SearchContextual
                label="Search"
                onChange={callback}
            />,
        );
        wrapper.find('input').simulate('change', { target: { value: 'new value' } });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot when disabled', () => {
        const tree = renderer.create(
            <SearchContextual
                label="Search"
                onChange={() => {}}
                disabled
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot when enabled', () => {
        const tree = renderer.create(
            <SearchContextual
                label="Search"
                onChange={() => {}}
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
