import { shallow } from 'enzyme';
import React from 'react';
import { doNothing } from '../../test-utils/callbacks';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme } from '../../test-utils/renderer';
import { SearchInput } from './search-input';

describe('SearchInput', () => {
    describe('icon', () => {
        it('should display icon when hasIcon is true', () => {
            const wrapper = shallow(
                <SearchInput hasIcon />,
            );

            const searchIcon = getByTestId(wrapper, 'search-icon');

            expect(searchIcon.length).toBe(1);
        });

        it('should not display icon when hasIcon is false', () => {
            const wrapper = shallow(
                <SearchInput hasIcon={false} />,
            );

            const searchIcon = getByTestId(wrapper, 'search-icon');

            expect(searchIcon.length).toBe(0);
        });
    });

    describe('button', () => {
        it('should display button when hasButton is true', () => {
            const wrapper = shallow(
                <SearchInput hasButton />,
            );

            const searchButton = getByTestId(wrapper, 'search-button');

            expect(searchButton.length).toBe(1);
        });

        it('should call onSearch when button is clicked', () => {
            const onSearch = jest.fn();
            const wrapper = shallow(
                <SearchInput hasButton onSearch={onSearch} />,
            );

            getByTestId(wrapper, 'search-button').invoke('onClick')();

            expect(onSearch).toHaveBeenCalledTimes(1);
        });

        it('should not display button when hasButton is false', () => {
            const wrapper = shallow(
                <SearchInput hasButton={false} />,
            );

            const searchButton = getByTestId(wrapper, 'search-button');

            expect(searchButton.length).toBe(0);
        });
    });

    describe('reset', () => {
        it('should call onReset when reset is clicked', () => {
            const onReset = jest.fn();
            const wrapper = shallow(
                <SearchInput onReset={onReset} />,
            );

            getByTestId(wrapper, 'search-reset').invoke('onClick')();

            expect(onReset).toHaveBeenCalledTimes(1);
        });

        it('should not display reset when onReset is not provided', () => {
            const wrapper = shallow(
                <SearchInput />,
            );

            const searchButton = getByTestId(wrapper, 'search-reset');

            expect(searchButton.length).toBe(0);
        });
    });

    describe('Input', () => {
        it('should trigger search when Enter key is pressed', () => {
            const onSearch = jest.fn();
            const wrapper = shallow(
                <SearchInput onSearch={onSearch} />,
            );

            getByTestId(wrapper, 'search-input').invoke('onKeyDown')({ key: 'Enter' });

            expect(onSearch).toHaveBeenCalledTimes(1);
        });

        it('should call onChange when input changes', () => {
            const onChange = jest.fn();
            const newValue = 'a new value';
            const event = { currentTarget: { value: newValue } };
            const wrapper = shallow(
                <SearchInput onChange={onChange} />,
            );

            getByTestId(wrapper, 'search-input').invoke('onChange')(event);

            expect(onChange).toHaveBeenCalledWith(newValue, event);
        });

        it('should display defaultValue', () => {
            const defaultValue = 'a value';
            const wrapper = mountWithTheme(
                <SearchInput defaultValue={defaultValue} />,
            );

            const searchInput = getByTestId(wrapper, 'search-input');
            expect(searchInput.getDOMNode<HTMLInputElement>().value).toBe(defaultValue);
        });

        it('should display value', () => {
            const value = 'a value';
            const wrapper = mountWithTheme(
                <SearchInput value={value} />,
            );

            const searchInput = getByTestId(wrapper, 'search-input');
            expect(searchInput.getDOMNode<HTMLInputElement>().value).toBe(value);
        });
        it('should call onFocus when input is clicked', () => {
            const onFocus = jest.fn();
            const wrapper = shallow(
                <SearchInput onFocus={onFocus} />,
            );

            getByTestId(wrapper, 'search-input').simulate('focus');

            expect(onFocus).toHaveBeenCalledTimes(1);
        });
    });

    it('should match the snapshot', () => {
        const wrapper = mountWithTheme(
            <SearchInput
                onSearch={doNothing}
                onReset={doNothing}
                onChange={doNothing}
                value="a value"
                label="Search"
                placeholder="a placeholder"
                id="search-input"
                disabled
                hasButton
                hasIcon
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
