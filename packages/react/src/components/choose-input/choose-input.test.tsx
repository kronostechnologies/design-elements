import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { doNothing } from '../../test-utils/callbacks';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { ChooseInput } from './choose-input';

jest.mock('../../utils/uuid');

describe('Choose Input', () => {
    test('onChange Callback is called when changed', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(
                <ChooseInput
                    groupName="maritalStatus"
                    onChange={callback}
                    type="radio"
                    value="test value"
                >
                    Children
                </ChooseInput>,
            ),
        );
        wrapper.find('input').simulate('change');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <ChooseInput
                    groupName="maritalStatus"
                    onChange={doNothing}
                    type="radio"
                    value="test value"
                    defaultChecked
                >
                    Children
                </ChooseInput>,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
