import { mount, ReactWrapper, shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { findByTestId } from '../../test-utils/enzyme-selectors';
import { ThemeWrapped } from '../theme-wrapper/theme-wrapper.test';
import { Dropdown } from './dropdown';
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

function getOptionByIndex(wrapper: ReactWrapper, index: number): ReactWrapper {
    return wrapper.find('ul').childAt(index);
}

describe('Dropdown', () => {
    test('onChange callback is called when selected value is changed', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<Dropdown onChange={callback} options={provinces} />),
        );

        getOptionByIndex(wrapper, 2).simulate('click');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Dropdown
                    label="Select an option"
                    options={provinces}
                    skipOption={skipOption}
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Is invalid', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Dropdown
                    label="Select an option"
                    options={provinces}
                    skipOption={skipOption}
                    valid={false}
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('should not display skip option when no skipOption is provided', () => {
        const wrapper = shallow(<Dropdown options={[]} />);

        const skipOptionWrapper = findByTestId(wrapper, 'select-skip-option');
        expect(skipOptionWrapper.length).toBe(0);
    });
});
