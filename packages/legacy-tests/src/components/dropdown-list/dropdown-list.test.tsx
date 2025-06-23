import { shallow } from 'enzyme';
import { ReactNode } from 'react';
import { DropdownList } from '~/components/dropdown-list/dropdown-list';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme } from '../../test-utils/renderer';

jest.mock('react-dom', () => ({
    ...jest.requireActual('react-dom'),
    createPortal: (children: ReactNode, _: Element | DocumentFragment) => (
        <div data-testid="mock-portal">{children}</div>
    ),
}));

jest.mock('~/components/toast/toast-provider', () => ({
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
        it('is closed by default', () => {
            const wrapper = shallow(<DropdownList options={provinces} />);

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        it('is open when defaultOpen is true', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
        });

        it('opens when clicking the textbox', () => {
            const wrapper = shallow(<DropdownList options={provinces} />);

            getByTestId(wrapper, 'textbox').simulate('click');

            expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
        });

        it('closes when clicking the textbox', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate('click');

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        it('closes when clicking outside', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'blur',
                { relatedTarget: document.createElement('div') },
            );

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        it('doesn\'t open when disabled', () => {
            const wrapper = shallow(<DropdownList options={provinces} disabled />);

            getByTestId(wrapper, 'textbox').simulate('click');

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        it('callback is fired when the textbox is closed', () => {
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
        it('renders correctly with readOnly enabled', () => {
            const wrapper = shallow(
                <DropdownList options={provinces} readOnly label="ReadOnly Dropdown" />,
            );

            const textbox = getByTestId(wrapper, 'textbox');
            expect(textbox.prop('aria-readonly')).toBe('true');
        });

        it('does not open listbox when clicked in readOnly mode', () => {
            const wrapper = shallow(
                <DropdownList options={provinces} readOnly label="ReadOnly Dropdown" />,
            );

            getByTestId(wrapper, 'textbox').simulate('click');

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        it('does not respond to keyboard events in readOnly mode', () => {
            const wrapper = shallow(
                <DropdownList options={provinces} readOnly label="ReadOnly Dropdown" />,
            );

            getByTestId(wrapper, 'textbox').simulate('keydown', {
                key: 'ArrowDown',
                preventDefault: jest.fn(),
            });

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        it('readonly mode prevents option selection', () => {
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
        it('defaultValue assigns this value to the input', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultValue="qc" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('qc');
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('qc');
        });

        it('the corresponding option is selected and focused when expanding the listbox', () => {
            const wrapper = mountWithTheme(<DropdownList options={provinces} defaultValue="qc" />);

            getByTestId(wrapper, 'textbox').simulate('click');

            expect(getByTestId(wrapper, 'listitem-qc').prop('$selected')).toBe(true);
            expect(getByTestId(wrapper, 'listitem-qc').prop('$focused')).toBe(true);
        });

        it('defaultValue can select an empty value', () => {
            const options = provinces.concat([{ value: '', label: '' }]);
            const wrapper = shallow(<DropdownList options={options} defaultValue="" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('');
        });

        it('no defaultValues are displayed when not specified and list is multiselect', () => {
            const wrapper = shallow(<DropdownList options={provinces} multiselect />);

            expect(getByTestId(wrapper, 'tag-wrapper').children()).toHaveLength(0);
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('');
        });
    });

    describe('option selection', () => {
        it('clicking an option selects it and updates the input value', () => {
            const wrapper = mountWithTheme(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listitem-qc').simulate('click');

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('qc');
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('qc');
        });

        it('the selected value is still focused when expanding the listbox', () => {
            const wrapper = mountWithTheme(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listitem-qc').simulate('click');
            getByTestId(wrapper, 'textbox').simulate('click');

            expect(getByTestId(wrapper, 'listitem-qc').prop('$selected')).toBe(true);
            expect(getByTestId(wrapper, 'listitem-qc').prop('$focused')).toBe(true);
        });

        it('the focused option is selected when clicking outside', () => {
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
    });

    describe('component is controlled', () => {
        it('the input value is set according to the value prop', () => {
            const wrapper = shallow(<DropdownList options={provinces} value="qc" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('qc');
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('qc');
        });

        it('the input value is updated when the value prop changes', () => {
            const wrapper = shallow(<DropdownList options={provinces} value="qc" />);

            wrapper.setProps({ value: 'ns' }).update();

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('ns');
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('ns');
        });

        it('the input value is set according to the value prop using an empty value', () => {
            const options = provinces.concat([{ value: '', label: '' }]);
            const wrapper = shallow(<DropdownList options={options} defaultValue="qc" value="" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('');
            expect(getByTestId(wrapper, 'input').prop('value')).toBe('');
        });
    });

    describe('icon is handled', () => {
        it('the icon is set according to the iconName prop', () => {
            const wrapper = shallow(<DropdownList options={provinces} iconName="menu" />);

            expect(getByTestId(wrapper, 'textbox-icon').prop('name')).toBe('menu');
        });

        it('the icon is not set when the iconName prop is undefined', () => {
            const wrapper = shallow(<DropdownList options={provinces} />);

            const iconComponent = getByTestId(wrapper, 'textbox-icon');
            expect(iconComponent.exists()).toBe(false);
        });
    });

    describe('onChange callback', () => {
        it('callback is fired when an option is selected', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(<DropdownList onChange={callback} options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listitem-qc').simulate('click');

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('callback is not fired when setting default value', () => {
            const callback = jest.fn();
            shallow(<DropdownList options={provinces} onChange={callback} defaultValue="qc" />);

            expect(callback).toHaveBeenCalledTimes(0);
        });

        it('callback is not fired when the value prop is changed', () => {
            const callback = jest.fn();
            const wrapper = shallow(<DropdownList options={provinces} onChange={callback} value="qc" />);

            wrapper.setProps({ value: 'ns' }).update();

            expect(callback).toHaveBeenCalledTimes(0);
        });

        it('callback is not fired when the option is already selected', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(
                <DropdownList options={provinces} onChange={callback} defaultValue="qc" defaultOpen />,
            );

            getByTestId(wrapper, 'listitem-qc').simulate('click');

            expect(callback).toHaveBeenCalledTimes(0);
        });

        it('callback received the selected option when fired', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(<DropdownList options={provinces} onChange={callback} defaultOpen />);

            getByTestId(wrapper, 'listitem-qc').simulate('click');

            expect(callback).toHaveBeenCalledWith({ value: 'qc', label: 'Quebec' });
        });
    });

    describe('keyboard navigation', () => {
        ['Enter', ' ', 'ArrowUp', 'ArrowDown', 'Home', 'End'].forEach((key) => {
            it(`${key === ' ' ? 'Space' : key} opens the listbox`, () => {
                const wrapper = shallow(<DropdownList options={provinces} />);

                getByTestId(wrapper, 'textbox').simulate(
                    'keydown',
                    { key, preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
            });
        });

        ['ArrowDown', 'Home'].forEach((key) => {
            it(`${key} also focuses the first option when it opens the listbox`, () => {
                const wrapper = shallow(<DropdownList options={provinces} />);

                getByTestId(wrapper, 'textbox').simulate(
                    'keydown',
                    { key: 'ArrowDown', preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('ab');
            });
        });

        it('End also focuses the last option when it opens the listbox', () => {
            const wrapper = shallow(<DropdownList options={provinces} />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'End', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('yt');
        });

        it('ArrowUp focuses the previous option', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen defaultValue="qc" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowUp', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('pe');
        });

        it('ArrowDown focuses the next option', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen defaultValue="qc" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('sk');
        });

        it('Home focuses the first option', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'Home', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('ab');
        });

        it('End focuses the last option', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'End', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('yt');
        });

        it('Escape closes the listbox', () => {
            const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'Escape', preventDefault: jest.fn() },
            );

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        it('Enter selects the focused option', () => {
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

        describe('when typing printable characters', () => {
            it('listbox opens when typing printable characters', () => {
                const wrapper = shallow(<DropdownList options={provinces} />);

                getByTestId(wrapper, 'textbox').simulate(
                    'keydown',
                    { key: 'a', preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
            });

            it('typing a letter focuses the first option starting with that letter', () => {
                const wrapper = shallow(<DropdownList options={provinces} defaultOpen />);

                getByTestId(wrapper, 'textbox').simulate(
                    'keydown',
                    { key: 'q', preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('qc');
            });

            it('typing a letter focuses the next option starting with that letter', () => {
                const wrapper = mountWithTheme(<DropdownList options={provinces} defaultOpen defaultValue="nb" />);

                getByTestId(wrapper, 'textbox')
                    .simulate('keydown', { key: 'n', preventDefault: jest.fn() })
                    .simulate('keydown', { key: 'n', preventDefault: jest.fn() });

                expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('nt');
            });

            it('typing letters in rapid succession focuses the next option starting with that sequence', () => {
                const wrapper = mountWithTheme(<DropdownList options={provinces} defaultOpen />);

                getByTestId(wrapper, 'textbox')
                    .simulate('keydown', { key: 'n', preventDefault: jest.fn() })
                    .simulate('keydown', { key: 'o', preventDefault: jest.fn() });

                expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('nt');
            });

            it('typing a letter that matches no option doesn\'t move the focus', () => {
                const wrapper = shallow(<DropdownList options={provinces} defaultOpen defaultValue="qc" />);

                getByTestId(wrapper, 'textbox').simulate(
                    'keydown',
                    { key: 'z', preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('qc');
            });
        });
    });

    it('input should have controllable data-test-id', () => {
        const wrapper = shallow(
            <DropdownList data-testid="a-controlled-id" options={provinces} defaultValue="qc" />,
        );

        expect(getByTestId(wrapper, 'a-controlled-id').prop('value')).toBe('qc');
    });
});
