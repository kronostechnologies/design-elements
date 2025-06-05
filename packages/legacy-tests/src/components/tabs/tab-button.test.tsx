import { TabButton } from '~/components/tabs/tab-button';
import { doNothing } from '../../test-utils/callbacks';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';

describe('TabButton', () => {
    const focusedAndSelected = {
        id: 'aId',
        panelId: 'aPanelId',
        isSelected: true,
        isFocused: true,
        onClick: doNothing,
        onFocus: doNothing,
    };

    it('should display button text', () => {
        const expectedButtonText = 'some text';
        const wrapper = mountWithProviders(
            <TabButton {...focusedAndSelected} size="medium">{expectedButtonText}</TabButton>,
        );

        const tabPanel = getByTestId(wrapper, 'tab-text');

        expect(tabPanel.prop('children')).toBe(expectedButtonText);
    });

    it('should not have a left icon in button when tab doesn\'t have a left icon name', () => {
        const wrapper = mountWithProviders(<TabButton {...focusedAndSelected} size="medium">some text</TabButton>);

        const tabButtonLeftIcon = findByTestId(wrapper, 'tab-left-icon');

        expect(tabButtonLeftIcon.length).toBe(0);
    });

    it('should have a left icon in button when tab has a left icon name', () => {
        const expectedLeftIcon = 'chevronUp';
        const wrapper = mountWithProviders(
            <TabButton {...focusedAndSelected} size="medium" leftIcon={expectedLeftIcon}>some text</TabButton>,
        );

        const tabButtonLeftIcon = getByTestId(wrapper, 'tab-left-icon');

        expect(tabButtonLeftIcon.prop('name')).toBe(expectedLeftIcon);
    });

    it('should not have a right icon in button when tab doesn\'t have a right icon name', () => {
        const wrapper = mountWithProviders(<TabButton {...focusedAndSelected} size="medium">some text</TabButton>);

        const tabButtonRightIcon = findByTestId(wrapper, 'tab-right-icon');

        expect(tabButtonRightIcon.length).toBe(0);
    });

    it('should have a right icon in button when tab has a right icon name', () => {
        const expectedRightIcon = 'chevronDown';
        const wrapper = mountWithProviders(
            <TabButton {...focusedAndSelected} size="medium" rightIcon={expectedRightIcon}>some text</TabButton>,
        );

        const tabButtonRightIcon = getByTestId(wrapper, 'tab-right-icon');

        expect(tabButtonRightIcon.prop('name')).toBe(expectedRightIcon);
    });

    it('should call component onClick method when button is clicked', () => {
        const expectedOnClickCall = jest.fn();
        const wrapper = mountWithProviders(
            <TabButton
                id="aId"
                panelId="aPanelId"
                isSelected
                onClick={expectedOnClickCall}
                size="medium"
            >
                some text
            </TabButton>,
        );

        getByTestId(wrapper, 'tab-button').simulate('click');

        expect(expectedOnClickCall).toHaveBeenCalled();
    });
});
