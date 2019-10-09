import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
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

const setup = (callback: ((event: React.ChangeEvent<HTMLSelectElement>) => void) = () => {}) => {
    const wrapper = mount (<Select onChange={callback} {...initialProps}/>);
    return wrapper;
};

describe('Select', () => {
    test('onChange callback is called when selected value is changed', () => {
        const callback = jest.fn();
        const wrapper = setup(callback);

        wrapper.find('select').simulate('change', { target: { value: 'on', checkValidity: () => true } });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <Select
                label="Choose your province or territory"
                onChange={() => {}}
                options={provinces}
                skipOption={skipOption}
                validationErrorMessage="Error Message"
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Is required', () => {
        const tree = renderer.create(
            <Select
                label="Choose your province or territory"
                onChange={() => {}}
                options={provinces}
                required
                skipOption={skipOption}
                validationErrorMessage="Error Message"
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
