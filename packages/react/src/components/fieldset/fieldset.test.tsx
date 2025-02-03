import { mountWithProviders } from '../../test-utils/renderer';
import { Fieldset } from './fieldset';
import { Legend } from './legend';

describe('Fieldset Component', () => {
    describe('Features', () => {
        it('applies provided ID to the fieldset', () => {
            const tree = mountWithProviders(
                <Fieldset id='customId' legend={{ text: 'Legend Text' }}>
                    Test Content
                </Fieldset>,
            );

            const fieldset = tree.find('fieldset');
            const legend = tree.find(Legend);

            expect(tree.find('#customId').exists()).toBeTruthy();
            expect(fieldset.props()).toHaveProperty('id', 'customId');
            expect(legend.props()).toHaveProperty('id', 'customId-legend');
        });

        it('generates an ID if none is provided', () => {
            const tree = mountWithProviders(
                <Fieldset legend={{ text: 'Legend Text' }}>
                    Test Content
                </Fieldset>,
            );

            const fieldset = tree.find('fieldset');
            const legend = tree.find(Legend);

            expect(fieldset.props()).toHaveProperty('id');
            expect(legend.props()).toHaveProperty('id', `${fieldset.props().id}-legend`);
        });

        it('renders a legend with provided text', () => {
            const tree = mountWithProviders(
                <Fieldset legend={{ text: 'Legend Text' }}>
                    Test Content
                </Fieldset>,
            );

            const legend = tree.find(Legend);

            expect(legend.prop('children')).toBe('Legend Text');
        });

        it('updates legend text dynamically', () => {
            const tree = mountWithProviders(
                <Fieldset legend={{ text: 'Initial Legend Text' }}>
                    Test Content
                </Fieldset>,
            );

            tree.setProps({ legend: { text: 'Updated Legend Text' } });

            expect(tree.find(Legend).text()).toContain('Updated Legend Text');
        });
    });

    describe('Styling', () => {
        it('matches default', () => {
            const tree = mountWithProviders(
                <Fieldset legend={{ text: 'Default Legend' }}>
                    Test Content
                </Fieldset>,
            );

            expect(tree).toMatchSnapshot();
        });

        it('matches with bold legend', () => {
            const tree = mountWithProviders(
                <Fieldset legend={{ text: 'Bold Legend', bold: true }}>
                    Test Content
                </Fieldset>,
            );

            expect(tree).toMatchSnapshot();
        });

        it('matches with disabled legend', () => {
            const tree = mountWithProviders(
                <Fieldset disabled legend={{ text: 'Disabled Legend' }}>
                    Test Content
                </Fieldset>,
            );

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Accessibility', () => {
        it('applies aria-label when provided', () => {
            const tree = mountWithProviders(
                <Fieldset aria-label="Test Fieldset" legend={{ text: 'Accessible Legend' }}>
                    Test Content
                </Fieldset>,
            );

            const fieldset = tree.find('fieldset');

            expect(fieldset.props()).toHaveProperty('aria-label', 'Test Fieldset');
        });

        it('applies aria-disabled when provided', () => {
            const tree = mountWithProviders(
                <Fieldset disabled legend={{ text: 'Disabled Legend' }}>
                    Test Content
                </Fieldset>,
            );

            const fieldset = tree.find('fieldset');

            expect(fieldset.props()).toHaveProperty('aria-disabled', true);
        });
    });
});
