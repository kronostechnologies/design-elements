import { ReactWrapper, shallow } from 'enzyme';
import { ChangeEventHandler } from 'react';
import { Icon } from '~/components/icon/icon';
import { TextInput } from '~/components/text-input/text-input';
import { doNothing } from '../../test-utils/callbacks';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';

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

    it('can override data-testid on input', () => {
        const aCustomTestId = 'my-test-id';
        const aValue = 'a value';
        const wrapper = shallow(<TextInput label="test" name="test" value={aValue} data-testid={aCustomTestId} />);

        const inputWrapper = getByTestId(wrapper, aCustomTestId);
        expect(inputWrapper.prop('value')).toBe(aValue);
    });

    it('input has name property when name prop is set on TextInput', () => {
        const wrapper = mountWithTheme(<TextInput label="test" name="test" />);

        expect(wrapper.find('input').prop('name')).toBe('test');
    });

    it('should be valid by default', () => {
        const wrapper = shallow(<TextInput {...initialProps} />);

        const container = getByTestId(wrapper, 'field-container');
        expect(container.prop('valid')).toBe(true);
    });

    it('should set as invalid when invalid event is triggered', () => {
        const wrapper = shallow(<TextInput {...initialProps} />);

        getByTestId(wrapper, 'text-input').simulate('invalid');

        const container = getByTestId(wrapper, 'field-container');
        expect(container.prop('valid')).toBe(false);
    });

    it('should set as invalid when valid prop is false', () => {
        const wrapper = shallow(<TextInput valid={false} />);

        const container = getByTestId(wrapper, 'field-container');
        expect(container.prop('valid')).toBe(false);
    });

    it('should set as valid when valid prop is true', () => {
        const wrapper = shallow(<TextInput valid />);

        const container = getByTestId(wrapper, 'field-container');
        expect(container.prop('valid')).toBe(true);
    });

    it('should set as invalid when valid prop is false and input trigger blur with checkValidity is true', () => {
        const wrapper = shallow(<TextInput valid={false} />);

        const textInput = getByTestId(wrapper, 'text-input');
        textInput.simulate('blur', { currentTarget: { checkValidity: () => true } });
        const container = getByTestId(wrapper, 'field-container');

        expect(container.prop('valid')).toBe(false);
    });

    it('should set as valid when valid prop is true and input trigger blur with checkValidity is true', () => {
        const wrapper = shallow(<TextInput valid />);

        const textInput = getByTestId(wrapper, 'text-input');
        textInput.simulate('blur', { currentTarget: { checkValidity: () => true } });
        const container = getByTestId(wrapper, 'field-container');

        expect(container.prop('valid')).toBe(true);
    });

    it('should set as valid when valid prop is true and input trigger blur with checkValidity is false', () => {
        const wrapper = shallow(<TextInput valid />);

        const textInput = getByTestId(wrapper, 'text-input');
        textInput.simulate('blur', { currentTarget: { checkValidity: () => false } });
        const container = getByTestId(wrapper, 'field-container');

        expect(container.prop('valid')).toBe(true);
    });

    it('should set as invalid when valid prop is false and input trigger blur with checkValidity is false', () => {
        const wrapper = shallow(<TextInput valid={false} />);

        const textInput = getByTestId(wrapper, 'text-input');
        textInput.simulate('blur', { currentTarget: { checkValidity: () => false } });
        const container = getByTestId(wrapper, 'field-container');

        expect(container.prop('valid')).toBe(false);
    });

    it('onChange callback is called when content is changed', () => {
        const callback = jest.fn();
        const wrapper = setup(callback);

        wrapper.find('input').simulate('change', { target: { value: 'bar' } });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onChange callback can\'t be called when input disabled', () => {
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

    it('onBlur callback is called when content is blurred', () => {
        const callback = jest.fn();
        const wrapper = setup(callback);

        wrapper.find('input').simulate('blur');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onBlur callback cannot be called when input disabled', () => {
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

    it('onFocus callback is called when content is focused', () => {
        const callback = jest.fn();
        const wrapper = setup(callback);

        wrapper.find('input').simulate('focus');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('Matches the snapshot', () => {
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

    it('Matches the snapshot adornment text', () => {
        const tree = renderWithTheme(
            <TextInput
                label="Telephone"
                pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                placeholder="Ex.: 555-123-4567"
                type="tel"
                validationErrorMessage="Please enter a valid phone number"
                defaultValue="foo"
                leftAdornment='#'
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    it('Matches the snapshot adornment icon', () => {
        const tree = renderWithTheme(
            <TextInput
                label="Telephone"
                pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                placeholder="Ex.: 555-123-4567"
                type="tel"
                validationErrorMessage="Please enter a valid phone number"
                defaultValue="foo"
                leftAdornment={<Icon name='phone' />}
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    it('matches the snapshot (Normal - Adornment at end)', () => {
        const tree = renderWithTheme(
            <TextInput
                label="Telephone"
                pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                placeholder="Ex.: 555-123-4567"
                type="tel"
                validationErrorMessage="Please enter a valid phone number"
                defaultValue="foo"
                leftAdornment='#'
                rightAdornment='end'
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    it('Matches the snapshot [disabled = true]', () => {
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

    it('Matches the snapshot [required = true]', () => {
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
