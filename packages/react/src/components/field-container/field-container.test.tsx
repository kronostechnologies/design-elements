import { mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { FieldContainer } from './field-container';
import { Tooltip } from '../tooltip/tooltip';
import { getByTestId } from '../../test-utils/enzyme-selectors';

const defaultProps = {
    fieldId: 'test-id',
    label: 'test label',
    validationErrorMessage: 'This text area input is invalid',
};

describe('Field Container', () => {
    test('label has tooltip when tooltipLabel prop is defined', () => {
        const wrapper = mountWithTheme(
            <FieldContainer tooltipLabel="test" valid {...defaultProps}>
                Children
            </FieldContainer>,
        );

        expect(getByTestId(wrapper, 'field-label').find(Tooltip).exists()).toBe(true);
    });

    test('matches snapshot', () => {
        const tree = renderWithProviders(
            <FieldContainer valid {...defaultProps}>
                Children
            </FieldContainer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('should have invalid styles given valid prop is set to false', () => {
        const tree = renderWithProviders(
            <FieldContainer valid={false} {...defaultProps}>
                Children
            </FieldContainer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('should not have margins given noMargin prop is set to true', () => {
        const tree = renderWithProviders(
            <FieldContainer valid noMargin {...defaultProps}>
                Children
            </FieldContainer>,
        );

        expect(tree).toMatchSnapshot();
    });
});
