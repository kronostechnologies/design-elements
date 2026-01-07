import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { doNothing } from '../../test-utils/callbacks';
import { renderWithProviders } from '../../test-utils/renderer';
import { TabButton } from './tab-button';

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

        renderWithProviders(
            <TabButton {...focusedAndSelected} size="medium">{expectedButtonText}</TabButton>,
        );

        expect(screen.getByTestId('tab-text')).toHaveTextContent(expectedButtonText);
    });

    it('should not have a left icon in button when tab doesn\'t have a left icon name', () => {
        renderWithProviders(<TabButton {...focusedAndSelected} size="medium">some text</TabButton>);

        expect(screen.queryByTestId('tab-left-icon')).not.toBeInTheDocument();
    });

    it('should have a left icon in button when tab has a left icon name', () => {
        const expectedLeftIcon = 'chevronUp';

        renderWithProviders(
            <TabButton {...focusedAndSelected} size="medium" leftIcon={expectedLeftIcon}>some text</TabButton>,
        );

        expect(screen.getByTestId('tab-left-icon')).toBeInTheDocument();
    });

    it('should not have a right icon in button when tab doesn\'t have a right icon name', () => {
        renderWithProviders(<TabButton {...focusedAndSelected} size="medium">some text</TabButton>);

        expect(screen.queryByTestId('tab-right-icon')).not.toBeInTheDocument();
    });

    it('should have a right icon in button when tab has a right icon name', () => {
        const expectedRightIcon = 'chevronDown';

        renderWithProviders(
            <TabButton {...focusedAndSelected} size="medium" rightIcon={expectedRightIcon}>some text</TabButton>,
        );

        expect(screen.getByTestId('tab-right-icon')).toBeInTheDocument();
    });

    it('should call component onClick method when button is clicked', async () => {
        const expectedOnClickCall = jest.fn();
        const user = userEvent.setup();

        renderWithProviders(
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

        await user.click(screen.getByTestId('tab-button'));

        expect(expectedOnClickCall).toHaveBeenCalled();
    });
});
