import { renderWithProviders } from '../../test-utils/renderer';
import { Slider } from './slider';

describe('Slider', () => {
    test('matches snapshot (single value)', () => {
        const { container } = renderWithProviders(<Slider label="Label" max={100} min={0} value={20} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (range values)', () => {
        const { container } = renderWithProviders(<Slider label="Label" max={100} min={0} value={[10, 30]} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (with step)', () => {
        const { container } = renderWithProviders(<Slider label="Label" max={100} min={0} value={30} step={10} />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
