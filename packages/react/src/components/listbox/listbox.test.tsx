import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithTheme } from '../../test-utils/renderer';
import { Listbox } from './listbox';

const options = [
    { label: 'Option A', value: 'optionA', caption: 'The first one' },
    { label: 'Option B', value: 'optionB' },
    { label: 'Option C', value: 'optionC' },
    { label: 'Option D', value: 'optionD', disabled: true },
    { label: 'Option E', value: 'optionE' },
];

describe('Listbox', () => {
    describe('default value', () => {
        test('single value selects the corresponding option', () => {
            const wrapper = shallow(<Listbox options={options} defaultValue="optionB" />);

            expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toEqual(true);
        });

        test('array without multiselect only selects the option corresponding to the first value', () => {
            const wrapper = shallow(
                <Listbox options={options} defaultValue={['optionA', 'optionB']} multiselect={false} />,
            );

            expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toEqual(true);
            expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toEqual(false);
        });

        test('array with multiselect selects all corresponding options', () => {
            const wrapper = shallow(
                <Listbox options={options} defaultValue={['optionA', 'optionB']} multiselect />,
            );

            expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toEqual(true);
            expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toEqual(true);
        });

        test('no option is selected when no defaultValue is provided', () => {
            const wrapper = shallow(<Listbox options={options} />);

            expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toBe(false);
            expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toBe(false);
            expect(getByTestId(wrapper, 'listitem-optionC').prop('selected')).toBe(false);
            expect(getByTestId(wrapper, 'listitem-optionD').prop('selected')).toBe(false);
        });
    });

    describe('option selection', () => {
        test('clicking an option selects it', () => {
            const wrapper = shallow(<Listbox options={options} />);

            getByTestId(wrapper, 'listitem-optionB').simulate('click');

            expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toEqual(true);
        });

        test('multiple options can be selected with multiselect', () => {
            const wrapper = shallow(<Listbox options={options} defaultValue={['optionA']} multiselect />);

            getByTestId(wrapper, 'listitem-optionC').simulate('click');

            expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toBe(true);
            expect(getByTestId(wrapper, 'listitem-optionC').prop('selected')).toBe(true);
        });

        test('selected options can be unselected with multiselect', () => {
            const wrapper = shallow(<Listbox options={options} defaultValue={['optionA']} multiselect />);

            getByTestId(wrapper, 'listitem-optionA').simulate('click');

            expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toBe(false);
        });

        test('disabled option is not selectable', () => {
            const wrapper = shallow(<Listbox options={options} />);

            getByTestId(wrapper, 'listitem-optionD').simulate('click');

            expect(getByTestId(wrapper, 'listitem-optionD').prop('selected')).toBe(false);
        });

        test('the selected option is focused when the listbox gets the focus', () => {
            const wrapper = shallow(<Listbox options={options} defaultValue="optionB" />);

            getByTestId(wrapper, 'listbox-container').simulate('focus');

            expect(getByTestId(wrapper, 'listitem-optionB').prop('focused')).toBe(true);
        });

        test('the focused option is not focused when the listbox looses the focus', () => {
            const wrapper = shallow(<Listbox options={options} defaultValue="optionB" focusedValue="optionB" />);

            getByTestId(wrapper, 'listbox-container').simulate('blur');

            expect(getByTestId(wrapper, 'listitem-optionB').prop('focused')).toBe(false);
        });
    });

    describe('keyboard navigation', () => {
        test('ArrowDown focuses the next option', () => {
            const wrapper = shallow(<Listbox options={options} defaultValue="optionA" focusedValue="optionA" />);

            getByTestId(wrapper, 'listbox-container').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listitem-optionB').prop('focused')).toBe(true);
        });

        test('ArrowUp focuses the previous option', () => {
            const wrapper = shallow(<Listbox options={options} defaultValue="optionC" focusedValue="optionC" />);

            getByTestId(wrapper, 'listbox-container').simulate(
                'keydown',
                { key: 'ArrowUp', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listitem-optionB').prop('focused')).toBe(true);
        });

        test('Home focuses the first option', () => {
            const wrapper = shallow(<Listbox options={options} defaultValue="optionB" focusedValue="optionB" />);

            getByTestId(wrapper, 'listbox-container').simulate(
                'keydown',
                { key: 'Home', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listitem-optionA').prop('focused')).toBe(true);
        });

        test('End focuses the last option', () => {
            const wrapper = shallow(<Listbox options={options} defaultValue="optionB" focusedValue="optionB" />);

            getByTestId(wrapper, 'listbox-container').simulate(
                'keydown',
                { key: 'End', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listitem-optionE').prop('focused')).toBe(true);
        });

        test('focused option gets selected', () => {
            const wrapper = shallow(<Listbox options={options} defaultValue="optionB" focusedValue="optionB" />);

            getByTestId(wrapper, 'listbox-container').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listitem-optionC').prop('selected')).toBe(true);
        });

        test('disabled options are skipped (ArrowDown)', () => {
            const wrapper = shallow(
                <Listbox options={options} focusedValue="optionC" />,
            );

            getByTestId(wrapper, 'listbox-container').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listitem-optionE').prop('selected')).toBe(true);
            expect(getByTestId(wrapper, 'listitem-optionD').prop('selected')).toBe(false);
        });

        test('disabled options are skipped (ArrowUp)', () => {
            const callback = jest.fn();
            const wrapper = shallow(<Listbox options={options} focusedValue="optionE" onFocusChange={callback} />);

            getByTestId(wrapper, 'listbox-container').simulate(
                'keydown',
                { key: 'ArrowUp', preventDefault: jest.fn() },
            );

            expect(getByTestId(wrapper, 'listitem-optionC').prop('selected')).toBe(true);
            expect(getByTestId(wrapper, 'listitem-optionD').prop('selected')).toBe(false);
        });

        describe('with multiselect', () => {
            test('Space toggles the selection of the focused option', () => {
                const wrapper = shallow(<Listbox options={options} multiselect focusedValue="optionB" />);

                getByTestId(wrapper, 'listbox-container').simulate(
                    'keydown',
                    { key: ' ', preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toBe(true);

                getByTestId(wrapper, 'listbox-container').simulate(
                    'keydown',
                    { key: ' ', preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toBe(false);
            });

            test('Ctrl+A selects all options except disabled', () => {
                const wrapper = shallow(<Listbox options={options} multiselect defaultValue={['optionB']} />);

                getByTestId(wrapper, 'listbox-container').simulate(
                    'keydown',
                    { key: 'a', ctrlKey: true, preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toBe(true);
                expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toBe(true);
                expect(getByTestId(wrapper, 'listitem-optionC').prop('selected')).toBe(true);
                expect(getByTestId(wrapper, 'listitem-optionD').prop('selected')).toBe(false);
                expect(getByTestId(wrapper, 'listitem-optionE').prop('selected')).toBe(true);
            });

            test('Ctrl+A deselects all options when all options are selected', () => {
                const enabledOptionValues = options.filter((o) => !o.disabled).map((o) => o.value);
                const wrapper = shallow(
                    <Listbox options={options} multiselect defaultValue={enabledOptionValues} />,
                );

                getByTestId(wrapper, 'listbox-container').simulate(
                    'keydown',
                    { key: 'a', ctrlKey: true, preventDefault: jest.fn() },
                );

                enabledOptionValues.forEach((value) => {
                    expect(getByTestId(wrapper, `listitem-${value}`).prop('selected')).toBe(false);
                });
            });

            test('Shift+ArrowUp selects the previous option', () => {
                const wrapper = shallow(
                    <Listbox options={options} multiselect defaultValue={['optionB']} focusedValue="optionB" />,
                );

                getByTestId(wrapper, 'listbox-container').simulate(
                    'keydown',
                    { key: 'ArrowUp', shiftKey: true, preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toBe(true);
                expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toBe(true);
            });

            test('Shift+ArrowDown selects the next option', () => {
                const wrapper = shallow(
                    <Listbox options={options} multiselect defaultValue={['optionB']} focusedValue="optionB" />,
                );

                getByTestId(wrapper, 'listbox-container').simulate(
                    'keydown',
                    { key: 'ArrowDown', shiftKey: true, preventDefault: jest.fn() },
                );

                expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toBe(true);
                expect(getByTestId(wrapper, 'listitem-optionC').prop('selected')).toBe(true);
            });

            test('Ctrl+Shift+Home selects all options from the first to the focused option', () => {
                const wrapper = shallow(
                    <Listbox options={options} multiselect focusedValue="optionC" />,
                );

                getByTestId(wrapper, 'listbox-container').simulate(
                    'keydown',
                    {
                        key: 'Home',
                        shiftKey: true,
                        ctrlKey: true,
                        preventDefault: jest.fn(),
                    },
                );

                expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toBe(true);
                expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toBe(true);
                expect(getByTestId(wrapper, 'listitem-optionC').prop('selected')).toBe(true);
            });

            test('Ctrl+Shift+End selects all options from focused option to the last', () => {
                const wrapper = shallow(
                    <Listbox options={options} multiselect focusedValue="optionC" />,
                );

                getByTestId(wrapper, 'listbox-container').simulate(
                    'keydown',
                    {
                        key: 'End',
                        shiftKey: true,
                        ctrlKey: true,
                        preventDefault: jest.fn(),
                    },
                );

                expect(getByTestId(wrapper, 'listitem-optionC').prop('selected')).toBe(true);
                expect(getByTestId(wrapper, 'listitem-optionD').prop('selected')).toBe(false);
                expect(getByTestId(wrapper, 'listitem-optionE').prop('selected')).toBe(true);
            });
        });
    });

    describe('component is controlled', () => {
        test('selected option is updated when the value prop is changed', () => {
            const wrapper = shallow(<Listbox options={options} value="optionA" />);

            wrapper.setProps({ value: 'optionB' }).update();

            expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toBe(false);
            expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toBe(true);
        });

        test('selected option is deselected when the value prop is set to undefined', () => {
            const callback = jest.fn();
            const wrapper = shallow(<Listbox options={options} onChange={callback} value="optionA" />);

            wrapper.setProps({ value: undefined }).update();

            expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toBe(false);
        });

        test('focused option is updated when the focusedValue prop is changed', () => {
            const wrapper = shallow(<Listbox options={options} focusedValue="optionA" />);

            wrapper.setProps({ focusedValue: 'optionB' }).update();

            expect(getByTestId(wrapper, 'listitem-optionA').prop('focused')).toBe(false);
            expect(getByTestId(wrapper, 'listitem-optionB').prop('focused')).toBe(true);
        });

        test('focused option looses focus when the focusedValue prop is set to undefined', () => {
            const callback = jest.fn();
            const wrapper = shallow(<Listbox options={options} onChange={callback} focusedValue="optionA" />);

            wrapper.setProps({ focusedValue: undefined }).update();

            expect(getByTestId(wrapper, 'listitem-optionA').prop('focused')).toBe(false);
        });

        test('focused option is not automatically selected when the focusedValue prop is changed', () => {
            const wrapper = shallow(<Listbox options={options} focusedValue="optionA" value="optionA" />);

            wrapper.setProps({ focusedValue: 'optionB' }).update();

            expect(getByTestId(wrapper, 'listitem-optionA').prop('focused')).toBe(false);
            expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toBe(true);
            expect(getByTestId(wrapper, 'listitem-optionB').prop('focused')).toBe(true);
            expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toBe(false);
        });
    });

    describe('onChange callback', () => {
        test('callback is fired when an option is selected', () => {
            const callback = jest.fn();
            const wrapper = shallow(<Listbox options={options} onChange={callback} />);

            getByTestId(wrapper, 'listitem-optionC').simulate('click');

            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('callback is not fired when setting default values', () => {
            const callback = jest.fn();
            shallow(<Listbox options={options} onChange={callback} defaultValue="optionA" />);

            expect(callback).toHaveBeenCalledTimes(0);
        });

        test('callback is not fired when the option is already selected', () => {
            const callback = jest.fn();
            const wrapper = shallow(<Listbox options={options} onChange={callback} defaultValue="optionA" />);

            getByTestId(wrapper, 'listitem-optionA').simulate('click');

            expect(callback).toHaveBeenCalledTimes(0);
        });

        test('callback is not fired when the value prop is changed', () => {
            const callback = jest.fn();
            const wrapper = shallow(<Listbox options={options} onChange={callback} value="optionA" />);

            wrapper.setProps({ value: 'optionB' }).update();

            expect(callback).toHaveBeenCalledTimes(0);
        });

        test('callback received the selected option when fired', () => {
            const callback = jest.fn();
            const wrapper = shallow(<Listbox options={options} onChange={callback} />);

            getByTestId(wrapper, 'listitem-optionB').simulate('click');

            expect(callback).toHaveBeenCalledWith(options[1]);
        });

        test('callback received the list of selected options when fired with multiselect', () => {
            const callback = jest.fn();
            const wrapper = shallow(
                <Listbox multiselect options={options} onChange={callback} defaultValue={['optionB']} />,
            );

            getByTestId(wrapper, 'listitem-optionC').simulate('click');

            expect(callback).toHaveBeenCalledWith([options[1], options[2]]);
        });
    });

    describe('onFocusChange callback', () => {
        test('callback is fired when an option is focused', () => {
            const callback = jest.fn();
            const wrapper = shallow(<Listbox options={options} onFocusChange={callback} />);

            getByTestId(wrapper, 'listbox-container').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );

            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('callback is not fired when the option is already focused', () => {
            const callback = jest.fn();
            const wrapper = shallow(<Listbox options={options} onFocusChange={callback} focusedValue="optionA" />);

            getByTestId(wrapper, 'listitem-optionA').simulate('click');

            expect(callback).toHaveBeenCalledTimes(0);
        });

        test('callback is not fired when the focusedValue prop is changed', () => {
            const callback = jest.fn();
            const wrapper = shallow(<Listbox options={options} onFocusChange={callback} focusedValue="optionA" />);

            wrapper.setProps({ focusedValue: 'optionB' }).update();

            expect(callback).toHaveBeenCalledTimes(0);
        });

        test('callback receives the focused option when fired', () => {
            const callback = jest.fn();
            const wrapper = shallow(<Listbox options={options} onFocusChange={callback} focusedValue="optionA" />);

            getByTestId(wrapper, 'listbox-container').simulate(
                'keydown',
                { key: 'ArrowDown', preventDefault: jest.fn() },
            );

            expect(callback).toHaveBeenCalledWith(options[1]);
        });
    });

    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <Listbox options={options} defaultValue="optionB" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot (multiselect)', () => {
        const tree = renderWithTheme(
            <Listbox options={options} defaultValue={['optionA', 'optionC']} multiselect />,
        );

        expect(tree).toMatchSnapshot();
    });
});
