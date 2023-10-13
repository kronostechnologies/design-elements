import { shallow } from 'enzyme';
import { NumericInput } from './numeric-input';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';

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
            <NumericInput value="50" valid={false} adornment="%" validationErrorMessage="This is an error message" />,
        );

        expect(tree).toMatchSnapshot();
    });

    it('should call onChange with return value as number', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <NumericInput onChange={onChange} />,
        );

        getByTestId(wrapper, 'numeric-input').invoke('onChange')({ target: { value: '123' } });

        expect(onChange).toHaveBeenCalledWith(123);
    });

    it('should call onChange with return value null when empty', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <NumericInput onChange={onChange} />,
        );

        getByTestId(wrapper, 'numeric-input').invoke('onChange')({ target: { value: '' } });

        expect(onChange).toHaveBeenCalledWith(null);
    });

    it('should change value to the maximum on Home key', () => {
        const event = { key: 'Home', preventDefault: jest.fn() };
        const wrapper = mountWithTheme(
            <NumericInput min={10} max={90} defaultValue={50} />,
        );

        getByTestId(wrapper, 'numeric-input').invoke('onKeyDown')(event);

        expect((getByTestId(wrapper, 'numeric-input').getDOMNode() as HTMLInputElement).value).toBe('90');
    });

    it('should change value to the minimum on End key', () => {
        const event = { key: 'End', preventDefault: jest.fn() };
        const wrapper = mountWithTheme(
            <NumericInput min={10} max={90} defaultValue={50} />,
        );

        getByTestId(wrapper, 'numeric-input').invoke('onKeyDown')(event);

        expect((getByTestId(wrapper, 'numeric-input').getDOMNode() as HTMLInputElement).value).toBe('10');
    });

    test('has controllable value', () => {
        const wrapper = shallow(<NumericInput value="500.25" />);

        expect(getByTestId(wrapper, 'numeric-input').prop('value')).toBe('500.25');
    });
});
