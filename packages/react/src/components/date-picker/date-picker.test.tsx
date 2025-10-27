import { renderWithProviders } from '../../test-utils/renderer';
import { Datepicker } from './date-picker';

describe('Datepicker', () => {
    test('matches snapshot (data-testid)', () => {
        const { baseElement } = renderWithProviders(
            <Datepicker data-testid="some-data-test-id" label="date" />,
            'desktop',
        );

        expect(baseElement).toMatchSnapshot();
    });

    test('matches snapshot (desktop)', () => {
        const { baseElement } = renderWithProviders(<Datepicker label="date" />, 'desktop');

        expect(baseElement).toMatchSnapshot();
    });

    test('matches snapshot (mobile)', () => {
        const { baseElement } = renderWithProviders(<Datepicker label="date" />, 'mobile');

        expect(baseElement).toMatchSnapshot();
    });

    test('has openToDate', () => {
        const { baseElement } = renderWithProviders(
            <Datepicker label="date" openToDate={new Date('1995-05-05, 12:00')} />,
            'mobile',
        );

        expect(baseElement).toMatchSnapshot();
    });

    test('matches snapshot (open, desktop)', () => {
        const { baseElement } = renderWithProviders(
            <Datepicker label="date" open maxDate={new Date('2010-10-10, 12:00')} />,
            'desktop',
        );

        expect(baseElement).toMatchSnapshot();
    });

    test('matches snapshot (open, mobile)', () => {
        const { baseElement } = renderWithProviders(
            <Datepicker label="date" startOpen maxDate={new Date('2010-10-10, 12:00')} />,
            'mobile',
        );

        expect(baseElement).toMatchSnapshot();
    });

    test('matches snapshot (open, hasTodayButton)', () => {
        const { baseElement } = renderWithProviders(
            <Datepicker label="date" hasTodayButton startOpen maxDate={new Date('2010-10-10, 12:00')} />,
        );

        expect(baseElement).toMatchSnapshot();
    });

    test('matches snapshot (invalid)', () => {
        const { baseElement } = renderWithProviders(<Datepicker label="date" valid={false} />);

        expect(baseElement).toMatchSnapshot();
    });

    test('matches snapshot (disabled)', () => {
        const { baseElement } = renderWithProviders(<Datepicker label="date" disabled />);

        expect(baseElement).toMatchSnapshot();
    });
});
