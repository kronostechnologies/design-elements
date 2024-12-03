import { renderPortalWithProviders } from '../../../test-utils/renderer';
import { ValidationMessage } from './validation-message';

describe('Validation Message', () => {
    const message = 'Validation Message';
    const customTestId = 'my-test-id';

    describe('Features', () => {
        it('renders correctly with children', () => {
            const { getByText, getByTestId } = renderPortalWithProviders(
                <ValidationMessage>{message}</ValidationMessage>,
            );
            expect(getByText(message)).toBeDefined();
            expect(getByTestId('invalid-field')).toBeDefined();
        });

        test('can override data-testid', () => {
            const { getByTestId } = renderPortalWithProviders(
                <ValidationMessage data-testid={customTestId} />,
            );

            expect(getByTestId(customTestId)).toBeDefined();
        });
    });

    describe('Styling', () => {
        it('matches default snapshot', () => {
            const wrapper = renderPortalWithProviders(
                <ValidationMessage>
                    {message}
                </ValidationMessage>,
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('matches no icon snapshot', () => {
            const wrapper = renderPortalWithProviders(
                <ValidationMessage noInvalidFieldIcon>
                    {message}
                </ValidationMessage>,
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('matches mobile snapshot', () => {
            const wrapper = renderPortalWithProviders(
                <ValidationMessage>
                    Feedback Message
                </ValidationMessage>,
                'mobile',
            );
            expect(wrapper).toMatchSnapshot();
        });
    });
});
