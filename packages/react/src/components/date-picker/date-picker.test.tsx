import { renderWithProviders } from '../../test-utils/renderer';
import { Datepicker } from './date-picker';

describe('Datepicker', () => {
    test('matches snapshot (data-testid)', () => {
        const { container } = renderWithProviders(
            <Datepicker data-testid="some-data-test-id" label="date" />,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (desktop)', () => {
        const { container } = renderWithProviders(<Datepicker label="date" />, 'desktop');

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (mobile)', () => {
        const { container } = renderWithProviders(<Datepicker label="date" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has openToDate', () => {
        const { container } = renderWithProviders(
            <Datepicker label="date" openToDate={new Date('1995-05-05, 12:00')} />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (open, desktop)', () => {
        const { container } = renderWithProviders(
            <Datepicker label="date" open maxDate={new Date('2010-10-10, 12:00')} />,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (open, mobile)', () => {
        const { container } = renderWithProviders(
            <Datepicker label="date" startOpen maxDate={new Date('2010-10-10, 12:00')} />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (open, hasTodayButton)', () => {
        const { container } = renderWithProviders(
            <Datepicker label="date" hasTodayButton startOpen maxDate={new Date('2010-10-10, 12:00')} />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (invalid)', () => {
        const { container } = renderWithProviders(<Datepicker label="date" valid={false} />);

        expect(container.firstChild).toMatchSnapshot();
    });

    test('matches snapshot (disabled)', () => {
        const { container } = renderWithProviders(<Datepicker label="date" disabled />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
