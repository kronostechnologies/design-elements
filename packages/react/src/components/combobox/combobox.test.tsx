import { shallow } from 'enzyme';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { actAndWaitForEffects, mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { Combobox } from './combobox';

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
        test('is closed by default', () => {
            const wrapper = shallow(<Combobox options={provinces} />);

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('is open when defaultOpen is true', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen />);

            expect(findByTestId(wrapper, 'listbox').length).toEqual(1);
        });

        test('opens when the textbox receives the focus and the input has a value', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultValue="Quebec" />);

            getByTestId(wrapper, 'textbox').simulate('focus');

            expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
        });

        test('does not open when the textbox receives the focus and the input has no value', () => {
            const wrapper = shallow(<Combobox options={provinces} />);

            getByTestId(wrapper, 'textbox').simulate('focus');

            expect(getByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('opens when clicking the arrow button', () => {
            const wrapper = shallow(<Combobox options={provinces} />);

            getByTestId(wrapper, 'arrow').simulate('click');

            expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
        });

        test('closes when clicking the arrow button', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen />);

            getByTestId(wrapper, 'arrow').simulate('click');

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('closes when clicking outside', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'blur',
                { relatedTarget: document.createElement('div') },
            );

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('doesn\'t open when disabled', () => {
            const wrapper = shallow(<Combobox options={provinces} disabled />);

            getByTestId(wrapper, 'arrow').simulate('click');

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
        });
    });

    describe('default value', () => {
        test('setting the prop assigns this value to the input', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultValue="Quebec" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Quebec');
        });

        test('setting the prop to a arbitrary value assigns this value to the input', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultValue="Nowhere" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Nowhere');
        });

        test('the corresponding option is selected and focused when expanding the listbox', () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} defaultValue="Quebec" />);

            getByTestId(wrapper, 'arrow').simulate('click');

            expect(getByTestId(wrapper, 'listitem-Quebec').prop('selected')).toBe(true);
            expect(getByTestId(wrapper, 'listitem-Quebec').prop('focused')).toBe(true);
        });
    });

    describe('option selection', () => {
        test('clicking an option selects it and updates the input value', () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listitem-Quebec').simulate('click');

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Quebec');
        });

        test('the selected value is still focused when expanding the listbox', () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listitem-Quebec').simulate('click');
            getByTestId(wrapper, 'textbox').simulate('focus');

            expect(getByTestId(wrapper, 'listitem-Quebec').prop('selected')).toBe(true);
            expect(getByTestId(wrapper, 'listitem-Quebec').prop('focused')).toBe(true);
        });

        test('the focused option is selected when clicking outside', () => {
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
    });

    describe('list autocomplete', () => {
        test('typing a valid letter opens the listbox', () => {
            const wrapper = shallow(<Combobox options={provinces} autoComplete="list" />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'q' } },
            );

            expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
        });

        test('typing an invalid letter does not open the listbox', () => {
            const wrapper = shallow(<Combobox options={provinces} autoComplete="list" />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'z' } },
            );

            expect(getByTestId(wrapper, 'listbox').length).toEqual(0);
        });

        test('typing a letter filters the list', () => {
            const wrapper = shallow(<Combobox options={provinces} autoComplete="list" defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'q' } },
            );

            expect(getByTestId(wrapper, 'listbox').prop('options')).toEqual([
                { value: 'Quebec' },
            ]);
        });

        test('erasing characters updates the list to match the remaining input', () => {
            const wrapper = shallow(
                <Combobox options={provinces} autoComplete="list" defaultOpen defaultValue="New B" />,
            );

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
    });

    describe('inline autocomplete', () => {
        test('typing the first letter of an existing option autocompletes the input', () => {
            const wrapper = shallow(<Combobox options={provinces} autoComplete="inline" />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'q' } },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Quebec');
        });

        test('the suggested part of the input is highlighted', async () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} autoComplete="inline" />);

            await actAndWaitForEffects(wrapper, () => {
                getByTestId(wrapper, 'textbox').simulate(
                    'change',
                    { target: { value: 'q' } },
                );
            });

            expect(getByTestId(wrapper, 'textbox').getDOMNode<HTMLInputElement>().selectionStart).toBe(1);
            expect(getByTestId(wrapper, 'textbox').getDOMNode<HTMLInputElement>().selectionEnd).toBe(6);
        });

        test('erasing characters removes the suggestion', async () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} autoComplete="inline" defaultValue="Que" />);

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

        test('focusing an option with ArrowUp fills the input with its value', () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} autoComplete="inline" defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowUp', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Yukon');
        });

        test('focusing an option with ArrowDown fills the input with its value', () => {
            const wrapper = mountWithTheme(<Combobox options={provinces} autoComplete="inline" defaultOpen />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Alberta');
        });
    });

    describe('component is controlled', () => {
        test('the input value is set according to the value prop', () => {
            const wrapper = shallow(<Combobox options={provinces} value="Quebec" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Quebec');
        });

        test('the input value is updated when the value prop changes', () => {
            const wrapper = shallow(<Combobox options={provinces} value="Quebec" />);

            wrapper.setProps({ value: 'Nova Scotia' }).update();

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Nova Scotia');
        });

        test('the input value is updated when the value prop changes to an arbitrary value', () => {
            const wrapper = shallow(<Combobox options={provinces} value="Quebec" />);

            wrapper.setProps({ value: 'Nowhere' }).update();

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('Nowhere');
        });

        test('the input value is set according to the value prop using an empty value', () => {
            const options = provinces.concat([{ value: '' }]);
            const wrapper = shallow(<Combobox options={options} defaultValue="Quebec" value="" />);

            expect(getByTestId(wrapper, 'textbox').prop('value')).toBe('');
        });
    });

    describe('onChange callback', () => {
        test('callback is fired when an option is selected', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(<Combobox onChange={callback} options={provinces} defaultOpen />);

            getByTestId(wrapper, 'listitem-Quebec').simulate('click');

            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('callback is not fired when setting default value', () => {
            const callback = jest.fn();
            shallow(<Combobox options={provinces} onChange={callback} defaultValue="Quebec" />);

            expect(callback).toHaveBeenCalledTimes(0);
        });

        test('callback is not fired when the value prop is changed', () => {
            const callback = jest.fn();
            const wrapper = shallow(<Combobox options={provinces} onChange={callback} value="Quebec" />);

            wrapper.setProps({ value: 'Nova_Scotia' }).update();

            expect(callback).toHaveBeenCalledTimes(0);
        });

        test('callback is not fired when the option is already selected', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(
                <Combobox options={provinces} onChange={callback} defaultValue="Quebec" defaultOpen />,
            );

            getByTestId(wrapper, 'listitem-Quebec').simulate('click');

            expect(callback).toHaveBeenCalledTimes(0);
        });

        test('callback is fired when characters are typed in the input', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(<Combobox options={provinces} onChange={callback} />);

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'q' } },
            );

            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('callback received the input value when fired', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(<Combobox options={provinces} onChange={callback} defaultOpen />);

            getByTestId(wrapper, 'listitem-Quebec').simulate('click');

            expect(callback).toHaveBeenCalledWith('Quebec');
        });

        test('callback does not receive the suggestion when fired', () => {
            const callback = jest.fn();
            const wrapper = mountWithTheme(
                <Combobox options={provinces} autoComplete="inline" onChange={callback} />,
            );

            getByTestId(wrapper, 'textbox').simulate(
                'change',
                { target: { value: 'q' } },
            );

            expect(callback).toHaveBeenCalledWith('q');
        });
    });

    describe('keyboard navigation', () => {
        ['ArrowUp', 'ArrowDown'].forEach((key) => {
            test(`${key} opens the listbox`, () => {
                const wrapper = shallow(<Combobox options={provinces} />);

                getByTestId(wrapper, 'textbox').simulate(
                    'keydown',
                    { key, preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listbox').length).toEqual(1);
            });
        });

        test('ArrowDown also focuses the first option when it opens the listbox', () => {
            const wrapper = shallow(<Combobox options={provinces} />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('Alberta');
        });

        test('ArrowUp also focuses the last option when it opens the listbox', () => {
            const wrapper = shallow(<Combobox options={provinces} />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowUp', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('Yukon');
        });

        test('ArrowUp focuses the previous option', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowUp', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('Prince Edward Island');
        });

        test('ArrowDown focuses the next option', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen defaultValue="Quebec" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listbox').prop('focusedValue')).toBe('Saskatchewan');
        });

        test('Escape closes the listbox', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultOpen defaultValue="Test" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'Escape', preventDefault: jest.fn() },
            );

            expect(findByTestId(wrapper, 'listbox').length).toEqual(0);
            expect(getByTestId(wrapper, 'textbox').prop('value')).toEqual('Test');
        });

        test('Escape clears the textbox when the listbox is closed', () => {
            const wrapper = shallow(<Combobox options={provinces} defaultValue="Test" />);

            getByTestId(wrapper, 'textbox').simulate(
                'keydown',
                { key: 'Escape', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'textbox').prop('value')).toEqual('');
        });

        test('Enter selects the focused option', () => {
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
    });

    test('input should have controllable data-test-id', () => {
        const wrapper = shallow(
            <Combobox data-testid="a-controlled-id" options={provinces} defaultValue="Quebec" />,
        );

        expect(getByTestId(wrapper, 'a-controlled-id').prop('value')).toBe('Quebec');
    });

    test('matches the snapshot', () => {
        const tree = renderWithProviders(
            <Combobox
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
            <Combobox
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
            <Combobox
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
            <Combobox
                defaultOpen
                options={provinces}
            />,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
