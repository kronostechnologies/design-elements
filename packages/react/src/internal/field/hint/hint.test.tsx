import { renderPortalWithProviders } from '../../../test-utils/renderer';
import { Hint } from './hint';

describe('Hint', () => {
    const hint = 'Test Hint';
    const customTestId = 'my-test-id';

    describe('Features', () => {
        it('renders correctly with children', () => {
            const { getByText, getByTestId } = renderPortalWithProviders(<Hint>{hint}</Hint>);
            expect(getByTestId('field-hint')).toBeDefined();
            expect(getByText(hint)).toBeDefined();
        });

        test('can override data-testid', () => {
            const { getByTestId } = renderPortalWithProviders(<Hint data-testid={customTestId} />);

            expect(getByTestId(customTestId)).toBeDefined();
        });
    });

    describe('Styling', () => {
        it('matches default snapshot', () => {
            const wrapper = renderPortalWithProviders(<Hint>Test Hint</Hint>);
            expect(wrapper).toMatchSnapshot();
        });

        it('matches mobile snapshot', () => {
            const wrapper = renderPortalWithProviders(<Hint>Test Hint</Hint>, 'mobile');
            expect(wrapper).toMatchSnapshot();
        });
    });
});
