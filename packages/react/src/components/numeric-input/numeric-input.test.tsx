import { shallow } from 'enzyme';
import { NumericInput } from './numeric-input';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';

describe('NumericInput', () => {
    test('matches the snapshot (Normal - Adornment at start)', () => {
        const tree = renderWithTheme(<NumericInput adornment="%" value="50" />);

        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot (Normal - Adornment at end)', () => {
        const tree = renderWithTheme(<NumericInput adornment="%" adornmentPosition='end' value="50" />);

        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot (Disabled)', () => {
        const tree = renderWithTheme(<NumericInput adornment="%" value="50" disabled />);

        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot (Invalid)', () => {
        const tree = renderWithTheme(
            <NumericInput value="50" adornment="%" validationErrorMessage="This is an error message" invalid />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('should call onChange with returned oject', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <NumericInput onChange={onChange} />,
        );

        const event = { target: { value: '123.50' } };
        getByTestId(wrapper, 'numeric-input').invoke('onChange')(event);

        expect(onChange).toHaveBeenCalledWith(event, { value: '123.50', valueAsNumber: 123.5 });
    });

    test('should call onBlur with returned oject', () => {
        const onBlur = jest.fn();
        const wrapper = shallow(
            <NumericInput onBlur={onBlur} />,
        );

        const event = { target: { value: '123.50' } };
        getByTestId(wrapper, 'numeric-input').invoke('onBlur')(event);

        expect(onBlur).toHaveBeenCalledWith(event, { value: '123.50', valueAsNumber: 123.5 });
    });

    test('should call onChange with return value null when empty', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <NumericInput onChange={onChange} />,
        );

        const event = { target: { value: '' } };
        getByTestId(wrapper, 'numeric-input').invoke('onChange')(event);

        expect(onChange).toHaveBeenCalledWith(event, { value: '', valueAsNumber: null });
    });

    test('has controllable value', () => {
        const wrapper = shallow(<NumericInput value="500.25" />);

        expect(getByTestId(wrapper, 'numeric-input').prop('value')).toBe('500.25');
    });

    test('should not accept invalid value', () => {
        jest.spyOn(console, 'warn').mockImplementation(() => { });

        const wrapper = shallow(<NumericInput value="test" />);

        expect(getByTestId(wrapper, 'numeric-input').prop('value')).toBe('');
    });

    test('should display error message on invalid value', () => {
        const wrapper = mountWithTheme(<NumericInput value="2" min={100} />);
        // eslint-disable-next-line no-console
        expect(getByTestId(wrapper, 'invalid-error-message').exists()).toBe(true);
    });

    test('should display error message on invalid defaultValue', () => {
        const wrapper = mountWithTheme(<NumericInput defaultValue="2" min={100} />);
        expect(getByTestId(wrapper, 'invalid-error-message').exists()).toBe(true);
    });

    test('should not have error message on required when value is empty', () => {
        const wrapper = mountWithTheme(<NumericInput value="" required />);
        // eslint-disable-next-line no-console
        expect(getByTestId(wrapper, 'invalid-error-message').exists()).toBe(false);
    });

    test('should not have error message on required when defaultValue is empty', () => {
        const wrapper = mountWithTheme(<NumericInput defaultValue="" required />);
        expect(getByTestId(wrapper, 'invalid-error-message').exists()).toBe(false);
    });
});
