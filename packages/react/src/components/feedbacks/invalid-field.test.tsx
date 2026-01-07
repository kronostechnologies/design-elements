import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { InvalidField } from './invalid-field';

describe('Invalid field', () => {
    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(<InvalidField controlId="test-id" feedbackMsg="Feedback Message" />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('renders the feedback message', () => {
        renderWithProviders(<InvalidField controlId="test-id" feedbackMsg="Feedback Message" />);

        expect(screen.getByTestId('invalid-field')).toHaveTextContent('Feedback Message');
    });

    it('renders the icon by default', () => {
        const { container } = renderWithProviders(<InvalidField controlId="test-id" feedbackMsg="Feedback Message" />);

        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('does not render the icon when noIcon is true', () => {
        const { container } = renderWithProviders(
            <InvalidField controlId="test-id" feedbackMsg="Feedback Message" noIcon />,
        );

        expect(container.querySelector('svg')).not.toBeInTheDocument();
    });
});
