import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import { SearchButton } from '../src/components/buttons/search-button';
import { SearchGlobal } from '../src/components/forms/inputs/search-global';

describe('SearchGlobal', () => {
    test('Search callback is called when search button is clicked', () => {
        const mockCallback = jest.fn().mockImplementation((value: string) => `Searching for: ${value}`);
        const wrapper = mount(
            <SearchGlobal initialValue="foo" label="Search" onSearch={mockCallback} />,
        );
        const button = wrapper.find(SearchButton);

        button.simulate('click');

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveReturnedWith('Searching for: foo');
    });

    test('Search callback is called when Enter is pressed in input', () => {
        const mockCallback = jest.fn().mockImplementation((value: string) => `Searching for: ${value}`);
        const wrapper = mount(
            <SearchGlobal initialValue="bing" label="Search" onSearch={mockCallback} />,
        );
        const input = wrapper.find('input');

        input.simulate('keyDown', { keyCode: 13 });

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveReturnedWith('Searching for: bing');
    });

    test('Contains initial value', () => {
        const wrapper = mount(
            <SearchGlobal initialValue="foo" label="Search" onSearch={() => {}} />,
        );
        const input = wrapper.find('input');

        expect(input.props().value).toBe('foo');
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
