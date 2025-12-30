import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { Fieldset } from './fieldset';

describe('Fieldset', () => {
    describe('Features', () => {
        it('applies provided ID to the fieldset', () => {
            renderWithProviders(
                <Fieldset id="customId" legend={{ text: 'Legend Text' }}>
                    Test Content
                </Fieldset>,
            );

            const fieldset = screen.getByRole('group');
            const legend = screen.getByText('Legend Text');

            expect(fieldset).toHaveAttribute('id', 'customId');
            expect(legend).toHaveAttribute('id', 'customId-legend');
        });

        it('generates an ID if none is provided', () => {
            renderWithProviders(<Fieldset>Test Content</Fieldset>);

            const fieldset = screen.getByRole('group');

            expect(fieldset).toHaveAttribute('id');
        });

        it('does not render a legend when not provided', () => {
            const { container } = renderWithProviders(<Fieldset>Test Content</Fieldset>);

            const legend = container.querySelector('legend');

            expect(legend).not.toBeInTheDocument();
        });

        it('renders a legend when props provided', () => {
            renderWithProviders(<Fieldset legend={{ text: 'Legend text' }}>Test Content</Fieldset>);

            const legend = screen.getByText('Legend text');
            expect(legend).toBeInTheDocument();
            expect(legend.tagName).toEqual('LEGEND');
        });

        it('updates legend text dynamically', () => {
            const { rerender } = renderWithProviders(
                <Fieldset legend={{ text: 'Initial Legend Text' }}>
                    Test Content
                </Fieldset>,
            );

            expect(screen.getByText('Initial Legend Text')).toBeInTheDocument();

            rerender(
                <Fieldset legend={{ text: 'Updated Legend Text' }}>
                    Test Content
                </Fieldset>,
            );

            expect(screen.getByText('Updated Legend Text')).toBeInTheDocument();
        });
    });

    describe('Styling', () => {
        it('matches default', () => {
            const { asFragment } = renderWithProviders(<Fieldset>Test Content</Fieldset>);

            expect(asFragment()).toMatchSnapshot();
        });

        it('matches with bold legend', () => {
            const { asFragment } = renderWithProviders(
                <Fieldset legend={{ text: 'Text Legend', bold: true }}>
                    Test Content
                </Fieldset>,
            );

            expect(asFragment()).toMatchSnapshot();
        });

        it('matches with disabled legend', () => {
            const { asFragment } = renderWithProviders(
                <Fieldset disabled legend={{ text: 'Text Legend' }}>
                    Test Content
                </Fieldset>,
            );

            expect(asFragment()).toMatchSnapshot();
        });

        it('matches vertical orientation', () => {
            const { asFragment } = renderWithProviders(<Fieldset orientation="vertical">Test Content</Fieldset>);

            const fieldset = screen.getByRole('group');

            expect(asFragment()).toMatchSnapshot();
            expect(fieldset).toHaveAttribute('data-orientation', 'vertical');
        });

        it('matches horizontal orientation', () => {
            const { asFragment } = renderWithProviders(<Fieldset orientation="horizontal">Test Content</Fieldset>);

            const fieldset = screen.getByRole('group');

            expect(asFragment()).toMatchSnapshot();
            expect(fieldset).toHaveAttribute('data-orientation', 'horizontal');
        });
    });

    describe('Accessibility', () => {
        it('applies aria-label when provided', () => {
            renderWithProviders(<Fieldset aria-label="Test Fieldset">Test Content</Fieldset>);

            const fieldset = screen.getByRole('group');

            expect(fieldset).toHaveAttribute('aria-label', 'Test Fieldset');
        });

        it('applies aria-disabled when provided', () => {
            renderWithProviders(<Fieldset disabled>Test Content</Fieldset>);

            const fieldset = screen.getByRole('group');

            expect(fieldset).toHaveAttribute('aria-disabled', 'true');
        });

        it('applies role to specified group role', () => {
            renderWithProviders(<Fieldset role="group">Test Content</Fieldset>);

            const fieldset = screen.getByRole('group');

            expect(fieldset).toBeInTheDocument();
        });
    });
});
