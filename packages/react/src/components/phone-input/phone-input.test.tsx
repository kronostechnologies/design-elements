import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { mountWithTheme } from '@design-elements/test-utils/renderer';
import React from 'react';
import { shallow } from 'enzyme';

import { PhoneInput } from './phone-input';

describe('Phone Input', () => {
    it('should format number given a default value', () => {
        const wrapper = mountWithTheme(<PhoneInput defaultValue="555-555-5555" />);

        const textInputWrapper = getByTestId(wrapper, 'text-input');

        expect(textInputWrapper.getDOMNode<HTMLInputElement>().value).toBe("(555) 555-5555");
    });

    it('should display a hint given one', () => {
        const expectedHint = 'aHint';
        const wrapper = mountWithTheme(<PhoneInput hint={expectedHint} />);

        const textInputHintWrapper = getByTestId(wrapper, 'text-input-hint');

        expect(textInputHintWrapper.prop('children')).toBe(expectedHint);
    });

    it('should display a label given one', () => {
        const expectedLabel = 'aLabel';
        const wrapper = mountWithTheme(<PhoneInput label={expectedLabel} />);

        const textInputLabelWrapper = getByTestId(wrapper, 'text-input-label');

        expect(textInputLabelWrapper.prop('children')).toBe(expectedLabel);
    });

    it('should display an error message when input is incomplete but required', () => {
        const expectedErrorMessage = 'This field is required';
        const wrapper = mountWithTheme(<PhoneInput validationErrorMessage={expectedErrorMessage} required />);
        getByTestId(wrapper, 'text-input').simulate('click');
        getByTestId(wrapper, 'text-input').simulate('blur');

        const textInputErrorMessageWrapper = getByTestId(wrapper, 'text-input-error-msg');

        expect(textInputErrorMessageWrapper.prop('feedbackMsg')).toBe(expectedErrorMessage);
    });

    it('input should be disabled given a disabled component', () => {
        const wrapper = mountWithTheme(<PhoneInput disabled />);

        const textInputWrapper = getByTestId(wrapper, 'text-input');

        expect(textInputWrapper.getDOMNode<HTMLInputElement>().disabled).toBe(true);
    });

    test('onChange callback is called when content is changed', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<PhoneInput onChange={callback} />);

        wrapper.find('input').simulate('change', { target: { value: 'bar' } });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onChange callback can\'t be called when input disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<PhoneInput onChange={callback} disabled />);

        wrapper.find('input').simulate('change');
        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('onBlur callback is called when content is blurred', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<PhoneInput onBlur={callback} />);

        wrapper.find('input').simulate('blur');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onFocus callback is called when content is focused', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<PhoneInput onFocus={callback} />);

        wrapper.find('input').simulate('focus');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = shallow(<PhoneInput hint="Hint" label="Label" defaultValue="555-555-5555" />);

        expect(tree).toMatchSnapshot();
    });
});
