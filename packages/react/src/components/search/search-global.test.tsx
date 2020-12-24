import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { shallow } from 'enzyme';
import React from 'react';
import { doNothing } from '../../test-utils/callbacks';
import { SearchGlobal } from './search-global';

jest.mock('@design-elements/utils/uuid');

describe('SearchGlobal', () => {
    it('should call onReset when search resets', () => {
        const onReset = jest.fn();
        const wrapper = shallow(<SearchGlobal onReset={onReset} />);

        getByTestId(wrapper, 'search-input').invoke('onReset')();

        expect(onReset).toHaveBeenCalledTimes(1);
    });

    it('should call onChange when search changes', () => {
        const onChange = jest.fn();
        const value = jest.fn();
        const event = jest.fn();
        const wrapper = shallow(<SearchGlobal onChange={onChange} />);

        getByTestId(wrapper, 'search-input').invoke('onChange')(value, event);

        expect(onChange).toHaveBeenCalledWith(value, event);
    });

    it('should call onSearch when search', () => {
        const onSearch = jest.fn();
        const value = jest.fn();
        const wrapper = shallow(<SearchGlobal onSearch={onSearch} />);

        getByTestId(wrapper, 'search-input').invoke('onSearch')(value);

        expect(onSearch).toHaveBeenCalledWith(value);
    });

    test('Matches the snapshot', () => {
        const wrapper = shallow(
            <SearchGlobal defaultValue="foo" label="Search" onSearch={doNothing} />,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
