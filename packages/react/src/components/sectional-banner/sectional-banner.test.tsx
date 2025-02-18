import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { SectionalBanner } from './sectional-banner';

jest.mock('../../utils/uuid');

describe('SectionalBanner', () => {
    it('should match snapshot (desktop)', () => {
        const tree = renderWithProviders(
            <SectionalBanner type="info">
                Test
            </SectionalBanner>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    it('should match snapshot (custom message)', () => {
        const tree = renderWithProviders(
            <SectionalBanner type="info">
                <p>Some sub title</p>
                <ul>
                    <li>Some bullet point</li>
                </ul>
            </SectionalBanner>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    it('should match snapshot (mobile)', () => {
        const tree = renderWithProviders(
            <SectionalBanner type="info">
                Test
            </SectionalBanner>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

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

            const buttonWrapper = getByTestId(wrapper, `action-button`);
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

            getByTestId(wrapper, `action-button`).simulate('click');

            expect(onButtonClicked).toHaveBeenCalled();
        });
    });
});
