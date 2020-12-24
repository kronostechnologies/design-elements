import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { doNothing } from '../../test-utils/callbacks';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { SearchContextual } from './search-contextual';

jest.mock('@design-elements/utils/uuid');

describe('Search Contextual', () => {
    test('onChange Callback is called when changed', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<SearchContextual label="Search" onChange={callback} />),
        );
        wrapper.find('input').simulate('change', { target: { value: 'new value' } });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot when disabled', () => {
        const tree = renderer.create(
            ThemeWrapped(<SearchContextual label="Search" onChange={doNothing} disabled />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot when enabled', () => {
        const tree = renderer.create(
            ThemeWrapped(<SearchContextual label="Search" onChange={doNothing} />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
