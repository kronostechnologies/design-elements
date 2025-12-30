import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavList } from './nav-list';
import { NavListOption } from './nav-list-option';
import { renderWithProviders } from '../../test-utils/renderer';

const options: NavListOption[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testA',
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testB',
    },
    {
        label: 'Option C',
        value: 'optionC',
        href: '/testC',
    },
    {
        label: 'Option D',
        value: 'optionD',
        href: '/testD',
    },
];
const optionsDisabled: NavListOption[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testA',
        disabled: true,
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testB',
        disabled: true,
    },
];
describe('NavList', () => {
    it('Calls onChange callback when an option is clicked', async () => {
        const callback = jest.fn();
        renderWithProviders(<NavList options={options} onChange={callback} />);

        await userEvent.click(screen.getByTestId('listitem-optionC-link'));

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('does not call onChange callback when a disabled option is clicked', async () => {
        const callback = jest.fn();
        renderWithProviders(<NavList options={optionsDisabled} onChange={callback} />);

        await expect(userEvent.click(screen.getByTestId('listitem-optionA-link'))).rejects
            .toThrow(/pointer-events: none/);
        expect(callback).toHaveBeenCalledTimes(0);
    });

    it('calls onChange callback when enter key is pressed on option', async () => {
        const callback = jest.fn();
        renderWithProviders(<NavList options={options} onChange={callback} />);

        const option = screen.getByTestId('listitem-optionC-link');
        option.focus();
        await userEvent.keyboard('{Enter}');

        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('calls onKeyDown callback when a key is pressed on option', async () => {
        const callback = jest.fn();
        renderWithProviders(<NavList options={options} onKeyDown={callback} />);

        const option = screen.getByTestId('listitem-optionA-link');
        option.focus();
        await userEvent.keyboard('a');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should update focused value when focusedValue prop changes', () => {
        const { rerender } = renderWithProviders(<NavList options={options} />);

        rerender(<NavList focusedValue="optionB" options={options} />);

        const optionB = screen.getByTestId('listitem-optionB-link');
        expect(optionB).toHaveFocus();
    });

    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(<NavList options={options} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
