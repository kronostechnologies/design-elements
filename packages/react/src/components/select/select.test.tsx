import { mount, ReactWrapper, shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Select } from './select';
jest.mock('uuid/v4');

const provinces = [
    { value: 'on', label: 'Ontario' },
    { value: 'qc', label: 'Quebec' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'ab', label: 'Alberta' },
    { value: 'mb', label: 'Manitoba' },
    { value: 'sk', label: 'Saskatchewan' },
    { value: 'ns', label: 'Nova Scotia' },
    { value: 'nb', label: 'New Brunswick' },
    { value: 'nl', label: 'Newfoundland and Labrador' },
    { value: 'pe', label: 'Prince Edward Island' },
    { value: 'nt', label: 'Northwest Territories' },
    { value: 'nu', label: 'Nunavut' },
    { value: 'yt', label: 'Yukon' },
];

const skipOption = {
    label: 'Skip this question',
    value: 'skip',
};

function getOptionByIndex(wrapper: ReactWrapper, index: number): ReactWrapper {
    return wrapper.find('ul').childAt(index);
}

describe('Select', () => {
    test('onChange callback is called when selected value is changed', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<Select onChange={callback} options={provinces} />),
        );

        getOptionByIndex(wrapper, 2).simulate('click');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Select
                    label="Select an option"
                    options={provinces}
                    skipOption={skipOption}
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('is invalid', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Select
                    label="Select an option"
                    options={provinces}
                    skipOption={skipOption}
                    valid={false}
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('is disabled', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Select
                    label="Select an option"
                    options={provinces}
                    disabled
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('has no label', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Select
                    options={provinces}
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('should select skip option when defaultValue is skip value', () => {
        const wrapper = shallow(<Select options={[]} skipOption={skipOption} defaultValue={skipOption.value} />);

        const skipOptionWrapper = getByTestId(wrapper, 'select-skip-option');
        expect(skipOptionWrapper.props().checked).toBe(true);
    });

    test('should not select skip option when defaultValue is different than skip value', () => {
        const wrapper = shallow(<Select options={[]} skipOption={skipOption} defaultValue="not skip value" />);

        const skipOptionWrapper = getByTestId(wrapper, 'select-skip-option');
        expect(skipOptionWrapper.props().checked).toBe(false);
    });

    test('should not display skip option when no skipOption is provided', () => {
        const wrapper = shallow(<Select options={[]} />);

        const skipOptionWrapper = findByTestId(wrapper, 'select-skip-option');
        expect(skipOptionWrapper.length).toBe(0);
    });
});
