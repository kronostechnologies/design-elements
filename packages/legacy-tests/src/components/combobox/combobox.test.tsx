import { shallow } from 'enzyme';
import { Combobox } from '~/components/combobox/combobox';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { actAndWaitForEffects, mountWithTheme } from '../../test-utils/renderer';

const provinces = [
    { value: 'Alberta' },
    { value: 'British Columbia' },
    { value: 'Manitoba' },
    { value: 'New Brunswick' },
    { value: 'Newfoundland and Labrador' },
    { value: 'Northwest Territories' },
    { value: 'Nova Scotia' },
    { value: 'Nunavut' },
    { value: 'Ontario' },
    { value: 'Prince Edward Island' },
    { value: 'Quebec' },
    { value: 'Saskatchewan' },
    { value: 'Yukon' },
];

describe('Combobox', () => {
    describe('opening and closing the listbox', () => {
        it('is closed by default', () => {
            const wrapper = shallow(<Combobox options={provinces} />);

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        it('is open when defaultOpen is true', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen />);

            expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
        });

        it('opens when clicking the arrow button', () => {
            const wrapper = shallow(<Combobox options={provinces} />);

            getByTestId(wrapper, 'arrow').simulate('click');

            expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
        });

        it('closes when clicking the arrow button', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen />);

            getByTestId(wrapper, 'arrow').simulate('click');

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        it('opens when clicking the textbox', () => {
            const wrapper = shallow(<Combobox options={provinces} />);

            getByTestId(wrapper, 'textbox').simulate('click');

            expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
        });

        it('closes when clicking the textbox', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate('click');

            expect(getByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        it('closes when clicking outside', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'blur',
                { relatedTarget: document.createElement('div') },
            );

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        it('doesn\'t open when disabled', () => {
            const wrapper = shallow(<Combobox options={provinces} disabled />);

            getByTestId(wrapper, 'arrow').simulate('click');

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });
    });

    describe('default value', () => {
        it('setting the prop assigns this value to the input', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultValue="Quebec" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Quebec');
        });

        it('the corresponding option is selected and focused when expanding the listbox', () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} defaultValue="Quebec" />);

            getByTestId(wrapper, 'arrow').simulate('click');

            expect(getByTestId(wrapper, 'listitem-Quebec').prop('$selected')).toBe(true);
            expect(getByTestId(wrapper, 'listitem-Quebec').prop('$focused')).toBe(true);
        });

        it('setting the prop to an arbitrary value rejects the input', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultValue="Nowhere" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('');
        });

        describe('when allowing a custom value', () => {
            it('setting the prop to an arbitrary value assigns this value to the input', () => {
                const wrapper = shallow(<Combobox options={provinces} allowCustomValue defaultValue="Nowhere" />);

                expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Nowhere');
            });
        });
    });

    describe('option selection', () => {
        it('clicking an option selects it and updates the input value', () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listitem-Quebec').simulate('click');

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Quebec');
        });

        it('the selected value is still focused when expanding the listbox', () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listitem-Quebec').simulate('click');
            getByTestId(wrapper, 'textbox').simulate('click');

            expect(getByTestId(wrapper, 'listitem-Quebec').prop('$selected')).toBe(true);
            expect(getByTestId(wrapper, 'listitem-Quebec').prop('$focused')).toBe(true);
        });

        it('the focused option is selected when clicking outside', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );
            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );
            getByTestId(wrapper, 'textbox').simulate(
                'blur',
                { relatedTarget: document.createElement('div') },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('British Columbia');
        });

        it('clearing the input removes the value from textbox', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultValue="Quebec" />);

            getByTestId(wrapper, 'clear').simulate('click');

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('');
        });

        it('clearing the input deselects the corresponding option', () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);

            getByTestId(wrapper, 'clear').simulate('click');

            expect(getByTestId(wrapper, 'listitem-Quebec').prop('$selected')).toBe(false);
            expect(getByTestId(wrapper, 'listitem-Quebec').prop('$focused')).toBe(false);
        });

        it('typing an exact match does not select the corresponding option', () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'quebec' } },
            );

            expect(getByTestId(wrapper, 'listitem-Quebec').prop('$selected')).toBe(false);
        });
    });

    describe('list filtering', () => {
        it('typing a valid letter opens the listbox', () => {
            const wrapper = shallow(<Combobox options={provinces} />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'q' } },
            );

            expect(getByTestId(wrapper, 'listbox').length).toBeGreaterThan(0);
        });

        it('typing an invalid letter opens the listbox with the no option placeholder', () => {
            const wrapper = shallow(<Combobox options={provinces} />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'z' } },
            );

            expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
            expect(getByTestId(wrapper, 'listbox').prop('options')[0].disabled).toBeTruthy();
        });

        it('typing a letter filters the list', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'q' } },
            );

            expect(getByTestId(wrapper, 'listbox').prop('options')).toEqual([
                { value: 'Quebec' },
            ]);
        });

        it('erasing characters updates the list to match the remaining input', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen defaultValue="New B" />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'New ' } },
            );

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'New' } },
            );

            expect(getByTestId(wrapper, 'listbox').prop('options')).toEqual([
                { value: 'New Brunswick' },
                { value: 'Newfoundland and Labrador' },
            ]);
        });

        it('when a value is selected the list contains all options on open', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);

            expect(getByTestId(wrapper, 'listbox').prop('options')).toEqual(provinces);
        });

        describe('disabled filtering', () => {
            it('typing a letter does not filter the list', () => {
                const wrapper = shallow(<Combobox options={provinces} disableListFiltering defaultOpen />);

                getByTestId(wrapper, 'textbox').simulate(
                    'change',
                    { target: { value: 'q' } },
                );

                expect(getByTestId(wrapper, 'listbox').prop('options')).toEqual(provinces);
            });
        });
    });

    describe('empty options list', () => {
        it('the listbox contains the empty message', () => {
            const emptyListMessage = 'The list is empty';
            const wrapper = shallow(<Combobox options={[]} emptyListMessage={emptyListMessage} defaultOpen />);

            expect(getByTestId(wrapper, 'listbox').prop('options')).toEqual([{
                disabled: true,
                label: emptyListMessage,
                value: '',
            },
            ]);
        });

        it('the empty message is not removed if custom values are not allowed', () => {
            const emptyListMessage = 'The list is empty';
            const wrapper = shallow(<Combobox options={[]} emptyListMessage={emptyListMessage} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'q' } },
            );

            expect(getByTestId(wrapper, 'listbox').prop('options')).toEqual([{
                disabled: true,
                label: emptyListMessage,
                value: '',
            },
            ]);
        });

        it('the empty message is removed if custom values are allowed', () => {
            const emptyListMessage = 'The list is empty';
            const wrapper = shallow(
                <Combobox options={[]} emptyListMessage={emptyListMessage} defaultOpen allowCustomValue />,
            );

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'q' } },
            );

            expect(getByTestId(wrapper, 'listbox').length).toEqual(0);
        });
    });

    describe('loading state', () => {
        it('when active the listbox only contains the loading message', () => {
            const wrapper = shallow(<Combobox options={provinces} isLoading defaultOpen />);

            expect(getByTestId(wrapper, 'listbox').prop('options')).toEqual([{
                disabled: true,
                label: 'Loading...',
                value: '',
            },
            ]);
        });
    });

    describe('value handling', () => {
        it('clicking outside reverts to previous valid value', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultValue="Quebec" />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'z' } },
            );

            getByTestId(wrapper, 'textbox').simulate(
                'blur',
                { relatedTarget: document.createElement('div') },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Quebec');
        });

        it('arbitrary value is kept when allowing custom values', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultValue="Quebec" allowCustomValue />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'z' } },
            );

            getByTestId(wrapper, 'textbox').simulate(
                'blur',
                { relatedTarget: document.createElement('div') },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('z');
        });
    });

    describe('inline autocomplete', () => {
        it('typing a valid letter opens the listbox', () => {
            const wrapper = shallow(<Combobox options={provinces} inlineAutoComplete />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'q' } },
            );

            expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
        });

        it('typing the first letter of an existing option autocompletes the input', () => {
            const wrapper = shallow(<Combobox options={provinces} inlineAutoComplete />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'q' } },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Quebec');
        });

        it('the suggested part of the input is highlighted', async () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} inlineAutoComplete />);

            await actAndWaitForEffects(wrapper, () => {
                getByTestId(wrapper, 'textbox').simulate(
                    'change',
                    { target: { value: 'q' } },
                );
            });

            expect(getByTestId(wrapper, 'textbox').getDOMNode<HTMLInputElement>().selectionStart).toBe(1);
            expect(getByTestId(wrapper, 'textbox').getDOMNode<HTMLInputElement>().selectionEnd).toBe(6);
        });

        it('erasing characters removes the suggestion', async () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} inlineAutoComplete defaultValue="Que" />);

            await actAndWaitForEffects(wrapper, () => {
                getByTestId(wrapper, 'textbox').simulate(
                    'keydown',
                    { key: 'Backspace', preventDefault: jest.fn() },
                );
                getByTestId(wrapper, 'textbox').simulate(
                    'change',
                    { target: { value: 'Qu' } },
                );
            });

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Qu');
            expect(getByTestId(wrapper, 'textbox').getDOMNode<HTMLInputElement>().selectionStart).toBe(2);
            expect(getByTestId(wrapper, 'textbox').getDOMNode<HTMLInputElement>().selectionEnd).toBe(2);
        });

        it('focusing an option with ArrowUp fills the input with its value', () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} inlineAutoComplete defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowUp', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Yukon');
        });

        it('focusing an option with ArrowDown fills the input with its value', () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} inlineAutoComplete defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Alberta');
        });
    });

    describe('component is controlled', () => {
        it('the input value is set according to the value prop', () => {
            const wrapper = shallow(<Combobox options={provinces} value="Quebec" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Quebec');
        });

        it('the input value is updated when the value prop changes', () => {
            const wrapper = shallow(<Combobox options={provinces} value="Quebec" />);

            wrapper.setProps({ value: 'Nova Scotia' }).update();

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Nova Scotia');
        });

        it('the input value is updated when the value prop changes to an arbitrary value', () => {
            const wrapper = shallow(<Combobox options={provinces} allowCustomValue value="Quebec" />);

            wrapper.setProps({ value: 'Nowhere' }).update();

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Nowhere');
        });

        it('the input value is set according to the value prop using an empty value', () => {
            const options = provinces.concat([{ value: '' }]);
            const wrapper = shallow(<Combobox options={options} defaultValue="Quebec" value="" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('');
        });
    });

    describe('onChange callback', () => {
        it('callback is fired when an option is selected', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(<Combobox onChange={callback} options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listitem-Quebec').simulate('click');

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('callback is not fired when setting default value', () => {
            const callback = jest.fn();
            shallow(<Combobox options={provinces} onChange={callback} defaultValue="Quebec" />);

            expect(callback).toHaveBeenCalledTimes(0);
        });

        it('callback is not fired when the value prop is changed', () => {
            const callback = jest.fn();
            const wrapper = shallow(<Combobox options={provinces} onChange={callback} value="Quebec" />);

            wrapper.setProps({ value: 'Nova_Scotia' }).update();

            expect(callback).toHaveBeenCalledTimes(0);
        });

        it('callback is not fired when the option is already selected', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(
                <Combobox options={provinces} onChange={callback} defaultValue="Quebec" defaultOpen />,
            );

            getByTestId(wrapper, 'listitem-Quebec').simulate('click');

            expect(callback).toHaveBeenCalledTimes(0);
        });

        it('callback should not be fired when characters are typed in the input and does not match an option', () => {
            const onChange = jest.fn();
            const onInputChange = jest.fn();
            const wrapper = mountWithTheme(
                <Combobox options={provinces} onChange={onChange} onInputChange={onInputChange} />,
            );

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'q' } },
            );

            expect(onChange).toHaveBeenCalledTimes(0);
            expect(onInputChange).toHaveBeenCalledWith('q');
        });

        it('callback received the input value when fired', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(<Combobox options={provinces} onChange={callback} defaultOpen />);

            getByTestId(wrapper, 'listitem-Quebec').simulate('click');

            expect(callback).toHaveBeenCalledWith('Quebec');
        });

        it('callback does not receive the suggestion when fired', () => {
            const onChange = jest.fn();
            const onInputChange = jest.fn();
            const wrapper = mountWithTheme(
                <Combobox options={provinces} inlineAutoComplete onChange={onChange} onInputChange={onInputChange} />,
            );

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'q' } },
            );

            expect(onChange).toHaveBeenCalledTimes(0);
            expect(onInputChange).toHaveBeenCalledWith('q');
        });
    });

    describe('keyboard navigation', () => {
        ['ArrowUp', 'ArrowDown'].forEach((key) => {
            it(`${key} opens the listbox`, () => {
                const wrapper = shallow(<Combobox options={provinces} />);

                getByTestId(wrapper, 'textbox').simulate(
                    'keydown',
                    { key, preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
            });
        });

        it('ArrowDown also focuses the first option when it opens the listbox', () => {
            const wrapper = shallow(<Combobox options={provinces} />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('Alberta');
        });

        it('ArrowUp also focuses the last option when it opens the listbox', () => {
            const wrapper = shallow(<Combobox options={provinces} />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowUp', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('Yukon');
        });

        it('ArrowUp focuses the previous option', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowUp', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('Prince Edward Island');
        });

        it('ArrowDown focuses the next option', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('Saskatchewan');
        });

        it('Escape closes the listbox', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'Escape', preventDefault: jest.fn() },
            );

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        it('Escape does not clear the value when the listbox is open', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'Escape', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toEqual('Quebec');
        });

        it('Escape clears the textbox when the listbox is closed', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultValue="Test" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'Escape', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toEqual('');
        });

        it('Enter selects the focused option', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );
            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'Enter', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Saskatchewan');
        });

        it('Enter closes the listbox if custom values are allowed', () => {
            const wrapper = shallow(<Combobox options={provinces} allowCustomValue defaultOpen defaultValue="New" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'Enter', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').length).toEqual(0);
        });
    });

    it('input should have controllable data-test-id', () => {
        const wrapper = shallow(
            <Combobox data-testid="a-controlled-id" options={provinces} defaultValue="Quebec" />,
        );

        expect(getByTestId(wrapper, 'a-controlled-id').prop('value')).toBe('Quebec');
    });
});
