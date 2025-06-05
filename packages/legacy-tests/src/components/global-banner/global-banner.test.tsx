import { ActionButton, GlobalBanner } from '~/components/global-banner/global-banner';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme } from '../../test-utils/renderer';

const defaultActionButton: ActionButton = {
    label: 'Test button',
    onClick: jest.fn(),
};

describe('GlobalBanner', () => {
    it('should call action-button onClick callback when action-button is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <GlobalBanner
                actionButton={{
                    label: 'Test button',
                    onClick: callback,
                }}
                label="Test"
            >
                Test
            </GlobalBanner>,
        );

        getByTestId(wrapper, 'action-button').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call secondary-action-button onClick callback when secondary-action-button is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <GlobalBanner
                secondaryActionButton={{
                    label: 'Test button',
                    onClick: callback,
                }}
                label="Test"
            >
                Test
            </GlobalBanner>,
        );

        getByTestId(wrapper, 'secondary-action-button').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('dimiss-button hides the banner', () => {
        const wrapper = mountWithTheme(
            <GlobalBanner
                actionButton={defaultActionButton}
                label="Test"
                dismissable
            >
                WARNING! test test
            </GlobalBanner>,
        );

        getByTestId(wrapper, 'dismiss-button').simulate('click');

        expect(getByTestId(wrapper, 'container').exists()).toBe(false);
    });

    it('dimiss-button calls onDismiss', () => {
        const onDismiss = jest.fn();
        const wrapper = mountWithTheme(
            <GlobalBanner
                actionButton={defaultActionButton}
                label="Test"
                onDismiss={onDismiss}
                dismissable
            >
                WARNING! test test
            </GlobalBanner>,
        );

        getByTestId(wrapper, 'dismiss-button').simulate('click');

        expect(onDismiss).toHaveBeenCalled();
    });

    it('should not have dismiss-button when type is alert', () => {
        const wrapper = mountWithTheme(
            <GlobalBanner
                label="Test"
                type="alert"
                dismissable
            >
                Test content
            </GlobalBanner>,
        );

        expect(getByTestId(wrapper, 'dimiss-button').exists()).toBe(false);
    });

    it('should not have dimiss-button when dismissable is set to false', () => {
        const wrapper = mountWithTheme(
            <GlobalBanner
                label="Test"
                dismissable={false}
            >
                Test content
            </GlobalBanner>,
        );

        expect(getByTestId(wrapper, 'dimiss-button').exists()).toBe(false);
    });

    describe('hidden property', () => {
        it('hides the component', () => {
            const wrapper = mountWithTheme(
                <GlobalBanner
                    actionButton={defaultActionButton}
                    label="Test"
                    hidden
                >
                    WARNING! test test
                </GlobalBanner>,
            );

            expect(getByTestId(wrapper, 'container').exists()).toBe(false);
        });

        it('does not hide by default', () => {
            const wrapper = mountWithTheme(
                <GlobalBanner
                    actionButton={defaultActionButton}
                    label="Test"
                >
                    WARNING! test test
                </GlobalBanner>,
            );

            expect(getByTestId(wrapper, 'container').exists()).toBe(true);
        });
    });
});
