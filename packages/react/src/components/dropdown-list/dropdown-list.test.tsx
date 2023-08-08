import { ReactWrapper, shallow } from 'enzyme';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { actAndWaitForEffects, mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { Option, DropdownList } from './dropdown-list';

jest.mock('../../utils/uuid');

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

const disabledOptions = [
    { value: '1', label: 'Option 1', disabled: true },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4', disabled: true },
];

const skipOption = {
    label: 'Skip this question',
    value: 'skip',
};

async function clickArrow(wrapper: ReactWrapper): Promise<void> {
    await actAndWaitForEffects(wrapper, () => {
        getByTestId(wrapper, 'arrow').simulate('click');
    });
}

async function selectOption(wrapper: ReactWrapper, option: Option): Promise<void> {
    await actAndWaitForEffects(wrapper, () => {
        getByTestId(wrapper, `listitem-${option.value}`).simulate('click');
    });
}

describe('Select', () => {
    test('onChange callback is called when selected value is changed', () => {
        const callback = jest.fn();
        const wrapper = shallow(<DropdownList onChange={callback} options={provinces} defaultOpen />);

        getByTestId(wrapper, 'listbox').simulate('change', { value: 'ns', label: 'Nova Scotia' });

        expect(callback).toHaveBeenCalledWith({ value: 'ns', label: 'Nova Scotia' });
    });

    test('listbox should be closed by default', () => {
        const wrapper = shallow(<DropdownList options={provinces} />);

        expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
    });

    test('listbox should be open when defaultOpen prop is set to true', () => {
        const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

        expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
    });

    test('input should have controllable data-test-id', () => {
        const wrapper = shallow(
            <DropdownList data-testid="a-controlled-id" options={provinces} defaultValue="qc" />,
        );

        expect(getByTestId(wrapper, 'a-controlled-id').props().value).toBe('Quebec');
    });

    test('input should have default value', () => {
        const wrapper = shallow(<DropdownList options={provinces} defaultValue="qc" />);

        expect(getByTestId(wrapper, 'input').props().value).toBe('Quebec');
    });

    test('input should have value', () => {
        const wrapper = mountWithTheme(<DropdownList options={provinces} value="qc" />);

        expect(getByTestId(wrapper, 'input').props().value).toBe('Quebec');
    });

    test('listbox should open on click', () => {
        const wrapper = shallow(<DropdownList options={provinces} />);

        getByTestId(wrapper, 'input-wrapper').simulate('click');

        expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
    });

    test('listbox should not open on click when Select is searchable', () => {
        const wrapper = shallow(<DropdownList options={provinces} searchable />);

        getByTestId(wrapper, 'input-wrapper').simulate('click');

        expect(getByTestId(wrapper, 'listbox').length).toEqual(0);
    });

    test('listbox should close on click', () => {
        const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

        getByTestId(wrapper, 'input-wrapper').simulate('click');

        expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
    });

    test('listbox should open when arrow is clicked', () => {
        const wrapper = shallow(<DropdownList options={provinces} />);

        getByTestId(wrapper, 'arrow').simulate('click');

        expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
    });

    test('listbox should close when arrow is clicked', () => {
        const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

        getByTestId(wrapper, 'arrow').simulate('click');

        expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
    });

    describe('input', () => {
        describe('ArrowUp', () => {
            test('should open listbox', () => {
                const wrapper = shallow(<DropdownList options={provinces} />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: 'ArrowUp' });

                expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
            });

            test('should open listbox when Select is searchable', () => {
                const wrapper = shallow(<DropdownList options={provinces} searchable />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: 'ArrowUp' });

                expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
            });

            test('should focus last element in listbox', () => {
                const wrapper = mountWithTheme(<DropdownList options={provinces} />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: 'ArrowUp' });

                expect(getByTestId(wrapper, 'listbox').props().focusedValue).toBe('yt');
            });

            test('should focus last enabled element in listbox when there is disabled options', () => {
                const wrapper = mountWithTheme(<DropdownList options={disabledOptions} />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: 'ArrowUp' });

                expect(getByTestId(wrapper, 'listbox').props().focusedValue).toBe('3');
            });
        });

        describe('ArrowDown', () => {
            test('should open listbox', () => {
                const wrapper = shallow(<DropdownList options={provinces} />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: 'ArrowDown' });

                expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
            });

            test('should open listbox when Select is searchable', () => {
                const wrapper = shallow(<DropdownList options={provinces} searchable />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: 'ArrowDown' });

                expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
            });

            test('should focus first element in listbox', () => {
                const wrapper = mountWithTheme(<DropdownList options={provinces} />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: 'ArrowDown' });

                expect(getByTestId(wrapper, 'listbox').props().focusedValue).toBe('on');
            });

            test('should focus first enabled element in listbox when there is disabled options', () => {
                const wrapper = mountWithTheme(<DropdownList options={disabledOptions} />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: 'ArrowDown' });

                expect(getByTestId(wrapper, 'listbox').props().focusedValue).toBe('2');
            });
        });

        describe('Enter', () => {
            test('should open listbox', () => {
                const wrapper = shallow(<DropdownList options={provinces} />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: 'Enter', preventDefault: jest.fn() });

                expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
            });

            test('should not open listbox when Select is searchable', () => {
                const wrapper = shallow(<DropdownList options={provinces} searchable />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: 'Enter', preventDefault: jest.fn() });

                expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
            });
        });

        describe('Spacebar', () => {
            test('should open listbox', () => {
                const wrapper = shallow(<DropdownList options={provinces} />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: ' ', preventDefault: jest.fn() });

                expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
            });

            test('should open listbox when Select is searchable', () => {
                const wrapper = shallow(<DropdownList options={provinces} searchable />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: ' ', preventDefault: jest.fn() });

                expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
            });
        });

        describe('Escape', () => {
            test('should close listbox', () => {
                const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: 'Escape' });

                expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
            });

            test('should close listbox when Select is searchable', () => {
                const wrapper = shallow(<DropdownList options={provinces} defaultOpen searchable />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: 'Escape' });

                expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
            });

            test('should clear input value when Select is searchable', () => {
                const wrapper = shallow(<DropdownList options={provinces} defaultValue="qc" searchable />);

                getByTestId(wrapper, 'input').simulate('keydown', { key: 'Escape' });

                expect(getByTestId(wrapper, 'input').props().value).toBe('');
            });
        });

        test('listbox should open when search entry has matching result(s) when Select is searchable', () => {
            const wrapper = shallow(<DropdownList options={provinces} searchable />);

            getByTestId(wrapper, 'input').simulate('change', { currentTarget: { value: 'a' } });

            expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
        });

        test('listbox should close when search entry has no matching result when Select is searchable', () => {
            const wrapper = shallow(<DropdownList options={provinces} searchable />);

            getByTestId(wrapper, 'input').simulate('change', { currentTarget: { value: 'at' } });

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('should select value that matches search value on blur when Select is searchable', () => {
            const wrapper = shallow(<DropdownList options={provinces} searchable />);

            getByTestId(wrapper, 'input').simulate('change', { currentTarget: { value: 'quebec' } });
            getByTestId(wrapper, 'input').simulate('blur');

            expect(getByTestId(wrapper, 'input').props().value).toBe('Quebec');
        });
    });

    describe('listbox', () => {
        test('should close when escape is pressed', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listbox').simulate('keydown', { key: 'Escape' });

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('should clear input value when escape is pressed when Select is searchable', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen defaultValue="qc" searchable />);

            getByTestId(wrapper, 'listbox').simulate('keydown', { key: 'Escape' });

            expect(getByTestId(wrapper, 'input').props().value).toBe('');
        });

        test('should focus last element from array when ArrowUp is pressed', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listbox').simulate('keydown', { key: 'ArrowUp' });

            expect(getByTestId(wrapper, 'listbox').props().focusedValue).toBe('yt');
        });

        test('should focus the first element starting with the letter N', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listbox').simulate('keydown', { key: 'n' });

            expect(getByTestId(wrapper, 'listbox').props().focusedValue).toBe('ns');
        });

        test('should remove focus when a character is pressed when Select is searchable', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen searchable />);

            getByTestId(wrapper, 'listbox').simulate('keydown', { key: 'n' });

            expect(getByTestId(wrapper, 'listbox').props().autofocus).toBeFalsy();
        });

        test('should close onChange', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listbox').simulate('change', { option: { label: 'Quebec', value: 'qc' } });

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });
    });

    test('matches the snapshot', () => {
        const tree = renderWithProviders(
            <DropdownList
                defaultOpen
                label="Select an option"
                options={provinces}
                skipOption={skipOption}
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('invalid select has a different style', () => {
        const tree = renderWithProviders(
            <DropdownList
                defaultOpen
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
            <DropdownList
                defaultOpen
                label="Select an option"
                options={provinces}
                disabled
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('mobile select has a different style', () => {
        const tree = renderWithProviders(
            <DropdownList
                defaultOpen
                options={provinces}
            />,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('should select skip option when defaultValue is skip value', () => {
        const wrapper = shallow(<DropdownList options={[]} skipOption={skipOption} defaultValue={skipOption.value} />);

        const skipOptionWrapper = getByTestId(wrapper, 'select-skip-option');
        expect(skipOptionWrapper.props().checked).toBe(true);
    });

    test('should select skip option when value is skip value', () => {
        const wrapper = mountWithTheme(<DropdownList options={[]} skipOption={skipOption} value={skipOption.value} />);

        const skipOptionWrapper = getByTestId(wrapper, 'select-skip-option');
        expect(skipOptionWrapper.props().checked).toBe(true);
    });

    test('should not select skip option when defaultValue is different than skip value', () => {
        const wrapper = shallow(<DropdownList options={[]} skipOption={skipOption} defaultValue="not skip value" />);

        const skipOptionWrapper = getByTestId(wrapper, 'select-skip-option');
        expect(skipOptionWrapper.props().checked).toBe(false);
    });

    test('should call onChange when skipOption is selected', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <DropdownList
                options={[]}
                skipOption={skipOption}
                onChange={onChange}
            />,
        );

        getByTestId(wrapper, 'select-skip-option').simulate('change');

        expect(onChange).toBeCalled();
    });

    test('should not filter options when an option is already selected', async () => {
        const onChange = jest.fn();
        const wrapper = mountWithTheme(
            <DropdownList
                options={provinces}
                onChange={onChange}
            />,
        );
        await clickArrow(wrapper);
        await selectOption(wrapper, provinces[0]);
        await clickArrow(wrapper);

        const listBox = getByTestId(wrapper, 'listbox');
        expect(listBox.prop('options')).toBe(provinces);
    });

    test('should filter options again when you search after having a selected option', async () => {
        const onChange = jest.fn();
        const wrapper = mountWithTheme(
            <DropdownList
                options={provinces}
                onChange={onChange}
            />,
        );
        await clickArrow(wrapper);
        await selectOption(wrapper, provinces[0]);
        await clickArrow(wrapper);

        await actAndWaitForEffects(wrapper, () => {
            getByTestId(wrapper, 'input').simulate(
                'change',
                { currentTarget: { value: provinces[0].label } },
            );
        });

        const listBox = getByTestId(wrapper, 'listbox');
        expect(listBox.prop('options')).toBe(provinces);
    });

    test('should not display skip option when no skipOption is provided', () => {
        const wrapper = shallow(<DropdownList options={[]} />);

        const skipOptionWrapper = findByTestId(wrapper, 'select-skip-option');
        expect(skipOptionWrapper.length).toBe(0);
    });
});
