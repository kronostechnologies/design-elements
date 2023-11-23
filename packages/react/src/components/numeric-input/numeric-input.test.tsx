import { shallow } from 'enzyme';
import { NumericInput } from './numeric-input';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithTheme } from '../../test-utils/renderer';

jest.mock('../../utils/uuid');

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

    it('should call onChange with return value as number', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <NumericInput onChange={onChange} />,
        );

        const event = { target: { value: '123.50' } };
        getByTestId(wrapper, 'numeric-input').invoke('onChange')(event);

        expect(onChange).toHaveBeenCalledWith(event, 123.5);
    });

    it('should call onBlur with return value as number', () => {
        const onBlur = jest.fn();
        const wrapper = shallow(
            <NumericInput onBlur={onBlur} />,
        );

        const event = { target: { value: '123.50' } };
        getByTestId(wrapper, 'numeric-input').invoke('onBlur')(event);

        expect(onBlur).toHaveBeenCalledWith(event, 123.5);
    });

    it('should call onChange with return value null when empty', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <NumericInput onChange={onChange} />,
        );

        const event = { target: { value: '' } };
        getByTestId(wrapper, 'numeric-input').invoke('onChange')(event);

        expect(onChange).toHaveBeenCalledWith(event, null);
    });

    test('has controllable value', () => {
        const wrapper = shallow(<NumericInput value="500.25" />);

        expect(getByTestId(wrapper, 'numeric-input').prop('value')).toBe('500.25');
    });
});
