import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Chooser } from './chooser';

jest.mock('@design-elements/utils/uuid');

describe('Chooser', () => {
    const maritalStatus = [
        { value: 'single', label: 'Single, living alone or with a roommate' },
        { value: 'married', label: 'Married or living with a spouse' },
    ];

    const skipOption = {
        label: 'Would rather not say',
        value: 'skip',
    };

    test('onChange callback is called when chooser is changed', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(
                <Chooser
                    inColumns
                    groupName="maritalStatus"
                    options={maritalStatus}
                    skipOption={skipOption}
                    onChange={callback}
                />,
            ),
        );

        wrapper.find('input').at(0).simulate('change');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Chooser
                    inColumns
                    groupName="maritalStatus"
                    options={maritalStatus}
                    skipOption={skipOption}
                    value="married"
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
