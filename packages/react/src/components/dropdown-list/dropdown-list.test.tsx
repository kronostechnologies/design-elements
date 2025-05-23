import { shallow } from 'enzyme';
import { ReactNode } from 'react';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { DropdownList } from './dropdown-list';

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (children: ReactNode, _: Element | DocumentFragment) => (
        <div data-testid="mock-portal">{children}</div>
    ),
}));

jest.mock('../toast/toast-provider', () => ({
    ToastProvider: ({ children }: { children: ReactNode }) => children,
}));

const provinces = [
    { value: 'ab', label: 'Alberta' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'mb', label: 'Manitoba' },
    { value: 'nb', label: 'New Brunswick' },
    { value: 'nl', label: 'Newfoundland and Labrador' },
    { value: 'nt', label: 'Northwest Territories' },
    { value: 'ns', label: 'Nova Scotia' },
    { value: 'nu', label: 'Nunavut' },
    { value: 'on', label: 'Ontario' },
    { value: 'pe', label: 'Prince Edward Island' },
    { value: 'qc', label: 'Quebec' },
    { value: 'sk', label: 'Saskatchewan' },
    { value: 'yt', label: 'Yukon' },
];

describe('Dropdown list', () => {
    describe('opening and closing the listbox', () => {
        test('is closed by default', () => {
            const wrapper = shallow(<DropdownList options={provinces} />);

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('is open when defaultOpen is true', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
        });

        test('opens when clicking the textbox', () => {
            const wrapper = shallow(<DropdownList options={provinces} />);

            getByTestId(wrapper, 'textbox').simulate('click');

            expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
        });

        test('closes when clicking the textbox', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate('click');

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('closes when clicking outside', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'blur',
                { relatedTarget: document.createElement('div') },
            );

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('doesn\'t open when disabled', () => {
            const wrapper = shallow(<DropdownList options={provinces} disabled />);

            getByTestId(wrapper, 'textbox').simulate('click');

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('callback is fired when the textbox is closed', () => {
            const callback = jest.fn();
            const wrapper = shallow(
                <DropdownList options={provinces} onClose={callback} />,
            );

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );
            getByTestId(wrapper, 'textbox').simulate(
                'blur',
                { relatedTarget: document.createElement('div') },
            );

            expect(callback).toHaveBeenCalledTimes(1);
        });
    });

    describe('readonly state', () => {
        test('renders correctly with readOnly enabled', () => {
            const wrapper = shallow(
                <DropdownList options={provinces} readOnly label="ReadOnly Dropdown" />,
            );

            const textbox = getByTestId(wrapper, 'textbox');
            expect(textbox.prop('aria-readonly')).toBe('true');
        });

        test('does not open listbox when clicked in readOnly mode', () => {
            const wrapper = shallow(
                <DropdownList options={provinces} readOnly label="ReadOnly Dropdown" />,
            );

            getByTestId(wrapper, 'textbox').simulate('click');

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('does not respond to keyboard events in readOnly mode', () => {
            const wrapper = shallow(
                <DropdownList options={provinces} readOnly label="ReadOnly Dropdown" />,
            );

            getByTestId(wrapper, 'textbox').simulate('keydown', {
                key: 'ArrowDown',
                preventDefault: jest.fn(),
            });

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('readonly mode prevents option selection', () => {
            const onChangeMock = jest.fn();

            const wrapper = shallow(
                <DropdownList
                    options={provinces}
                    readOnly
                    onChange={onChangeMock}
                    label="ReadOnly Dropdown"
                />,
            );

            getByTestId(wrapper, 'textbox').simulate('click');

            const option = findByTestId(wrapper, 'listitem-qc');
            expect(option.exists()).toBe(false);

            expect(onChangeMock).not.toHaveBeenCalled();
        });
    });

    describe('default value', () => {
        test('defaultValue assigns this value to the input', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultValue="qc" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('qc');
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('qc');
        });

        test('the corresponding option is selected and focused when expanding the listbox', () => {
            const wrapper = mountWithTheme(<DropdownList options={provinces} defaultValue="qc" />);

            getByTestId(wrapper, 'textbox').simulate('click');

            expect(getByTestId(wrapper, 'listitem-qc').prop('$selected')).toBe(true);
            expect(getByTestId(wrapper, 'listitem-qc').prop('$focused')).toBe(true);
        });

        test('defaultValue can select an empty value', () => {
            const options = provinces.concat([{ value: '', label: '' }]);
            const wrapper = shallow(<DropdownList options={options} defaultValue="" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('');
        });

        test('the specified defaultValues are independently displayed when list is multiselect', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultValue={['nl', 'qc']} multiselect />);

            expect(getByTestId(wrapper, 'listboxtag-qc').exists()).toBe(true);
            expect(getByTestId(wrapper, 'listboxtag-nl').exists()).toBe(true);
            expect(getByTestId(wrapper, 'tag-wrapper').children()).toHaveLength(2);
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('nl|qc');
        });

        test('no defaultValues are displayed when not specified and list is multiselect', () => {
            const wrapper = shallow(<DropdownList options={provinces} multiselect />);

            expect(getByTestId(wrapper, 'tag-wrapper').children()).toHaveLength(0);
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('');
        });
    });

    describe('option selection', () => {
        test('clicking an option selects it and updates the input value', () => {
            const wrapper = mountWithTheme(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listitem-qc').simulate('click');

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('qc');
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('qc');
        });

        test('the selected value is still focused when expanding the listbox', () => {
            const wrapper = mountWithTheme(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listitem-qc').simulate('click');
            getByTestId(wrapper, 'textbox').simulate('click');

            expect(getByTestId(wrapper, 'listitem-qc').prop('$selected')).toBe(true);
            expect(getByTestId(wrapper, 'listitem-qc').prop('$focused')).toBe(true);
        });

        test('the focused option is selected when clicking outside', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen defaultValue="ab" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );
            getByTestId(wrapper, 'textbox').simulate(
                'blur',
                { relatedTarget: document.createElement('div') },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('bc');
        });

        test('clicking an option selects it and adds it to the input values when list is multiselect', () => {
            const wrapper = mountWithTheme(<DropdownList options={provinces} defaultOpen multiselect />);

            getByTestId(wrapper, 'listitem-nl').simulate('click');
            getByTestId(wrapper, 'listitem-qc').simulate('click');

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('nl|qc');
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('nl|qc');
        });
    });

    test('options are disabled when max number of selectable options is reached', () => {
        const wrapper = mountWithTheme(
            <DropdownList options={provinces} defaultOpen multiselect maxSelectableOptions={2} />,
        );

        getByTestId(wrapper, 'listitem-on').simulate('click');
        getByTestId(wrapper, 'listitem-qc').simulate('click');

        const disabledOptions = [
            getByTestId(wrapper, 'listitem-ab'),
            getByTestId(wrapper, 'listitem-bc'),
            getByTestId(wrapper, 'listitem-mb'),
            getByTestId(wrapper, 'listitem-nb'),
            getByTestId(wrapper, 'listitem-nl'),
            getByTestId(wrapper, 'listitem-nt'),
            getByTestId(wrapper, 'listitem-ns'),
            getByTestId(wrapper, 'listitem-nu'),
            getByTestId(wrapper, 'listitem-pe'),
            getByTestId(wrapper, 'listitem-sk'),
            getByTestId(wrapper, 'listitem-yt'),
        ];
        disabledOptions.forEach((option) => {
            expect(option.getDOMNode().getAttribute('aria-disabled')).toBe('true');
        });
    });

    test('selected options are not disabled when max number of selectable options is reached', () => {
        const wrapper = mountWithTheme(
            <DropdownList options={provinces} defaultOpen multiselect maxSelectableOptions={2} />,
        );

        getByTestId(wrapper, 'listitem-on').simulate('click');
        getByTestId(wrapper, 'listitem-qc').simulate('click');

        const selectedOptions = [
            getByTestId(wrapper, 'listitem-on'),
            getByTestId(wrapper, 'listitem-qc'),
        ];
        selectedOptions.forEach((option) => {
            expect(option.getDOMNode().getAttribute('aria-disabled')).toBe('false');
        });
    });

    describe('component is controlled', () => {
        test('the input value is set according to the value prop', () => {
            const wrapper = shallow(<DropdownList options={provinces} value="qc" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('qc');
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('qc');
        });

        test('the input value is updated when the value prop changes', () => {
            const wrapper = shallow(<DropdownList options={provinces} value="qc" />);

            wrapper.setProps({ value: 'ns' }).update();

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('ns');
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('ns');
        });

        test('the input value is set according to the value prop using an empty value', () => {
            const options = provinces.concat([{ value: '', label: '' }]);
            const wrapper = shallow(<DropdownList options={options} defaultValue="qc" value="" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('');
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('');
        });
    });

    describe('icon is handled', () => {
        test('the icon is set according to the iconName prop', () => {
            const wrapper = shallow(<DropdownList options={provinces} iconName="menu" />);

            expect(getByTestId(wrapper, 'textbox-icon').prop('name')).toBe('menu');
        });

        test('the icon is not set when the iconName prop is undefined', () => {
            const wrapper = shallow(<DropdownList options={provinces} />);

            const iconComponent = getByTestId(wrapper, 'textbox-icon');
            expect(iconComponent.exists()).toBe(false);
        });
    });

    describe('onChange callback', () => {
        test('callback is fired when an option is selected', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(<DropdownList onChange={callback} options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listitem-qc').simulate('click');

            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('callback is not fired when setting default value', () => {
            const callback = jest.fn();
            shallow(<DropdownList options={provinces} onChange={callback} defaultValue="qc" />);

            expect(callback).toHaveBeenCalledTimes(0);
        });

        test('callback is not fired when the value prop is changed', () => {
            const callback = jest.fn();
            const wrapper = shallow(<DropdownList options={provinces} onChange={callback} value="qc" />);

            wrapper.setProps({ value: 'ns' }).update();

            expect(callback).toHaveBeenCalledTimes(0);
        });

        test('callback is not fired when the option is already selected', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(
                <DropdownList options={provinces} onChange={callback} defaultValue="qc" defaultOpen />,
            );

            getByTestId(wrapper, 'listitem-qc').simulate('click');

            expect(callback).toHaveBeenCalledTimes(0);
        });

        test('callback received the selected option when fired', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(<DropdownList options={provinces} onChange={callback} defaultOpen />);

            getByTestId(wrapper, 'listitem-qc').simulate('click');

            expect(callback).toHaveBeenCalledWith({ value: 'qc', label: 'Quebec' });
        });
    });

    describe('keyboard navigation', () => {
        ['Enter', ' ', 'ArrowUp', 'ArrowDown', 'Home', 'End'].forEach((key) => {
            test(`${key === ' ' ? 'Space' : key} opens the listbox`, () => {
                const wrapper = shallow(<DropdownList options={provinces} />);

                getByTestId(wrapper, 'textbox').simulate(
                    'keydown',
                    { key, preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
            });
        });

        ['ArrowDown', 'Home'].forEach((key) => {
            test(`${key} also focuses the first option when it opens the listbox`, () => {
                const wrapper = shallow(<DropdownList options={provinces} />);

                getByTestId(wrapper, 'textbox').simulate(
                    'keydown',
                    { key: 'ArrowDown', preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('ab');
            });
        });

        test('End also focuses the last option when it opens the listbox', () => {
            const wrapper = shallow(<DropdownList options={provinces} />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'End', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('yt');
        });

        test('ArrowUp focuses the previous option', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen defaultValue="qc" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowUp', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('pe');
        });

        test('ArrowDown focuses the next option', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen defaultValue="qc" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('sk');
        });

        test('Home focuses the first option', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'Home', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('ab');
        });

        test('End focuses the last option', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'End', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('yt');
        });

        test('Escape closes the listbox', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'Escape', preventDefault: jest.fn() },
            );

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('Enter selects the focused option', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen defaultValue="qc" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );
            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'Enter', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('sk');
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('sk');
        });

        test('Enter removes the focused Tag when list is multiselect', () => {
            const wrapper = mountWithTheme(
                <DropdownList options={provinces} defaultValue={['ab', 'bc']} defaultOpen multiselect />,
            );

            getByTestId(wrapper, 'listboxtag-bc').simulate(
                'keydown',
                { key: 'Enter', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('ab');
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('ab');
        });

        describe('when typing printable characters', () => {
            test('listbox opens when typing printable characters', () => {
                const wrapper = shallow(<DropdownList options={provinces} />);

                getByTestId(wrapper, 'textbox').simulate(
                    'keydown',
                    { key: 'a', preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
            });

            test('typing a letter focuses the first option starting with that letter', () => {
                const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

                getByTestId(wrapper, 'textbox').simulate(
                    'keydown',
                    { key: 'q', preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('qc');
            });

            test('typing a letter focuses the next option starting with that letter', () => {
                const wrapper = mountWithTheme(<DropdownList options={provinces} defaultOpen defaultValue="nb" />);

                getByTestId(wrapper, 'textbox')
                    .simulate('keydown', { key: 'n', preventDefault: jest.fn() })
                    .simulate('keydown', { key: 'n', preventDefault: jest.fn() });

                expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('nt');
            });

            test('typing letters in rapid succession focuses the next option starting with that sequence', () => {
                const wrapper = mountWithTheme(<DropdownList options={provinces} defaultOpen />);

                getByTestId(wrapper, 'textbox')
                    .simulate('keydown', { key: 'n', preventDefault: jest.fn() })
                    .simulate('keydown', { key: 'o', preventDefault: jest.fn() });

                expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('nt');
            });

            test('typing a letter that matches no option doesn\'t move the focus', () => {
                const wrapper = shallow(<DropdownList options={provinces} defaultOpen defaultValue="qc" />);

                getByTestId(wrapper, 'textbox').simulate(
                    'keydown',
                    { key: 'z', preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('qc');
            });
        });
    });

    test('input should have controllable data-test-id', () => {
        const wrapper = shallow(
            <DropdownList data-testid="a-controlled-id" options={provinces} defaultValue="qc" />,
        );

        expect(getByTestId(wrapper, 'a-controlled-id').prop('value')).toBe('qc');
    });

    test('matches the snapshot', () => {
        const tree = renderWithProviders(
            <DropdownList
                defaultOpen
                label="Select an option"
                hint="Hint"
                options={provinces}
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot (invalid)', () => {
        const tree = renderWithProviders(
            <DropdownList
                defaultOpen
                label="Select an option"
                options={provinces}
                valid={false}
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot (disabled)', () => {
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

    test('matches the snapshot (mobile)', () => {
        const tree = renderWithProviders(
            <DropdownList
                defaultOpen
                options={provinces}
            />,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot (multiselect)', () => {
        const tree = renderWithProviders(
            <DropdownList
                defaultOpen
                options={provinces}
                multiselect
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot (icon)', () => {
        const tree = renderWithProviders(
            <DropdownList
                defaultOpen
                label="Select an option"
                hint="Hint"
                options={provinces}
                iconName="menu"
            />,
        );

        expect(tree).toMatchSnapshot();
    });
});
