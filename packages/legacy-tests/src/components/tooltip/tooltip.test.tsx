import { Icon, IconButton } from '~/components/..';
import { Tooltip } from '~/components/tooltip/tooltip';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';

describe('Tooltip', () => {
    describe('desktop', () => {
        it('opens on mouseEnter', () => {
            const wrapper = mountWithProviders(
                <Tooltip label="Test Content" />,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'tooltip').simulate('mouseenter');

            expect(getByTestId(wrapper, 'tooltip-content-container').prop('visible')).toBe(true);
        });

        it('closes on mouseLeave given tooltip is open', () => {
            const wrapper = mountWithProviders(
                <Tooltip label="Test Content" defaultOpen />,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'tooltip').simulate('mouseleave');

            expect(getByTestId(wrapper, 'tooltip-content-container').prop('visible')).toBe(false);
        });

        it('does not open on mouseEnter given tooltip is disabled', () => {
            const wrapper = mountWithProviders(
                <Tooltip label="Test Content" disabled />,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'tooltip').simulate('mouseenter');

            expect(getByTestId(wrapper, 'tooltip-content-container').prop('visible')).toBe(false);
        });

        it('opens on focus', () => {
            const wrapper = mountWithProviders(
                <Tooltip label="Test Content" />,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'tooltip').simulate('focus');

            expect(getByTestId(wrapper, 'tooltip-content-container').prop('visible')).toBe(true);
        });

        it('closes on blur given tooltip is open', () => {
            const wrapper = mountWithProviders(
                <Tooltip label="Test Content" defaultOpen />,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'tooltip').simulate('blur');

            expect(getByTestId(wrapper, 'tooltip-content-container').prop('visible')).toBe(false);
        });

        it('tooltip-confirm-icon should be displayed after tooltip children is clicked', () => {
            const confirmationLabel = 'confirmLabel';
            const wrapper = mountWithProviders(
                <Tooltip
                    confirmationLabel={confirmationLabel}
                    label="Test Content"
                    mode='confirm'
                    defaultOpen
                >
                    <IconButton data-testid='icon-button' buttonType='tertiary' type='button' iconName='copy' />
                </Tooltip>,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'icon-button').simulate('click');

            expect(getByTestId(wrapper, 'tooltip-confirm-icon').exists()).toBe(true);
        });

        it('label should be confirmation label after tooltip children is clicked', () => {
            const confirmationLabel = 'confirmLabel';
            const wrapper = mountWithProviders(
                <Tooltip
                    label="Test Content"
                    confirmationLabel={confirmationLabel}
                    mode='confirm'
                    defaultOpen
                >
                    <IconButton data-testid='icon-button' buttonType='tertiary' type='button' iconName='copy' />
                </Tooltip>,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'icon-button').simulate('click');

            expect(getByTestId(wrapper, 'tooltip-content-container').text()).toBe(confirmationLabel);
        });

        it('does not open on focus given tooltip is disabled', () => {
            const wrapper = mountWithProviders(
                <Tooltip label="Test Content" disabled />,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'tooltip').simulate('focus');

            expect(getByTestId(wrapper, 'tooltip-content-container').prop('visible')).toBe(false);
        });
    });

    it('Has default desktop styles', () => {
        const tree = mountWithProviders(
            <Tooltip label="Test Content" />,
            { wrappingComponentProps: { staticDevice: 'desktop' } },
        );

        expect(tree).toMatchSnapshot();
    });

    it('Has default desktop styles (defaultOpen)', () => {
        const tree = mountWithProviders(
            <Tooltip defaultOpen label="Test Content" />,
            { wrappingComponentProps: { staticDevice: 'desktop' } },
        );

        expect(tree).toMatchSnapshot();
    });

    it('Has mobile styles', () => {
        const tree = mountWithProviders(
            <Tooltip label="Test Content" />,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(tree).toMatchSnapshot();
    });

    it('Has mobile styles (defaultOpen)', () => {
        const tree = mountWithProviders(
            <Tooltip defaultOpen label="Test Content" />,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(tree).toMatchSnapshot();
    });

    it('Renders label', () => {
        const wrapper = mountWithProviders(
            <Tooltip defaultOpen label="Test Content" />,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(getByTestId(wrapper, 'tooltip-content-container').text()).toBe('Test Content');
    });

    it('Renders children icon', () => {
        const wrapper = mountWithProviders(
            <Tooltip defaultOpen label="Test Content">
                <Icon data-testid="icon-children" aria-hidden="true" name="settings" size="20" />
            </Tooltip>,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        const iconChildren = getByTestId(wrapper, 'icon-children');

        expect(iconChildren.exists()).toBe(true);
    });
});
