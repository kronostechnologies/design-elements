import { shallow } from 'enzyme';
import React from 'react';
import { doNothing } from '../../test-utils/callbacks';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { SearchContextual } from './search-contextual';

jest.mock('../../utils/uuid');

describe('Search Contextual', () => {
    it('should call onReset when search resets', () => {
        const onReset = jest.fn();
        const wrapper = shallow(<SearchContextual onReset={onReset} />);

        getByTestId(wrapper, 'search-input').invoke('onReset')();

        expect(onReset).toHaveBeenCalledTimes(1);
    });

    it('should call onChange when search changes', () => {
        const onChange = jest.fn();
        const value = jest.fn();
        const event = jest.fn();
        const wrapper = shallow(<SearchContextual onChange={onChange} />);

        getByTestId(wrapper, 'search-input').invoke('onChange')(value, event);

        expect(onChange).toHaveBeenCalledWith(value, event);
    });

    it('should call onSearch when search', () => {
        const onSearch = jest.fn();
        const value = jest.fn();
        const wrapper = shallow(<SearchContextual onSearch={onSearch} />);

        getByTestId(wrapper, 'search-input').invoke('onSearch')(value);

        expect(onSearch).toHaveBeenCalledWith(value);
    });

    it('matches the snapshot when disabled', () => {
        const wrapper = shallow(
            <SearchContextual label="Search" disabled onChange={doNothing} onReset={doNothing} onSearch={doNothing} />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('matches the snapshot when enabled', () => {
        const wrapper = shallow(
            <SearchContextual label="Search" onChange={doNothing} onReset={doNothing} onSearch={doNothing} />,
        );

        expect(wrapper).toMatchSnapshot();
    });
});
