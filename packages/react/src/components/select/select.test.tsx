import { mount, shallow } from 'enzyme';
import React from 'react';

import { findByTestId, getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { renderWithProviders } from '@design-elements/test-utils/renderer';
import { ThemeWrapper } from '../theme-wrapper/theme-wrapper';
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

describe('Select', () => {
    test('onChange callback is called when selected value is changed', () => {
        const callback = jest.fn();
        const wrapper = shallow(<Select onChange={callback} options={provinces} />);

        getByTestId(wrapper, 'listbox').simulate('change', { value: 'ns', label: 'Nova Scotia' });
        expect(callback).toHaveBeenCalledWith({ value: 'ns', label: 'Nova Scotia' });
    });

    test('listbox should be closed by default', () => {
        const wrapper = shallow(<Select options={provinces} />);

        expect(getByTestId(wrapper, 'listbox').props().visible).toBeFalsy();
    });

    test('listbox should be open when defaultOpen prop is set to true', () => {
        const wrapper = shallow(<Select options={provinces} defaultOpen />);

        expect(getByTestId(wrapper, 'listbox').props().visible).toBeTruthy();
    });

    test('input should have default value', () => {
        const wrapper = shallow(<Select options={provinces} defaultValue="qc" />);

        expect(getByTestId(wrapper, 'input').props().value).toBe('Quebec');
    });

    test('input should have value', () => {
        const wrapper = mount(
            <ThemeWrapper>
                <Select options={provinces} value="qc" />
            </ThemeWrapper>,
        );

        expect(getByTestId(wrapper, 'input').props().value).toBe('Quebec');
    });

    test('listbox should open on click', () => {
        const wrapper = shallow(<Select options={provinces} />);

        getByTestId(wrapper, 'input-wrapper').simulate('click');
        expect(getByTestId(wrapper, 'listbox').props().visible).toBeTruthy();
    });

    test('listbox should not open on click [searchable]', () => {
        const wrapper = shallow(<Select options={provinces} searchable/>);

        getByTestId(wrapper, 'input-wrapper').simulate('click');
        expect(getByTestId(wrapper, 'listbox').props().visible).toBeFalsy();
    });

    test('listbox should close on click', () => {
        const wrapper = shallow(<Select options={provinces} defaultOpen />);

        getByTestId(wrapper, 'input-wrapper').simulate('click');
        expect(getByTestId(wrapper, 'listbox').props().visible).toBeFalsy();
    });

    test('listbox should open when arrow is clicked', () => {
        const wrapper = shallow(<Select options={provinces} />);

        getByTestId(wrapper, 'arrow').simulate('click');
        expect(getByTestId(wrapper, 'listbox').props().visible).toBeTruthy();
    });

    test('listbox should close when arrow is clicked', () => {
        const wrapper = shallow(<Select options={provinces} defaultOpen/>);

        getByTestId(wrapper, 'arrow').simulate('click');
        expect(getByTestId(wrapper, 'listbox').props().visible).toBeFalsy();
    });

    describe('input', () => {
        test('ArrowUp should open listbox', () => {
            const wrapper = shallow(<Select options={provinces} />);

            getByTestId(wrapper, 'input').simulate('keydown', { keyCode: 38 });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeTruthy();
        });

        test('ArrowUp should open listbox [searchable]', () => {
            const wrapper = shallow(<Select options={provinces} searchable />);

            getByTestId(wrapper, 'input').simulate('keydown', { keyCode: 38 });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeTruthy();
        });

        test('ArrowDown should open listbox', () => {
            const wrapper = shallow(<Select options={provinces} />);

            getByTestId(wrapper, 'input').simulate('keydown', { keyCode: 40 });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeTruthy();
        });

        test('ArrowDown should open listbox [searchable]', () => {
            const wrapper = shallow(<Select options={provinces} searchable />);

            getByTestId(wrapper, 'input').simulate('keydown', { keyCode: 40 });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeTruthy();
        });

        test('Enter should open listbox', () => {
            const wrapper = shallow(<Select options={provinces} />);

            getByTestId(wrapper, 'input').simulate('keydown', { keyCode: 13, preventDefault: jest.fn() });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeTruthy();
        });

        test('ArrowDown should not open listbox [searchable]', () => {
            const wrapper = shallow(<Select options={provinces} searchable />);

            getByTestId(wrapper, 'input').simulate('keydown', { keyCode: 13, preventDefault: jest.fn() });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeFalsy();
        });

        test('Spacebar should open listbox', () => {
            const wrapper = shallow(<Select options={provinces} />);

            getByTestId(wrapper, 'input').simulate('keydown', { keyCode: 32, preventDefault: jest.fn() });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeTruthy();
        });

        test('Spacebar should open listbox [searchable]', () => {
            const wrapper = shallow(<Select options={provinces} searchable />);

            getByTestId(wrapper, 'input').simulate('keydown', { keyCode: 32, preventDefault: jest.fn() });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeTruthy();
        });

        test('Escape should close listbox', () => {
            const wrapper = shallow(<Select options={provinces} defaultOpen />);

            getByTestId(wrapper, 'input').simulate('keydown', { keyCode: 27 });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeFalsy();
        });

        test('Escape should close listbox [searchable]', () => {
            const wrapper = shallow(<Select options={provinces} defaultOpen searchable />);

            getByTestId(wrapper, 'input').simulate('keydown', { keyCode: 27 });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeFalsy();
        });

        test('input value should be cleared when escape is pressed [searchable]', () => {
            const wrapper = shallow(<Select options={provinces} defaultValue="qc" searchable />);

            getByTestId(wrapper, 'input').simulate('keydown', { keyCode: 27 });
            expect(getByTestId(wrapper, 'input').props().value).toBe('');
        });

        test('listbox should open when search entry has matching result(s) [searchable]', () => {
            const wrapper = shallow(<Select options={provinces} searchable />);

            getByTestId(wrapper, 'input').simulate('change', { target: { value: 'a' } });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeTruthy();
        });

        test('listbox should close when search entry has no matching result [searchable]', () => {
            const wrapper = shallow(<Select options={provinces} searchable />);

            getByTestId(wrapper, 'input').simulate('change', { target: { value: 'at' } });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeFalsy();
        });

        test('should select value that matches search value on blur [searchable]', () => {
            const wrapper = shallow(<Select options={provinces} searchable />);

            getByTestId(wrapper, 'input').simulate('change', { target: { value: 'quebec' } });
            getByTestId(wrapper, 'input').simulate('blur');
            expect(getByTestId(wrapper, 'input').props().value).toBe('Quebec');
        });
    });

    describe('listbox', () => {
        test('should close when escape is pressed', () => {
            const wrapper = shallow(<Select options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listbox').simulate('keydown', { key: 'Escape' });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeFalsy();
        });

        test('should clear input value when escape is pressed [searchable]', () => {
            const wrapper = shallow(<Select options={provinces} defaultOpen defaultValue="qc" searchable />);

            getByTestId(wrapper, 'listbox').simulate('keydown', { key: 'Escape' });
            expect(getByTestId(wrapper, 'input').props().value).toBe('');
        });

        test('should focus last element from array when ArrowUp is pressed', () => {
            const wrapper = shallow(<Select options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listbox').simulate('keydown', { key: 'ArrowUp' });
            expect(getByTestId(wrapper, 'listbox').props().focusedValue).toBe('yt');
        });

        test('should focus the first element starting with the letter N', () => {
            const wrapper = shallow(<Select options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listbox').simulate('keydown', { keyCode: 78, key: 'n' });
            expect(getByTestId(wrapper, 'listbox').props().focusedValue).toBe('ns');
        });

        test('should remove focus when a character is pressed [searchable]', () => {
            const wrapper = shallow(<Select options={provinces} defaultOpen searchable />);

            getByTestId(wrapper, 'listbox').simulate('keydown', { keyCode: 78, key: 'n' });
            expect(getByTestId(wrapper, 'listbox').props().autofocus).toBeFalsy();
        });

        test('should close onChange', () => {
            const wrapper = shallow(<Select options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listbox').simulate('change', { option: { label: 'Quebec', value: 'qc' } });
            expect(getByTestId(wrapper, 'listbox').props().visible).toBeFalsy();
        });
    });

    test('matches the snapshot', () => {
        const tree = renderWithProviders(
            <Select
                label="Select an option"
                options={provinces}
                skipOption={skipOption}
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('invalid select has a different style', () => {
        const tree = renderWithProviders(
            <Select
                label="Select an option"
                options={provinces}
                skipOption={skipOption}
                valid={false}
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('disabled select has a different style', () => {
        const tree = renderWithProviders(
            <Select
                label="Select an option"
                options={provinces}
                disabled
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('mobile select has a different style', () => {
        const tree = renderWithProviders(
            <Select
                options={provinces}
            />,
            'mobile',
        );

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
