import { doNothing } from '../../test-utils/callbacks';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';
import { TabButton } from './tab-button';

describe('TabButton', () => {
    const defaultProps = {
        size: 'default' as const,
    };

    const focusedAndSelected = {
        ...defaultProps,
        id: 'aId',
        panelId: 'aPanelId',
        isSelected: true,
        isFocused: true,
        onClick: doNothing,
        onFocus: doNothing,
    };

    test('should display button text', () => {
        const expectedButtonText = 'some text';
        const wrapper = mountWithProviders(
            <TabButton {...focusedAndSelected} size="default">{expectedButtonText}</TabButton>
        );

        const tabPanel = getByTestId(wrapper, 'tab-text');

        expect(tabPanel.prop('children')).toBe(expectedButtonText);
    });

    test('should not have a left icon in button when tab doesn\'t have a left icon name', () => {
        const wrapper = mountWithProviders(<TabButton {...focusedAndSelected} size="default">some text</TabButton>);

        const tabButtonLeftIcon = findByTestId(wrapper, 'tab-left-icon');

        expect(tabButtonLeftIcon.length).toBe(0);
    });

    test('should have a left icon in button when tab has a left icon name', () => {
        const expectedLeftIcon = 'chevronUp';
        const wrapper = mountWithProviders(
            <TabButton {...focusedAndSelected} size="default" leftIcon={expectedLeftIcon}>some text</TabButton>,
        );

        const tabButtonLeftIcon = getByTestId(wrapper, 'tab-left-icon');

        expect(tabButtonLeftIcon.prop('name')).toBe(expectedLeftIcon);
    });

    test('should not have a right icon in button when tab doesn\'t have a right icon name', () => {
        const wrapper = mountWithProviders(<TabButton {...focusedAndSelected} size="default">some text</TabButton>);

        const tabButtonRightIcon = findByTestId(wrapper, 'tab-right-icon');

        expect(tabButtonRightIcon.length).toBe(0);
    });

    test('should have a right icon in button when tab has a right icon name', () => {
        const expectedRightIcon = 'chevronDown';
        const wrapper = mountWithProviders(
            <TabButton {...focusedAndSelected} size="default" rightIcon={expectedRightIcon}>some text</TabButton>,
        );

        const tabButtonRightIcon = getByTestId(wrapper, 'tab-right-icon');

        expect(tabButtonRightIcon.prop('name')).toBe(expectedRightIcon);
    });

    test('should call component onClick method when button is clicked', () => {
        const expectedOnClickCall = jest.fn();
        const wrapper = mountWithProviders(
            <TabButton
                id="aId"
                panelId="aPanelId"
                isSelected
                onClick={expectedOnClickCall}
                size="default"
            >
                some text
            </TabButton>,
        );

        getByTestId(wrapper, 'tab-button').simulate('click');

        expect(expectedOnClickCall).toHaveBeenCalled();
    });
});
