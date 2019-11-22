import { mount, shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Select } from './select';

jest.mock('uuid/v4');

const provinces = [
    { value: '', label: '-' },
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

const initialProps = {
    label: 'Choose your province or territory',
    options: provinces,
    required: true,
    skipOption: { ...skipOption },
};

describe('Select', () => {
    test('onChange callback is called when selected value is changed', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<Select onChange={callback} {...initialProps} />),
        );

        wrapper.find('select').simulate('change', { target: { value: 'on', checkValidity: () => true } });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Select
                    label="Choose your province or territory"
                    options={provinces}
                    skipOption={skipOption}
                    validationErrorMessage="Error Message"
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Is required', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Select
                    label="Choose your province or territory"
                    options={provinces}
                    required
                    skipOption={skipOption}
                    validationErrorMessage="Error Message"
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('should select skip option when value is skip value', () => {
        const wrapper = shallow(<Select options={[]} skipOption={skipOption} value={skipOption.value} />);

        const skipOptionWrapper = getByTestId(wrapper, 'select-skip-option');
        expect(skipOptionWrapper.props().checked).toBe(true);
    });

    test('should not select skip option when value is different than skip value', () => {
        const wrapper = shallow(<Select options={[]} skipOption={skipOption} value="not skip value" />);

        const skipOptionWrapper = getByTestId(wrapper, 'select-skip-option');
        expect(skipOptionWrapper.props().checked).toBe(false);
    });

    test('should not display skip option when no skipOption is provided', () => {
        const wrapper = shallow(<Select options={[]} />);

        const skipOptionWrapper = findByTestId(wrapper, 'select-skip-option');
        expect(skipOptionWrapper.length).toBe(0);
    });
});
