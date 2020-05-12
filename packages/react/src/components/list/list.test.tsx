import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { List, Option } from './list';
jest.mock('uuid/v4');

describe('List', () => {
    let defaultValue: string;
    let defaultValueIndex: number;
    let options: Option[];
    let onChange: (option: Option) => void;

    function getOptionByIndex(wrapper: ReactWrapper, index: number): ReactWrapper {
        return wrapper.find('ul').childAt(index);
    }

    beforeEach(() => {
        defaultValue = 'optionB';
        defaultValueIndex = 1;
        options = [
            {
                label: 'Option A',
                value: 'optionA',
            },
            {
                label: 'Option B',
                value: 'optionB',
            },
            {
                label: 'Option C',
                value: 'optionC',
            },
            {
                label: 'Option D',
                value: 'optionD',
            },
        ];
        onChange = jest.fn();
    });

    test('Correctly set the default option', () => {
        const wrapper = mount(
            ThemeWrapped(
                <List options={options} defaultValue={defaultValue} onChange={onChange} />,
            ),
        );

        expect(getOptionByIndex(wrapper, defaultValueIndex).prop('selected')).toEqual(true);
        expect(getOptionByIndex(wrapper, 2).prop('selected')).toEqual(false);
    });

    test('Calls onChange callback when an option is selected', () => {
        const wrapper = mount(
            ThemeWrapped(
                <List options={options} defaultValue={defaultValue} onChange={onChange} />,
            ),
        );

        getOptionByIndex(wrapper, 2).simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('Should have the check indicator if selected', () => {
        const wrapper = mount(
            ThemeWrapped(
                <List options={options} defaultValue={defaultValue} onChange={onChange} checkIndicator={true} />,
            ),
        );

        expect(getOptionByIndex(wrapper, 3).find('svg')).toHaveLength(0);

        getOptionByIndex(wrapper, 3).simulate('click');

        expect(getOptionByIndex(wrapper, 3).find('svg')).toHaveLength(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <List
                    options={options}
                    checkIndicator={true}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    numberOfItemsVisible={3}
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot (dropdown)', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <List
                    options={options}
                    checkIndicator={true}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    numberOfItemsVisible={3}
                    dropdown
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Is not visible', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <List options={options} visible={false} />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
