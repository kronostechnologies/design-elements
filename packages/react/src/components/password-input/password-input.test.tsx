import { shallow } from 'enzyme';
import { PasswordInput } from './password-input';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithTheme } from '../../test-utils/renderer';

jest.mock('../../utils/uuid');

describe('PasswordInput', () => {
    test('matches the snapshot (Normal)', () => {
        const tree = renderWithTheme(<PasswordInput value="Pass123" />);

        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot (Disabled)', () => {
        const tree = renderWithTheme(<PasswordInput value="Pass123" disabled />);

        expect(tree).toMatchSnapshot();
    });

    test('matches the snapshot (Invalid)', () => {
        const tree = renderWithTheme(
            <PasswordInput value="Pass123" validationErrorMessage="This is an error message" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has controllable data-test-id', () => {
        const wrapper = shallow(<PasswordInput data-testid="a-password-input" />);

        expect(getByTestId(wrapper, 'a-password-input').exists()).toBe(true);
    });

    test('has controllable value', () => {
        const wrapper = shallow(<PasswordInput data-testid="a-password-input" value="Pass123" />);

        expect(getByTestId(wrapper, 'a-password-input').prop('value')).toBe('Pass123');
    });

    test('sets password type to password when not showing password', () => {
        const onChange = jest.fn();
        const wrapper = shallow(<PasswordInput onChange={onChange} />);

        expect(getByTestId(wrapper, 'password-input').prop('type')).toBe('password');
    });

    test('sets password type to text when show password button is clicked', () => {
        const onChange = jest.fn();
        const wrapper = shallow(<PasswordInput onChange={onChange} />);

        getByTestId(wrapper, 'show-password-button').simulate('click');

        expect(getByTestId(wrapper, 'password-input').prop('type')).toBe('text');
    });
});
