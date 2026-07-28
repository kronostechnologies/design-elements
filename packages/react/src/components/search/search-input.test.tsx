import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { SearchInput } from './search-input';

describe('SearchInput', () => {
    describe('icon', () => {
        it('should display icon when hasIcon is true', () => {
            renderWithProviders(<SearchInput hasIcon />);

            expect(screen.getByTestId('search-icon')).toBeInTheDocument();
        });

        it('should not display icon when hasIcon is false', () => {
            renderWithProviders(<SearchInput hasIcon={false} />);

            expect(screen.queryByTestId('search-icon')).not.toBeInTheDocument();
        });
    });

    describe('button', () => {
        it('should display button when hasButton is true', () => {
            renderWithProviders(<SearchInput hasButton />);

            expect(screen.getByTestId('search-button')).toBeInTheDocument();
        });

        it('should call onSearch when button is clicked', async () => {
            const onSearch = jest.fn();
            renderWithProviders(<SearchInput hasButton onSearch={onSearch} />);

            await userEvent.click(screen.getByTestId('search-button'));

            expect(onSearch).toHaveBeenCalledTimes(1);
        });

        it('should not display button when hasButton is false', () => {
            renderWithProviders(<SearchInput hasButton={false} />);

            expect(screen.queryByTestId('search-button')).not.toBeInTheDocument();
        });
    });

    describe('reset', () => {
        it('should display reset when onReset and value are provided', () => {
            renderWithProviders(<SearchInput onReset={jest.fn()} value="test" />);

            expect(screen.getByTestId('search-reset')).toBeInTheDocument();
        });

        it('should call onReset when reset is clicked', async () => {
            const onReset = jest.fn();
            renderWithProviders(<SearchInput onReset={onReset} value="test" />);

            await userEvent.click(screen.getByTestId('search-reset'));

            expect(onReset).toHaveBeenCalledTimes(1);
        });

        it('should not display reset when onReset is not provided', () => {
            renderWithProviders(<SearchInput />);

            expect(screen.queryByTestId('search-reset')).not.toBeInTheDocument();
        });

        it('should not display reset when onReset is provided but not value', () => {
            renderWithProviders(<SearchInput onReset={jest.fn()} />);

            expect(screen.queryByTestId('search-reset')).not.toBeInTheDocument();
        });
    });

    describe('Input', () => {
        it('should trigger search when Enter key is pressed', async () => {
            const onSearch = jest.fn();
            renderWithProviders(<SearchInput onSearch={onSearch} />);

            await userEvent.type(screen.getByTestId('search-input'), '{Enter}');

            expect(onSearch).toHaveBeenCalledTimes(1);
        });

        it('should call onChange when input changes', async () => {
            const onChange = jest.fn();
            const newValue = 'a new value';
            renderWithProviders(<SearchInput onChange={onChange} />);

            await userEvent.type(screen.getByTestId('search-input'), newValue);

            expect(onChange).toHaveBeenCalled();
            expect(onChange).toHaveBeenLastCalledWith(newValue, expect.anything());
        });

        it('should display defaultValue', () => {
            const defaultValue = 'a value';
            renderWithProviders(<SearchInput defaultValue={defaultValue} />);

            expect(screen.getByTestId('search-input')).toHaveValue(defaultValue);
        });

        it('should display value', () => {
            const value = 'a value';
            renderWithProviders(<SearchInput value={value} onChange={jest.fn()} />);

            expect(screen.getByTestId('search-input')).toHaveValue(value);
        });

        it('should call onFocus when input is clicked', async () => {
            const onInputFocus = jest.fn();
            renderWithProviders(<SearchInput onInputFocus={onInputFocus} />);

            await userEvent.click(screen.getByTestId('search-input'));

            expect(onInputFocus).toHaveBeenCalledTimes(1);
        });
    });

    it('should match the snapshot', () => {
        const { container } = renderWithProviders(
            <SearchInput
                onSearch={jest.fn()}
                onReset={jest.fn()}
                onChange={jest.fn()}
                value="a value"
                label="Search"
                placeholder="a placeholder"
                id="search-input"
                disabled
                hasButton
                hasIcon
            />,
        );

        expect(container).toMatchSnapshot();
    });
});
