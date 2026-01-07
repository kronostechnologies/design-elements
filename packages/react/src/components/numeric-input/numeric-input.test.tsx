import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { NumericInput } from './numeric-input';

describe('NumericInput', () => {
    it('matches the snapshot (Normal - Adornment at start)', () => {
        const { asFragment } = renderWithProviders(<NumericInput adornment="%" value="50" />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot (Normal - Adornment at end)', () => {
        const { asFragment } = renderWithProviders(<NumericInput adornment="%" adornmentPosition="end" value="50" />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot (Disabled)', () => {
        const { asFragment } = renderWithProviders(<NumericInput adornment="%" value="50" disabled />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot (Invalid)', () => {
        const { asFragment } = renderWithProviders(
            <NumericInput value="50" adornment="%" validationErrorMessage="This is an error message" invalid />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('should call onChange with returned object', async () => {
        const onChange = jest.fn();
        renderWithProviders(<NumericInput onChange={onChange} />);

        const input = screen.getByRole('textbox');
        await userEvent.type(input, '123.50');

        expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: '123.50', valueAsNumber: 123.5 });
    });

    it('should call onBlur with returned object', async () => {
        const onBlur = jest.fn();
        renderWithProviders(<NumericInput onBlur={onBlur} />);

        const input = screen.getByRole('textbox');
        await userEvent.type(input, '123.50');
        await userEvent.tab();

        expect(onBlur).toHaveBeenCalledWith(expect.anything(), { value: '123.50', valueAsNumber: 123.5 });
    });

    it('should call onChange with return value null when empty', async () => {
        const onChange = jest.fn();
        renderWithProviders(<NumericInput onChange={onChange} />);

        const input = screen.getByRole('textbox');
        await userEvent.type(input, '1');
        await userEvent.clear(input);

        expect(onChange).toHaveBeenLastCalledWith(expect.anything(), { value: '', valueAsNumber: null });
    });

    it('has controllable value', () => {
        renderWithProviders(<NumericInput value="500.25" />);

        expect(screen.getByRole('textbox')).toHaveValue('500.25');
    });

    it('should not accept invalid value', () => {
        jest.spyOn(console, 'warn').mockImplementation(() => { });

        renderWithProviders(<NumericInput value="test" />);

        expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('should display error message on invalid value', () => {
        renderWithProviders(<NumericInput value="2" min={100} />);

        expect(screen.getByTestId('invalid-field')).toBeInTheDocument();
    });

    it('should display error message on invalid defaultValue', () => {
        renderWithProviders(<NumericInput defaultValue="2" min={100} />);

        expect(screen.getByTestId('invalid-field')).toBeInTheDocument();
    });

    it('should not have error message on required when value is empty', () => {
        renderWithProviders(<NumericInput value="" required />);

        expect(screen.queryByTestId('invalid-field')).not.toBeInTheDocument();
    });

    it('should not have error message on required when defaultValue is empty', () => {
        renderWithProviders(<NumericInput defaultValue="" required />);

        expect(screen.queryByTestId('invalid-field')).not.toBeInTheDocument();
    });
});
