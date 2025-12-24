import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { Badge } from './badge';

describe('Badge', () => {
    it('is visible when the value is not zero', () => {
        renderWithProviders(<Badge value={1} />);
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('is not visible when the value is zero', () => {
        renderWithProviders(<Badge value={0} />);

        expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it('is visible when the value is zero and showZero is true', () => {
        renderWithProviders(<Badge value={0} showZero />);

        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('contains the value if below maxValue', () => {
        renderWithProviders(<Badge value={2} maxValue={9} />);

        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('contains the max value and a plus sign if the value is above maxValue', () => {
        renderWithProviders(<Badge value={12} maxValue={9} />);

        expect(screen.getByText('9+')).toBeInTheDocument();
    });

    it('hides value when showValue is false', async () => {
        const { container } = renderWithProviders(<Badge value={1} showValue={false} className="test-badge" />);

        const badge = container.querySelector('.test-badge');

        expect(badge).toBeInTheDocument();
        expect(badge).toBeEmptyDOMElement();
        expect(screen.queryByText('1')).not.toBeInTheDocument();
    });

    it('is animated if animate is true', () => {
        renderWithProviders(<Badge value={1} animate />);

        const badge = screen.getByText('1');

        expect(badge).toHaveStyleRule('animation', expect.stringContaining('2s ease-in infinite'));
    });

    it('is positioned according to the offset props', () => {
        const offsetX = 10;
        const offsetY = 10;
        renderWithProviders(<Badge value={1} position="top-right" offsetX={offsetX} offsetY={offsetY} />);

        const badge = screen.getByText('1');

        expect(badge).toHaveStyleRule('top', `${offsetY}px`);
        expect(badge).toHaveStyleRule('right', `-${offsetX}px`);
    });

    it('matches the snapshot', () => {
        const { container } = renderWithProviders(
            <>
                <Badge value={1} />
                <Badge value={1} showValue={false} />
            </>,
        );

        expect(container).toMatchSnapshot();
    });
});
