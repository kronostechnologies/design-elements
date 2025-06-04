import { Toggletip } from '~/components/toggletip/toggletip';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';

describe('Toggletip', () => {
    describe('desktop', () => {
        it('opens on mouseClick', async () => {
            const wrapper = mountWithProviders(
                <Toggletip>Test Content</Toggletip>,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'toggletip').simulate('click');

            expect(getByTestId(wrapper, 'toggletip-content-container').exists()).toBe(true);
        });

        it('closes on mouseClick given toggletip is open', async () => {
            const wrapper = mountWithProviders(
                <Toggletip defaultOpen>Test Content</Toggletip>,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'toggletip').simulate('click');

            expect(getByTestId(wrapper, 'toggletip-content-container').exists()).toBe(false);
        });

        it('does not open on mouseClick given toggletip is disabled', () => {
            const wrapper = mountWithProviders(
                <Toggletip disabled>Test Content</Toggletip>,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'toggletip').simulate('click');

            expect(getByTestId(wrapper, 'toggletip-content-container').exists()).toBe(false);
        });
    });

    it('Has default desktop styles', () => {
        const tree = mountWithProviders(
            <Toggletip>Test Content</Toggletip>,
            { wrappingComponentProps: { staticDevice: 'desktop' } },
        );

        expect(tree).toMatchSnapshot();
    });

    it('Has default desktop styles (defaultOpen)', () => {
        const tree = mountWithProviders(
            <Toggletip defaultOpen>Test Content</Toggletip>,
            { wrappingComponentProps: { staticDevice: 'desktop' } },
        );

        expect(tree).toMatchSnapshot();
    });

    it('Has mobile styles', () => {
        const tree = mountWithProviders(
            <Toggletip>Test Content</Toggletip>,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(tree).toMatchSnapshot();
    });

    it('Has mobile styles (defaultOpen)', () => {
        const tree = mountWithProviders(
            <Toggletip defaultOpen>Test Content</Toggletip>,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(tree).toMatchSnapshot();
    });

    it('Renders content', () => {
        const wrapper = mountWithProviders(
            <Toggletip defaultOpen>Test Content</Toggletip>,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(getByTestId(wrapper, 'toggletip-content-container').text()).toBe('Test Content');
    });
});
