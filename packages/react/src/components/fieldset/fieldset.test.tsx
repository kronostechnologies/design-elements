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
            expect(tree.find('#customId').exists()).toBeTruthy();
            const fieldset = tree.find('fieldset');
            expect(fieldset.props()).toHaveProperty('id', 'customId');
            const legend = tree.find(Legend);
            expect(legend.props()).toHaveProperty('id', 'customId-legend');
        });

        it('generates an ID if none is provided', () => {
            const tree = mountWithProviders(
                <Fieldset>
                    Test Content
                </Fieldset>,
            );
            const fieldset = tree.find('fieldset');
            expect(fieldset.props()).toHaveProperty('id');
        });

        it('does not render a legend when not provided', () => {
            const tree = mountWithProviders(
                <Fieldset>
                    Test Content
                </Fieldset>,
            );
            const legend = tree.find(Legend);
            expect(legend.exists()).toBeFalsy();
        });

        it('renders a legend when props provided', () => {
            const tree = mountWithProviders(
                <Fieldset legend={{ text: 'Legend text' }}>
                    Test Content
                </Fieldset>,
            );
            const legend = tree.find(Legend);
            expect(legend.prop('children')).toBe('Legend text');
        });

        it('updates legend text dynamically', () => {
            const tree = mountWithProviders(
                <Fieldset legend={{ text: 'Initial Legend Text' }}>
                    Test Content
                </Fieldset>,
            );
            expect(tree.find(Legend).text()).toContain('Initial Legend Text');
            tree.setProps({ legend: { text: 'Updated Legend Text' } });
            expect(tree.find(Legend).text()).toContain('Updated Legend Text');
        });
    });

    describe('Styling', () => {
        it('matches default', () => {
            const tree = mountWithProviders(
                <Fieldset>
                    Test Content
                </Fieldset>,
            );
            expect(tree).toMatchSnapshot();
        });

        it('matches with legend', () => {
            const tree = mountWithProviders(
                <Fieldset legend={{ text: 'Text Legend', bold: true }}>
                    Test Content
                </Fieldset>,
            );
            expect(tree).toMatchSnapshot();
            tree.setProps({ disabled: true });
            expect(tree).toMatchSnapshot();
        });

        it('matches vertical orientation', () => {
            const tree = mountWithProviders(
                <Fieldset orientation='vertical'>
                    Test Content
                </Fieldset>,
            );
            expect(tree).toMatchSnapshot();
            const fieldset = tree.find('fieldset');
            expect(fieldset.props()).toHaveProperty('data-orientation', 'vertical');
        });

        it('matches horizontal orientation', () => {
            const tree = mountWithProviders(
                <Fieldset orientation='horizontal'>
                    Test Content
                </Fieldset>,
            );
            expect(tree).toMatchSnapshot();
            const fieldset = tree.find('fieldset');
            expect(fieldset.props()).toHaveProperty('data-orientation', 'horizontal');
        });
    });

    describe('Accessibility', () => {
        it('applies aria-label when provided', () => {
            const tree = mountWithProviders(
                <Fieldset aria-label="Test Fieldset">Test Content</Fieldset>,
            );
            const fieldset = tree.find('fieldset');
            expect(fieldset.props()).toHaveProperty('aria-label', 'Test Fieldset');
        });

        it('applies aria-disabled when provided', () => {
            const tree = mountWithProviders(
                <Fieldset disabled>Test Content</Fieldset>,
            );
            const fieldset = tree.find('fieldset');
            expect(fieldset.props()).toHaveProperty('aria-disabled', true);
        });

        it('applies role to specified group role', () => {
            const tree = mountWithProviders(
                <Fieldset role='group'>
                    Test Content
                </Fieldset>,
            );
            const fieldset = tree.find('fieldset');
            expect(fieldset.props()).toHaveProperty('role', 'group');
        });
    });
});
