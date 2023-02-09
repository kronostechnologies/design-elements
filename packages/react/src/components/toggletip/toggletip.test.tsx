import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';
import { Toggletip } from './toggletip';

jest.mock('../../utils/uuid');

describe('Toggletip', () => {
    describe('desktop', () => {
        test('opens on mouseClick', async () => {
            const wrapper = mountWithProviders(
                <Toggletip>Test Content</Toggletip>,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'toggletip').simulate('click');

            expect(getByTestId(wrapper, 'toggletip-content-container').exists()).toBe(true);
        });

        test('closes on mouseClick given toggletip is open', async () => {
            const wrapper = mountWithProviders(
                <Toggletip defaultOpen>Test Content</Toggletip>,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'toggletip').simulate('click');

            expect(getByTestId(wrapper, 'toggletip-content-container').exists()).toBe(false);
        });

        test('does not open on mouseClick given toggletip is disabled', () => {
            const wrapper = mountWithProviders(
                <Toggletip disabled>Test Content</Toggletip>,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            getByTestId(wrapper, 'toggletip').simulate('click');

            expect(getByTestId(wrapper, 'toggletip-content-container').exists()).toBe(false);
        });
    });

    test('Has default desktop styles', () => {
        const tree = mountWithProviders(
            <Toggletip>Test Content</Toggletip>,
            { wrappingComponentProps: { staticDevice: 'desktop' } },
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has default desktop styles (defaultOpen)', () => {
        const tree = mountWithProviders(
            <Toggletip defaultOpen>Test Content</Toggletip>,
            { wrappingComponentProps: { staticDevice: 'desktop' } },
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has mobile styles', () => {
        const tree = mountWithProviders(
            <Toggletip>Test Content</Toggletip>,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has mobile styles (defaultOpen)', () => {
        const tree = mountWithProviders(
            <Toggletip defaultOpen>Test Content</Toggletip>,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(tree).toMatchSnapshot();
    });

    test('Renders content', () => {
        const wrapper = mountWithProviders(
            <Toggletip defaultOpen>Test Content</Toggletip>,
            { wrappingComponentProps: { staticDevice: 'mobile' } },
        );

        expect(getByTestId(wrapper, 'toggletip-content-container').text()).toBe('Test Content');
    });
});
