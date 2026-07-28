import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { Card } from './card';

describe('Card', () => {
    it('adds data-testid', () => {
        const testId = 'some-test-id';

        renderWithProviders(<Card data-testid={testId}>Test</Card>);

        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('Matches the snapshot', () => {
        const { container } = renderWithProviders(<Card>Hello World</Card>);

        expect(container).toMatchSnapshot();
    });
});
