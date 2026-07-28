import { renderWithProviders } from '../../test-utils/renderer';
import { FieldContainer } from './field-container';

const defaultProps = {
    fieldId: 'test-id',
    label: 'test label',
    validationErrorMessage: 'This text area input is invalid',
};

describe('Field Container', () => {
    it('matches snapshot', () => {
        const { container } = renderWithProviders(
            <FieldContainer valid {...defaultProps}>
                Children
            </FieldContainer>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should have invalid styles given valid prop is set to false', () => {
        const { container } = renderWithProviders(
            <FieldContainer valid={false} {...defaultProps}>
                Children
            </FieldContainer>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should not have margins given noMargin prop is set to true', () => {
        const { container } = renderWithProviders(
            <FieldContainer valid noMargin {...defaultProps}>
                Children
            </FieldContainer>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
