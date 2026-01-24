import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/testing-library';
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
        it('single value selects the corresponding option', () => {
            renderWithProviders(<Listbox options={options} defaultValue="optionB" />);

            expect(screen.getByTestId('listitem-optionB')).toHaveAttribute('aria-selected', 'true');
        });

        it('array without multiselect only selects the option corresponding to the first value', () => {
            renderWithProviders(
                <Listbox options={options} defaultValue={['optionA', 'optionB']} multiselect={false} />,
            );

            expect(screen.getByTestId('listitem-optionA')).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByTestId('listitem-optionB')).toHaveAttribute('aria-selected', 'false');
        });

        it('array with multiselect selects all corresponding options', () => {
            renderWithProviders(
                <Listbox options={options} defaultValue={['optionA', 'optionB']} multiselect />,
            );

            expect(screen.getByTestId('listitem-optionA')).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByTestId('listitem-optionB')).toHaveAttribute('aria-selected', 'true');
        });

        it('no option is selected when no defaultValue is provided', () => {
            renderWithProviders(<Listbox options={options} />);

            const listOptions = screen.queryAllByRole('option');
            expect(listOptions).toHaveLength(5);
            listOptions.forEach((option) => {
                expect(option).toHaveAttribute('aria-selected', 'false');
            });
        });
    });

    describe('option selection', () => {
        it('clicking an option selects it', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Listbox options={options} />);

            await user.click(screen.getByTestId('listitem-optionB'));

            expect(screen.getByTestId('listitem-optionB')).toHaveAttribute('aria-selected', 'true');
        });

        it('multiple options can be selected with multiselect', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Listbox options={options} defaultValue={['optionA']} multiselect />);

            await user.click(screen.getByTestId('listitem-optionC'));

            expect(screen.getByTestId('listitem-optionA')).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByTestId('listitem-optionC')).toHaveAttribute('aria-selected', 'true');
        });

        it('selected options can be unselected with multiselect', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Listbox options={options} defaultValue={['optionA']} multiselect />);

            await user.click(screen.getByTestId('listitem-optionA'));

            expect(screen.getByTestId('listitem-optionA')).toHaveAttribute('aria-selected', 'false');
        });

        it('disabled option is not selectable', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Listbox options={options} />);

            await user.click(screen.getByTestId('listitem-optionD'));

            expect(screen.getByTestId('listitem-optionD')).toHaveAttribute('aria-selected', 'false');
        });

        it('the selected option is focused when the listbox gets the focus', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Listbox options={options} defaultValue="optionB" />);

            await user.tab();

            const listbox = screen.getByRole('listbox');
            const optionB = screen.getByTestId('listitem-optionB');
            expect(listbox).toHaveAttribute('aria-activedescendant', optionB.id);
        });

        it('the focused option is not focused when the listbox looses the focus', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Listbox options={options} defaultValue="optionB" focusedValue="optionB" />);

            const listbox = screen.getByRole('listbox');
            act(() => listbox.focus());

            await user.tab();

            expect(listbox).not.toHaveAttribute('aria-activedescendant');
        });
    });

    describe('keyboard navigation', () => {
        it('ArrowDown focuses the next option', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Listbox options={options} defaultValue="optionA" focusedValue="optionA" />);

            const listbox = screen.getByRole('listbox');
            act(() => listbox.focus());
            await user.keyboard('{ArrowDown}');

            const optionB = screen.getByTestId('listitem-optionB');
            expect(listbox).toHaveAttribute('aria-activedescendant', optionB.id);
        });

        it('ArrowUp focuses the previous option', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Listbox options={options} defaultValue="optionC" focusedValue="optionC" />);

            const listbox = screen.getByRole('listbox');
            act(() => listbox.focus());
            await user.keyboard('{ArrowUp}');

            const optionB = screen.getByTestId('listitem-optionB');
            expect(listbox).toHaveAttribute('aria-activedescendant', optionB.id);
        });

        it('Home focuses the first option', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Listbox options={options} defaultValue="optionB" focusedValue="optionB" />);

            const listbox = screen.getByRole('listbox');
            act(() => listbox.focus());
            await user.keyboard('{Home}');

            const optionA = screen.getByTestId('listitem-optionA');
            expect(listbox).toHaveAttribute('aria-activedescendant', optionA.id);
        });

        it('End focuses the last option', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Listbox options={options} defaultValue="optionB" focusedValue="optionB" />);

            const listbox = screen.getByRole('listbox');
            act(() => listbox.focus());
            await user.keyboard('{End}');

            const optionE = screen.getByTestId('listitem-optionE');
            expect(listbox).toHaveAttribute('aria-activedescendant', optionE.id);
        });

        it('focused option gets selected', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Listbox options={options} defaultValue="optionB" focusedValue="optionB" />);

            const listbox = screen.getByRole('listbox');
            act(() => listbox.focus());
            await user.keyboard('{ArrowDown}');

            expect(screen.getByTestId('listitem-optionC')).toHaveAttribute('aria-selected', 'true');
        });

        it('disabled options are skipped (ArrowDown)', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <Listbox options={options} defaultValue="optionC" focusedValue="optionC" />,
            );

            const listbox = screen.getByRole('listbox');
            act(() => listbox.focus());
            await user.keyboard('{ArrowDown}');

            expect(screen.getByTestId('listitem-optionE')).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByTestId('listitem-optionD')).toHaveAttribute('aria-selected', 'false');
        });

        it('disabled options are skipped (ArrowUp)', async () => {
            const user = userEvent.setup();
            const callback = jest.fn();
            renderWithProviders(
                <Listbox options={options} defaultValue="optionE" focusedValue="optionE" onFocusChange={callback} />,
            );

            const listbox = screen.getByRole('listbox');
            act(() => listbox.focus());
            await user.keyboard('{ArrowUp}');

            expect(screen.getByTestId('listitem-optionC')).toHaveAttribute('aria-selected', 'true');
            expect(screen.getByTestId('listitem-optionD')).toHaveAttribute('aria-selected', 'false');
        });

        it('Enter selects the focused option', async () => {
            const user = userEvent.setup();
            renderWithProviders(<Listbox options={options} defaultValue="optionB" focusedValue="optionB" />);

            const listbox = screen.getByRole('listbox');
            act(() => listbox.focus());
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{Enter}');

            expect(screen.getByTestId('listitem-optionC')).toHaveAttribute('aria-selected', 'true');
        });

        it('keyboard navigation is disabled when keyboardNav is disabled', async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <Listbox options={options} defaultValue="optionB" focusedValue="optionB" keyboardNav={false} />,
            );

            const listbox = screen.getByRole('listbox');
            act(() => listbox.focus());
            await user.keyboard('{ArrowDown}');

            const optionB = screen.getByTestId('listitem-optionB');
            expect(listbox).toHaveAttribute('aria-activedescendant', optionB.id);
        });

        describe('with multiselect', () => {
            it('Space toggles the selection of the focused option', async () => {
                const user = userEvent.setup();
                renderWithProviders(<Listbox options={options} multiselect />);

                const listbox = screen.getByRole('listbox');
                act(() => listbox.focus());

                await user.keyboard('{ArrowDown}');
                await user.keyboard(' ');

                expect(screen.getByTestId('listitem-optionB')).toHaveAttribute('aria-selected', 'true');

                await user.keyboard(' ');

                expect(screen.getByTestId('listitem-optionB')).toHaveAttribute('aria-selected', 'false');
            });

            it('Ctrl+A selects all options except disabled', async () => {
                const user = userEvent.setup();
                renderWithProviders(<Listbox options={options} multiselect defaultValue={['optionB']} />);

                const listbox = screen.getByRole('listbox');
                act(() => listbox.focus());

                await user.keyboard('{Control>}a{/Control}');

                expect(screen.getByTestId('listitem-optionA')).toHaveAttribute('aria-selected', 'true');
                expect(screen.getByTestId('listitem-optionB')).toHaveAttribute('aria-selected', 'true');
                expect(screen.getByTestId('listitem-optionC')).toHaveAttribute('aria-selected', 'true');
                expect(screen.getByTestId('listitem-optionD')).toHaveAttribute('aria-selected', 'false');
                expect(screen.getByTestId('listitem-optionE')).toHaveAttribute('aria-selected', 'true');
            });

            it('Ctrl+A deselects all options when all options are selected', async () => {
                const user = userEvent.setup();
                const enabledOptionValues = options.filter((o) => !o.disabled).map((o) => o.value);
                renderWithProviders(
                    <Listbox options={options} multiselect defaultValue={enabledOptionValues} />,
                );

                const listbox = screen.getByRole('listbox');
                act(() => listbox.focus());

                await user.keyboard('{Control>}a{/Control}');

                expect(enabledOptionValues).toHaveLength(4);
                enabledOptionValues.forEach((value) => {
                    expect(screen.getByTestId(`listitem-${value}`)).toHaveAttribute('aria-selected', 'false');
                });
            });

            it('Shift+ArrowUp selects the previous option', async () => {
                const user = userEvent.setup();
                renderWithProviders(
                    <Listbox options={options} multiselect defaultValue={['optionB']} focusedValue="optionB" />,
                );

                const listbox = screen.getByRole('listbox');
                act(() => listbox.focus());

                await user.keyboard('{Shift>}{ArrowUp}{/Shift}');

                expect(screen.getByTestId('listitem-optionA')).toHaveAttribute('aria-selected', 'true');
                expect(screen.getByTestId('listitem-optionB')).toHaveAttribute('aria-selected', 'true');
            });

            it('Shift+ArrowDown selects the next option', async () => {
                const user = userEvent.setup();
                renderWithProviders(
                    <Listbox options={options} multiselect defaultValue={['optionB']} focusedValue="optionB" />,
                );

                const listbox = screen.getByRole('listbox');
                act(() => listbox.focus());

                await user.keyboard('{Shift>}{ArrowDown}{/Shift}');

                expect(screen.getByTestId('listitem-optionB')).toHaveAttribute('aria-selected', 'true');
                expect(screen.getByTestId('listitem-optionC')).toHaveAttribute('aria-selected', 'true');
            });

            it('Ctrl+Shift+Home selects all options from the first to the focused option', async () => {
                const user = userEvent.setup();
                renderWithProviders(
                    <Listbox options={options} multiselect defaultValue={['optionC']} focusedValue="optionC" />,
                );

                const listbox = screen.getByRole('listbox');
                act(() => listbox.focus());

                await user.keyboard('{Control>}{Shift>}{Home}{/Shift}{/Control}');

                expect(screen.getByTestId('listitem-optionA')).toHaveAttribute('aria-selected', 'true');
                expect(screen.getByTestId('listitem-optionB')).toHaveAttribute('aria-selected', 'true');
                expect(screen.getByTestId('listitem-optionC')).toHaveAttribute('aria-selected', 'true');
            });

            it('Ctrl+Shift+End selects all options from focused option to the last', async () => {
                const user = userEvent.setup();
                renderWithProviders(
                    <Listbox options={options} multiselect defaultValue={['optionC']} focusedValue="optionC" />,
                );

                const listbox = screen.getByRole('listbox');
                act(() => listbox.focus());

                await user.keyboard('{Control>}{Shift>}{End}{/Shift}{/Control}');

                expect(screen.getByTestId('listitem-optionC')).toHaveAttribute('aria-selected', 'true');
                expect(screen.getByTestId('listitem-optionD')).toHaveAttribute('aria-selected', 'false');
                expect(screen.getByTestId('listitem-optionE')).toHaveAttribute('aria-selected', 'true');
            });
        });
    });

    describe('component is controlled', () => {
        it('selected option is updated when the value prop is changed', () => {
            const { rerender } = renderWithProviders(<Listbox options={options} value="optionA" />);

            rerender(<Listbox options={options} value="optionB" />);

            expect(screen.getByTestId('listitem-optionA')).toHaveAttribute('aria-selected', 'false');
            expect(screen.getByTestId('listitem-optionB')).toHaveAttribute('aria-selected', 'true');
        });

        it('selected option is deselected when the value prop is set to undefined', () => {
            const callback = jest.fn();
            const { rerender } = renderWithProviders(<Listbox options={options} onChange={callback} value="optionA" />);

            rerender(<Listbox options={options} onChange={callback} value={undefined} />);

            expect(screen.getByTestId('listitem-optionA')).toHaveAttribute('aria-selected', 'false');
        });

        it('focused option is updated when the focusedValue prop is changed', () => {
            const { rerender } = renderWithProviders(<Listbox options={options} focusedValue="optionA" />);

            rerender(<Listbox options={options} focusedValue="optionB" />);

            const optionB = screen.getByTestId('listitem-optionB');
            const listbox = screen.getByRole('listbox');
            expect(listbox).toHaveAttribute('aria-activedescendant', optionB.id);
        });

        it('focused option looses focus when the focusedValue prop is set to undefined', () => {
            const callback = jest.fn();
            const { rerender } = renderWithProviders(
                <Listbox options={options} onChange={callback} focusedValue="optionA" />,
            );

            rerender(<Listbox options={options} onChange={callback} focusedValue={undefined} />);

            const listbox = screen.getByRole('listbox');
            expect(listbox).not.toHaveAttribute('aria-activedescendant');
        });

        it('focused option is not automatically selected when the focusedValue prop is changed', () => {
            const { rerender } = renderWithProviders(
                <Listbox options={options} focusedValue="optionA" value="optionA" />,
            );

            rerender(<Listbox options={options} focusedValue="optionB" value="optionA" />);

            const optionA = screen.getByTestId('listitem-optionA');
            const optionB = screen.getByTestId('listitem-optionB');
            const listbox = screen.getByRole('listbox');

            expect(listbox).toHaveAttribute('aria-activedescendant', optionB.id);
            expect(optionA).toHaveAttribute('aria-selected', 'true');
            expect(optionB).toHaveAttribute('aria-selected', 'false');
        });
    });

    describe('onChange callback', () => {
        it('callback is fired when an option is selected', async () => {
            const user = userEvent.setup();
            const callback = jest.fn();
            renderWithProviders(<Listbox options={options} onChange={callback} />);

            await user.click(screen.getByTestId('listitem-optionC'));

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('callback is not fired when setting default values', () => {
            const callback = jest.fn();
            renderWithProviders(<Listbox options={options} onChange={callback} defaultValue="optionA" />);

            expect(callback).toHaveBeenCalledTimes(0);
        });

        it('callback is not fired when the option is already selected', async () => {
            const user = userEvent.setup();
            const callback = jest.fn();
            renderWithProviders(<Listbox options={options} onChange={callback} defaultValue="optionA" />);

            await user.click(screen.getByTestId('listitem-optionA'));

            expect(callback).toHaveBeenCalledTimes(0);
        });

        it('callback is not fired when the value prop is changed', () => {
            const callback = jest.fn();
            const { rerender } = renderWithProviders(<Listbox options={options} onChange={callback} value="optionA" />);

            rerender(<Listbox options={options} onChange={callback} value="optionB" />);

            expect(callback).toHaveBeenCalledTimes(0);
        });

        it('callback received the selected option when fired', async () => {
            const user = userEvent.setup();
            const callback = jest.fn();
            renderWithProviders(<Listbox options={options} onChange={callback} />);

            await user.click(screen.getByTestId('listitem-optionB'));

            expect(callback).toHaveBeenCalledWith(options[1]);
        });

        it('callback received the list of selected options when fired with multiselect', async () => {
            const user = userEvent.setup();
            const callback = jest.fn();
            renderWithProviders(
                <Listbox multiselect options={options} onChange={callback} defaultValue={['optionB']} />,
            );

            await user.click(screen.getByTestId('listitem-optionC'));

            expect(callback).toHaveBeenCalledWith([options[1], options[2]]);
        });
    });

    describe('onFocusChange callback', () => {
        it('callback is fired when an option is focused', async () => {
            const user = userEvent.setup();
            const callback = jest.fn();
            renderWithProviders(<Listbox options={options} onFocusChange={callback} />);

            const listbox = screen.getByRole('listbox');
            act(() => listbox.focus());
            await user.keyboard('{ArrowDown}');

            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('callback is not fired when the option is already focused', async () => {
            const user = userEvent.setup();
            const callback = jest.fn();
            renderWithProviders(<Listbox options={options} onFocusChange={callback} focusedValue="optionA" />);

            await user.click(screen.getByTestId('listitem-optionA'));

            expect(callback).toHaveBeenCalledTimes(0);
        });

        it('callback is not fired when the focusedValue prop is changed', () => {
            const callback = jest.fn();
            const { rerender } = renderWithProviders(
                <Listbox options={options} onFocusChange={callback} focusedValue="optionA" />,
            );

            rerender(<Listbox options={options} onFocusChange={callback} focusedValue="optionB" />);

            expect(callback).toHaveBeenCalledTimes(0);
        });

        it('callback receives the focused option when fired', async () => {
            const user = userEvent.setup();
            const callback = jest.fn();
            renderWithProviders(<Listbox options={options} onFocusChange={callback} focusedValue="optionA" />);

            const listbox = screen.getByRole('listbox');
            act(() => listbox.focus());
            await user.keyboard('{ArrowDown}');

            expect(callback).toHaveBeenCalledWith(options[1]);
        });
    });

    describe('onOptionClick callback', () => {
        it('calls callback when an option is clicked', async () => {
            const user = userEvent.setup();
            const callback = jest.fn();
            renderWithProviders(<Listbox options={options} onOptionClick={callback} />);

            await user.click(screen.getByTestId('listitem-optionB'));

            expect(callback).toHaveBeenCalledWith(options[1]);
        });
    });

    describe('onKeyDown callback', () => {
        it('calls callback when a key is pressed', async () => {
            const user = userEvent.setup();
            const callback = jest.fn();
            renderWithProviders(<Listbox options={options} onKeyDown={callback} />);

            const listbox = screen.getByRole('listbox');
            act(() => listbox.focus());
            await user.keyboard('a');

            expect(callback).toHaveBeenCalledTimes(1);
        });
    });

    describe('rendering options', () => {
        it('should display values in valueOnFirstDisplay at the top', () => {
            renderWithProviders(<Listbox options={options} valueOnFirstDisplay={['optionC', 'optionE']} />);

            const listOptions = screen.getAllByRole('option');
            expect(listOptions[0]).toHaveTextContent('Option C');
            expect(listOptions[1]).toHaveTextContent('Option E');
            expect(listOptions[2]).toHaveTextContent('Option A');
            expect(listOptions[3]).toHaveTextContent('Option B');
            expect(listOptions[4]).toHaveTextContent('Option D');
        });

        it('should display a separator between top and bottom items', () => {
            renderWithProviders(<Listbox options={options} valueOnFirstDisplay={['optionC']} />);

            const list = screen.getByTestId('listbox-list');
            expect(list.children[0]).toHaveTextContent('Option C');
            expect(list.children[1]).toHaveRole('separator');
            expect(list.children[2]).toHaveTextContent('Option A');
        });

        it('does not display a divider when valueOnFirstDisplay is empty', async () => {
            renderWithProviders(<Listbox options={options} valueOnFirstDisplay={[]} />);

            expect(screen.queryByRole('separator')).not.toBeInTheDocument();
        });

        it('does not display a divider when valueOnFirstDisplay contains all values', () => {
            const allValues = options.map((o) => o.value);
            renderWithProviders(<Listbox options={options} valueOnFirstDisplay={allValues} />);

            expect(screen.queryByRole('separator')).not.toBeInTheDocument();
        });

        it('displays options on top in the same order as valueOnFirstDisplay', () => {
            renderWithProviders(
                <Listbox options={options} valueOnFirstDisplay={['optionC', 'optionB']} />,
            );

            const listOptions = screen.getAllByRole('option');
            expect(listOptions[0]).toHaveTextContent('Option C');
            expect(listOptions[1]).toHaveTextContent('Option B');
            expect(listOptions[2]).toHaveTextContent('Option A');
        });

        it('ignores values in valueOnFirstDisplay that are not in options', () => {
            renderWithProviders(
                <Listbox options={options} valueOnFirstDisplay={['optionZ', 'optionC']} />,
            );

            const listOptions = screen.getAllByRole('option');
            expect(listOptions[0]).toHaveTextContent('Option C');
            expect(listOptions[1]).toHaveTextContent('Option A');
        });
    });

    it('sets aria-labelledby attribute', () => {
        renderWithProviders(<Listbox options={options} ariaLabelledBy="label-id" />);

        expect(screen.getByRole('listbox')).toHaveAttribute('aria-labelledby', 'label-id');
    });

    it('uses provided id', () => {
        renderWithProviders(<Listbox options={options} id="my-listbox" />);

        expect(screen.getByRole('listbox')).toHaveAttribute('id', 'my-listbox');
    });

    it('applies custom className', () => {
        renderWithProviders(<Listbox options={options} className="custom-class" />);

        expect(screen.getByTestId('listbox-container')).toHaveClass('custom-class');
    });

    it('sets tabIndex to -1 when focusable is false', () => {
        renderWithProviders(<Listbox options={options} focusable={false} />);

        expect(screen.getByRole('listbox')).toHaveAttribute('tabindex', '-1');
    });

    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(
            <Listbox options={options} defaultValue="optionB" />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot (multiselect)', () => {
        const { asFragment } = renderWithProviders(
            <Listbox options={options} defaultValue={['optionA', 'optionC']} multiselect />,
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
