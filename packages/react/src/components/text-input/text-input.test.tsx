import { ReactWrapper, shallow } from 'enzyme';
import { ChangeEventHandler } from 'react';
import { doNothing } from '../../test-utils/callbacks';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';
import { TextInput } from './text-input';

jest.mock('../../utils/uuid');

describe('TextInput', () => {
    const initialProps = {
        label: 'See console for callbacks',
        placeholder: 'Ex.: Hello',
        required: true,
        validationErrorMessage: 'This field is required',
        defaultValue: 'foo',
        type: 'tel',
        pattern: '[0-9]{3}-?[0-9]{3}-?[0-9]{4}',

    };

    function setup(callback: ChangeEventHandler = doNothing): ReactWrapper {
        const props = { ...initialProps };
        return mountWithTheme(
            <TextInput
                {...props}
                onChange={callback}
                onBlur={callback}
                onFocus={callback}
            />,
        );
    }

    test('can override data-testid on input', () => {
        const aCustomTestId = 'my-test-id';
        const aValue = 'a value';
        const wrapper = shallow(<TextInput label="test" name="test" value={aValue} data-testid={aCustomTestId} />);

        const inputWrapper = getByTestId(wrapper, aCustomTestId);
        expect(inputWrapper.prop('value')).toBe(aValue);
    });

    test('input has name property when name prop is set on TextInput', () => {
        const wrapper = mountWithTheme(<TextInput label="test" name="test" />);

        expect(wrapper.find('input').prop('name')).toBe('test');
    });

    test('should be valid by default', () => {
        const wrapper = shallow(<TextInput {...initialProps} />);

        const container = getByTestId(wrapper, 'field-container');
        expect(container.prop('valid')).toBe(true);
    });

    test('should set as invalid when invalid event is triggered', () => {
        const wrapper = shallow(<TextInput {...initialProps} />);

        getByTestId(wrapper, 'text-input').simulate('invalid');

        const container = getByTestId(wrapper, 'field-container');
        expect(container.prop('valid')).toBe(false);
    });

    test('onChange callback is called when content is changed', () => {
        const callback = jest.fn();
        const wrapper = setup(callback);

        wrapper.find('input').simulate('change', { target: { value: 'bar' } });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onChange callback can\'t be called when input disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <TextInput
                {...initialProps}
                onFocus={callback}
                disabled
            />,
        );

        wrapper.find('input').simulate('change');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('onBlur callback is called when content is blurred', () => {
        const callback = jest.fn();
        const wrapper = setup(callback);

        wrapper.find('input').simulate('blur');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onBlur callback cannot be called when input disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <TextInput
                {...initialProps}
                onFocus={callback}
                disabled
            />,
        );

        wrapper.find('input').simulate('blur');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('onFocus callback is called when content is focused', () => {
        const callback = jest.fn();
        const wrapper = setup(callback);

        wrapper.find('input').simulate('focus');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <TextInput
                label="Telephone"
                pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                placeholder="Ex.: 555-123-4567"
                type="tel"
                validationErrorMessage="Please enter a valid phone number"
                defaultValue="foo"
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot [disabled = true]', () => {
        const tree = renderWithTheme(
            <TextInput
                label="Telephone"
                pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                placeholder="Ex.: 555-123-4567"
                type="tel"
                validationErrorMessage="Please enter a valid phone number"
                defaultValue="foo"
                disabled
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot [required = true]', () => {
        const tree = renderWithTheme(
            <TextInput
                label="Telephone"
                pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                placeholder="Ex.: 555-123-4567"
                type="tel"
                validationErrorMessage="Please enter a valid phone number"
                defaultValue="foo"
                required
            />,
        );

        expect(tree).toMatchSnapshot();
    });
});
