import { renderWithProviders } from '../../test-utils/renderer';
import { ProgressCircular } from './progress-circular';

describe('ProgressCircular', () => {
    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(<ProgressCircular value={66} />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('renders with custom size', () => {
        const { container } = renderWithProviders(<ProgressCircular value={50} size="large" />);
        const svg = container.querySelector('svg');

        expect(svg).toHaveAttribute('width', '64');
        expect(svg).toHaveAttribute('height', '64');
    });

    it('renders with className', () => {
        const { container } = renderWithProviders(<ProgressCircular value={50} className="custom-class" />);

        expect(container.querySelector('svg')).toHaveClass('custom-class');
    });
});
