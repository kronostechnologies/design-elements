import { shallow } from 'enzyme';
import React from 'react';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithProviders, mountWithTheme } from '../../test-utils/renderer';
import { ChooserCard } from './chooser-card';

jest.mock('../../utils/uuid');

describe('Chooser Card', () => {
    const inputTestId = 'chooser-card-test-input';
    const containerTestId = 'chooser-card-test-container';

    test('onChange callback is called when input is changed', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <ChooserCard name="test" label="Test" value="test" onChange={callback}>
                Test description
            </ChooserCard>,
        );

        getByTestId(wrapper, inputTestId).simulate('change');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onChange callback is called when container is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <ChooserCard name="test" label="Test" value="test" onChange={callback}>
                Test description
            </ChooserCard>,
        );

        getByTestId(wrapper, containerTestId).simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('container should have isFocused prop set to true when input is focused', () => {
        const wrapper = shallow(
            <ChooserCard name="test" label="Test" value="test">
                Test description
            </ChooserCard>,
        );

        getByTestId(wrapper, inputTestId).simulate('focus');

        expect(getByTestId(wrapper, containerTestId).getElement().props.isFocused).toBe(true);
    });

    test('container should have isFocused prop set to false when input is blurred', () => {
        const wrapper = shallow(
            <ChooserCard name="test" label="Test" value="test">
                Test description
            </ChooserCard>,
        );
        getByTestId(wrapper, inputTestId).simulate('focus');

        getByTestId(wrapper, inputTestId).simulate('blur');

        expect(getByTestId(wrapper, containerTestId).getElement().props.isFocused).toBe(false);
    });

    test('container should have isSelected prop set to true when input is checked', () => {
        const wrapper = mountWithTheme(
            <ChooserCard name="test" label="Test" value="test">
                Test description
            </ChooserCard>,
        );

        getByTestId(wrapper, inputTestId).simulate('click');

        expect(getByTestId(wrapper, containerTestId).getElement().props.isSelected).toBe(true);
    });

    test('container should have isSelected prop set to true when input is defaultChecked', () => {
        const wrapper = shallow(
            <ChooserCard name="test" label="Test" value="test" defaultChecked>
                Test description
            </ChooserCard>,
        );

        expect(getByTestId(wrapper, containerTestId).getElement().props.isSelected).toBe(true);
    });

    test('Matches snapshot (Default, Desktop)', () => {
        const tree = renderWithProviders(
            <ChooserCard name="test" label="Test" value="test">
                Test description
            </ChooserCard>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (Checked, Desktop)', () => {
        const tree = renderWithProviders(
            <ChooserCard name="test" label="Test" value="test" checked>
                Test description
            </ChooserCard>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (Disabled, Desktop)', () => {
        const tree = renderWithProviders(
            <ChooserCard name="test" label="Test" value="test" disabled>
                Test description
            </ChooserCard>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (Default, Mobile)', () => {
        const tree = renderWithProviders(
            <ChooserCard name="test" label="Test" value="test">
                Test description
            </ChooserCard>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
