import { DeviceType } from '~/components/device-context-provider/device-context-provider';
import { SectionalBanner } from '~/components/sectional-banner/sectional-banner';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';

jest.mock('~/utils/uuid');

describe('SectionalBanner', () => {
    (['mobile', 'desktop'] as DeviceType[]).forEach((device) => {
        it(`should show destructive button when type is alert (${device})`, () => {
            const wrapper = mountWithProviders(
                <SectionalBanner
                    type="alert"
                    buttonLabel="some button"
                    onButtonClicked={jest.fn()}
                >
                    Test
                </SectionalBanner>,
                { wrappingComponentProps: { staticDevice: device } },
            );

            const buttonWrapper = getByTestId(wrapper, 'action-button');
            const button = getByTestId(buttonWrapper, 'button');

            expect(button.prop('buttonType')).toBe('destructive-primary');
        });

        it(`should call callback when dismiss button is clicked (${device})`, () => {
            const onDismiss = jest.fn();
            const wrapper = mountWithProviders(
                <SectionalBanner
                    type="info"
                    onDismiss={onDismiss}
                >
                    Test
                </SectionalBanner>,
                { wrappingComponentProps: { staticDevice: device } },
            );

            getByTestId(wrapper, 'dismiss-button').simulate('click');

            expect(onDismiss).toHaveBeenCalled();
        });

        it(`should call callback when button is clicked (${device})`, () => {
            const onButtonClicked = jest.fn();
            const wrapper = mountWithProviders(
                <SectionalBanner
                    type="info"
                    buttonLabel="some button"
                    onButtonClicked={onButtonClicked}
                >
                    Test
                </SectionalBanner>,
                { wrappingComponentProps: { staticDevice: device } },
            );

            getByTestId(wrapper, 'action-button').simulate('click');

            expect(onButtonClicked).toHaveBeenCalled();
        });
    });
});
