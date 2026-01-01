import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { SearchGlobal } from './search-global';

describe('SearchGlobal', () => {
    it('should call onReset when search resets', async () => {
        const onReset = jest.fn();
        renderWithProviders(<SearchGlobal onReset={onReset} value="test" />);

        await userEvent.click(screen.getByTestId('search-reset'));

        expect(onReset).toHaveBeenCalledTimes(1);
    });

    it('should call onChange when search changes', async () => {
        const onChange = jest.fn();
        renderWithProviders(<SearchGlobal onChange={onChange} />);

        const input = screen.getByTestId('search-input');
        await userEvent.type(input, 'a');

        expect(onChange).toHaveBeenCalledWith('a', expect.anything());
    });

    it('should call onSearch when search', async () => {
        const onSearch = jest.fn();
        renderWithProviders(<SearchGlobal onSearch={onSearch} />);

        const input = screen.getByTestId('search-input');
        await userEvent.type(input, 'test');
        await userEvent.click(screen.getByTestId('search-button'));

        expect(onSearch).toHaveBeenCalledWith('test');
    });

    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(
            <SearchGlobal defaultValue="foo" label="Search" onSearch={jest.fn()} />,
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
