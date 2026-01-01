import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { SearchContextual } from './search-contextual';

describe('SearchContextual', () => {
    it('should call onReset when search resets', async () => {
        const onReset = jest.fn();
        renderWithProviders(<SearchContextual onReset={onReset} value="test" />);

        await userEvent.click(screen.getByTestId('search-reset'));

        expect(onReset).toHaveBeenCalledTimes(1);
    });

    it('should call onChange when search changes', async () => {
        const onChange = jest.fn();
        renderWithProviders(<SearchContextual onChange={onChange} />);

        const input = screen.getByTestId('search-input');
        await userEvent.type(input, 't');

        expect(onChange).toHaveBeenCalledWith('t', expect.anything());
    });

    it('should call onSearch when search', async () => {
        const onSearch = jest.fn();
        renderWithProviders(<SearchContextual onSearch={onSearch} />);

        const input = screen.getByTestId('search-input');
        await userEvent.type(input, 'test{enter}');

        expect(onSearch).toHaveBeenCalledWith('test');
    });

    it('matches the snapshot when disabled', () => {
        const { container } = renderWithProviders(
            <SearchContextual
                label="Search"
                disabled
                onChange={jest.fn()}
                onReset={jest.fn()}
                onSearch={jest.fn()}
            />,
        );

        expect(container).toMatchSnapshot();
    });

    it('matches the snapshot when enabled', () => {
        const { container } = renderWithProviders(
            <SearchContextual
                label="Search"
                onChange={jest.fn()}
                onReset={jest.fn()}
                onSearch={jest.fn()}
            />,
        );

        expect(container).toMatchSnapshot();
    });
});
