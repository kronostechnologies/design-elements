import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../theme-wrapper/theme-wrapper.test';
import { TextArea } from './text-area';
jest.mock('uuid/v4');

describe('TextArea', () => {
    const defaultProps = {
        defaultValue: 'foo',
        label: 'Comment',
        placeholder: 'Enter your comment',
        required: true,
        validationErrorMessage: 'Error message',
    };
    test('onChange callback is called when content is changed', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<TextArea onChange={callback} {...defaultProps} />),
        );

        wrapper.find('textarea').simulate('change', { target: { value: 'bar' } });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onBlur callback is called when content is blurred', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<TextArea onBlur={callback} {...defaultProps} />),
        );

        wrapper.find('textarea').simulate('blur');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onFocus callback is called when content is focused', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<TextArea onFocus={callback} {...defaultProps} />),
        );

        wrapper.find('textarea').simulate('focus');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onFocus callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<TextArea onBlur={callback} {...defaultProps} disabled />),
        );

        wrapper.find('textarea').simulate('focus');
        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(<TextArea onChange={() => {}}  onBlur={() => {}} {...defaultProps} />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Is disabled', () => {
        const tree = renderer.create(
            ThemeWrapped(<TextArea onChange={() => {}}  onBlur={() => {}} {...defaultProps} disabled />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
