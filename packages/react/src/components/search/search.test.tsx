import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { SearchButton } from '../buttons/search-button';
import { ThemeWrapped } from '../theme-wrapper/theme-wrapper.test';
import { SearchGlobal } from './search-global';
jest.mock('uuid/v4');

describe('SearchGlobal', () => {
    test('Search callback is called when search button is clicked', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<SearchGlobal initialValue="foo" label="Search" onSearch={callback} />),
        );

        wrapper.find(SearchButton).simulate('click');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Search callback is called when Enter is pressed in input', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<SearchGlobal initialValue="bing" label="Search" onSearch={callback} />),
        );

        wrapper.find('input').simulate('keyDown', { keyCode: 13 });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Search callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<SearchGlobal initialValue="foo" label="Search" onSearch={callback} disabled />),
        );

        wrapper.find(SearchButton).simulate('click');
        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('Reset buttons clears input value', () => {
        const wrapper = mount(
            ThemeWrapped(<SearchGlobal initialValue="foo" label="Search" onSearch={() => {}} />),
        );

        const reset = wrapper.find('[data-testid="resetButton"]').at(1);
        reset.simulate('click');
        expect(wrapper.contains('foo')).toBe(false);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(<SearchGlobal initialValue="foo" label="Search" onSearch={() => {}} />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
