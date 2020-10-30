import React from 'react';

import { ReactWrapper } from 'enzyme';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';
import { IconName } from '../icon/icon';
import { TabButton } from './tab-button';

describe('TabButton', () => {
    test('should display button text', () => {
        const expectedButtonText = 'some text';
        const wrapper = mountTabButtonWithProviders(expectedButtonText);

        const tabPanel = getByTestId(wrapper, 'tab-button-text');

        expect(tabPanel.prop('children')).toBe(expectedButtonText);
    });

    test('should not have a left icon in button when tab doesn\'t have a left icon name', () => {
        const wrapper = mountTabButtonWithProviders('some text');

        const tabButtonLeftIcon = findByTestId(wrapper, 'tab-button-left-icon');

        expect(tabButtonLeftIcon.length).toBe(0);
    });

    test('should have a left icon in button when tab has a left icon name', () => {
        const expectedLeftIcon = 'chevronUp';
        const wrapper = mountTabButtonWithProviders('some text', expectedLeftIcon);

        const tabButtonLeftIcon = getByTestId(wrapper, 'tab-button-left-icon');

        expect(tabButtonLeftIcon.prop('name')).toBe(expectedLeftIcon);
    });

    test('should not have a right icon in button when tab doesn\'t have a right icon name', () => {
        const wrapper = mountTabButtonWithProviders('some text');

        const tabButtonRightIcon = findByTestId(wrapper, 'tab-button-right-icon');

        expect(tabButtonRightIcon.length).toBe(0);
    });

    test('should have a right icon in button when tab has a right icon name', () => {
        const expectedRightIcon = 'chevronDown';
        const wrapper = mountTabButtonWithProviders('some text', 'chevronUp', expectedRightIcon);

        const tabButtonRightIcon = getByTestId(wrapper, 'tab-button-right-icon');

        expect(tabButtonRightIcon.prop('name')).toBe(expectedRightIcon);
    });
});

function mountTabButtonWithProviders(textValue: string, leftIcon?: IconName, rightIcon?: IconName): ReactWrapper {
    return mountWithProviders(
        <TabButton
            id="id"
            textValue={textValue}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            controlledPanelId="controlledPanelId"
            isSelected={true}
            isFocused={true}
            onClick={doNothing}
            onFocus={doNothing}
        />,
    );
}

function doNothing(): void {
    // doNothing
}
