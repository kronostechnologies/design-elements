import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { SearchButton } from '../src/components/buttons/search-button';
import { SearchGlobal } from '../src/components/forms/inputs/search-global';
jest.mock('uuid/v4');

describe('SearchGlobal', () => {
    test('Search callback is called when search button is clicked', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <SearchGlobal initialValue="foo" label="Search" onSearch={callback} />,
        );

        wrapper.find(SearchButton).simulate('click');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Search callback is called when Enter is pressed in input', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <SearchGlobal initialValue="bing" label="Search" onSearch={callback} />,
        );

        wrapper.find('input').simulate('keyDown', { keyCode: 13 });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Search callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <SearchGlobal initialValue="foo" label="Search" onSearch={callback} disabled />,
        );

        wrapper.find(SearchButton).simulate('click');
        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('Reset buttons clears input value', () => {
        const wrapper = mount(
            <SearchGlobal initialValue="foo" label="Search" onSearch={() => {}} />,
        );

        const reset = wrapper.find('[data-testid="resetButton"]').at(1);
        reset.simulate('click');
        expect(wrapper.contains('foo')).toBe(false);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <SearchGlobal initialValue="foo" label="Search" onSearch={() => {}} />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
