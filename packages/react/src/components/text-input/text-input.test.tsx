import { mount, ReactWrapper } from 'enzyme';
import React, { ChangeEventHandler } from 'react';
import renderer from 'react-test-renderer';
import { doNothing } from '../../test-utils/callbacks';
import { mountWithTheme } from '../../test-utils/renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { TextInput } from './text-input';

jest.mock('@design-elements/utils/uuid');

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

    test('onChange callback is called when content is changed', () => {
        const callback = jest.fn();
        const wrapper = setup(callback);

        wrapper.find('input').simulate('change', { target: { value: 'bar' } });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onChange callback can\'t be called when input disabled', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(
                <TextInput
                    {...initialProps}
                    onFocus={callback}
                    disabled
                />,
            ),
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
        const wrapper = mount(
            ThemeWrapped(
                <TextInput
                    {...initialProps}
                    onFocus={callback}
                    disabled
                />,
            ),
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
        const tree = renderer.create(
            ThemeWrapped(
                <TextInput
                    label="Telephone"
                    pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                    placeholder="Ex.: 555-123-4567"
                    type="tel"
                    validationErrorMessage="Please enter a valid phone number"
                    defaultValue="foo"
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot [disabled = true]', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <TextInput
                    label="Telephone"
                    pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                    placeholder="Ex.: 555-123-4567"
                    type="tel"
                    validationErrorMessage="Please enter a valid phone number"
                    defaultValue="foo"
                    disabled
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot [required = true]', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <TextInput
                    label="Telephone"
                    pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
                    placeholder="Ex.: 555-123-4567"
                    type="tel"
                    validationErrorMessage="Please enter a valid phone number"
                    defaultValue="foo"
                    required
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
