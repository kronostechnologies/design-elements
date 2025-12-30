import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { Lozenge } from './lozenge';

describe('Lozenge', () => {
    it('has icon when icon prop is specified', () => {
        renderWithProviders(<Lozenge icon="home">Test</Lozenge>);

        expect(screen.getByTestId('lozenge-icon')).toBeInTheDocument();
    });

    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(<Lozenge>Hello World</Lozenge>);

        expect(asFragment()).toMatchSnapshot();
    });

    it('default matches the snapshot', () => {
        const { asFragment } = renderWithProviders(<Lozenge>default</Lozenge>);

        expect(asFragment()).toMatchSnapshot();
    });

    it('success matches the snapshot', () => {
        const { asFragment } = renderWithProviders(<Lozenge variant="success">success</Lozenge>);

        expect(asFragment()).toMatchSnapshot();
    });

    it('warning matches the snapshot', () => {
        const { asFragment } = renderWithProviders(<Lozenge variant="warning">warning</Lozenge>);

        expect(asFragment()).toMatchSnapshot();
    });

    it('info matches the snapshot', () => {
        const { asFragment } = renderWithProviders(<Lozenge variant="info">info</Lozenge>);

        expect(asFragment()).toMatchSnapshot();
    });

    it('alert matches the snapshot', () => {
        const { asFragment } = renderWithProviders(<Lozenge variant="alert">alert</Lozenge>);

        expect(asFragment()).toMatchSnapshot();
    });
});
