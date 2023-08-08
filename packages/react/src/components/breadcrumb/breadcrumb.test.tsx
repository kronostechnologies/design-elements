import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DesignSystem } from '../design-system';
import { NavListOption } from '../nav-list/nav-list-option';
import { Breadcrumb } from './breadcrumb';
import { useBreadcrumbRoutes } from './use-breadcrumb-routes';

const defaultHistory = [
    { label: 'HOME', value: 'index', href: '/index' },
    { label: 'ROUTE', value: 'route', href: '/route' },
    { label: 'THREE', value: 'three', href: '/three' },
];

const shownOverflowHistory = [
    { label: 'a', value: '1', href: '/1' },
    { label: 'abc', value: '2', href: '/2' },
    { label: 'abcd', value: '3', href: '/3' },
    { label: 'abcde', value: '4', href: '/4' },
    { label: 'abcdef', value: '5', href: '/5' },
    { label: 'abcdefg', value: '6', href: '/6' },
    { label: 'abcdefgh', value: '7', href: '/7' },
    { label: 'abcdefghi', value: '8', href: '/8' },
    { label: 'abcdefghij', value: '9', href: '/9' },
];

const hiddenOverflowHistory = [
    { label: 'abcdefghijk', value: '10', href: '/10' },
    { label: 'abcdefghijkl', value: '11', href: '/11' },
    { label: 'abcdefghijklm', value: '12', href: '/12' },
    { label: 'abcdefghijklmn', value: '13', href: '/13' },
    { label: 'abcdefghijklmno', value: '14', href: '/14' },
    { label: 'abcdefghijklmnop', value: '15', href: '/15' },
    { label: 'abcdefghijklmnopq', value: '16', href: '/16' },
    { label: 'abcdefghijklmnopqr', value: '17', href: '/17' },
    { label: 'abcdefghijklmnopqrs', value: '18', href: '/18' },
];

jest.mock('./use-breadcrumb-routes', () => ({
    useBreadcrumbRoutes: jest.fn(),
}));

describe('Breadcrumb', () => {
    describe('Snapshots', () => {
        test('Matches snapshot (single entry)', () => {
            const history = [{
                label: 'HOME',
                href: '/home',
                value: 'index',
            }];
            jest.mocked(useBreadcrumbRoutes).mockReturnValue({
                shownRoutes: history,
                hiddenRoutes: [],
                overflow: { horizontal: false, vertical: false },
            });
            const breadcrumb = render(
                <BrowserRouter>
                    <DesignSystem>
                        <Breadcrumb history={history} />
                    </DesignSystem>
                </BrowserRouter>,
            );

            expect(breadcrumb).toMatchSnapshot();
        });

        test('Matches snapshot (double entries)', () => {
            const history = [...defaultHistory];
            history.pop();
            jest.mocked(useBreadcrumbRoutes).mockReturnValue({
                shownRoutes: history,
                hiddenRoutes: [],
                overflow: { horizontal: false, vertical: false },
            });

            const breadcrumb = render(
                <BrowserRouter>
                    <DesignSystem>
                        <Breadcrumb history={history} />
                    </DesignSystem>
                </BrowserRouter>,
            );

            expect(breadcrumb).toMatchSnapshot();
        });

        test('Matches snapshot (Three or more entries)', () => {
            jest.mocked(useBreadcrumbRoutes).mockReturnValue({
                shownRoutes: defaultHistory,
                hiddenRoutes: [],
                overflow: { horizontal: false, vertical: false },
            });
            const breadcrumb = render(
                <BrowserRouter>
                    <DesignSystem>
                        <Breadcrumb history={defaultHistory} />
                    </DesignSystem>
                </BrowserRouter>,
            );

            expect(breadcrumb).toMatchSnapshot();
        });

        test('Matches snapshot (Dropdown open with long text)', () => {
            const hiddenRoute: NavListOption = {
                label: 'FOUR IS GOING TO BE TOO LONG FOR THE ACTUAL DROPDOWN SO IT WILL HAVE ELLIPSIS',
                href: '/too-long',
                value: 'three',
            };
            const history = [
                ...defaultHistory,
                hiddenRoute,
            ];
            jest.mocked(useBreadcrumbRoutes).mockReturnValue({
                shownRoutes: defaultHistory,
                hiddenRoutes: [hiddenRoute],
                overflow: { horizontal: true, vertical: false },
            });

            const { getByTestId } = render(
                <BrowserRouter>
                    <DesignSystem>
                        <Breadcrumb history={history} />
                    </DesignSystem>
                </BrowserRouter>,
            );

            fireEvent.click(getByTestId('ellipse-button'));
        });
    });

    test('Menu should be hidden by default', () => {
        jest.mocked(useBreadcrumbRoutes).mockReturnValue({
            shownRoutes: shownOverflowHistory,
            hiddenRoutes: hiddenOverflowHistory,
            overflow: { horizontal: true, vertical: false },
        });
        const { getByTestId } = render(
            <BrowserRouter>
                <DesignSystem>
                    <Breadcrumb
                        history={[...shownOverflowHistory, ...hiddenOverflowHistory]}
                    />
                </DesignSystem>
            </BrowserRouter>,
        );

        expect(getByTestId('nav-list').getAttribute('hidden')).toBe('');
    });

    test('Menu should be displayed when button is clicked', async () => {
        jest.mocked(useBreadcrumbRoutes).mockReturnValue({
            shownRoutes: shownOverflowHistory,
            hiddenRoutes: hiddenOverflowHistory,
            overflow: { horizontal: true, vertical: false },
        });
        const { queryByTestId, getByTestId } = render(
            <BrowserRouter>
                <DesignSystem>
                    <Breadcrumb history={[...shownOverflowHistory, ...hiddenOverflowHistory]} />
                </DesignSystem>
            </BrowserRouter>,
        );
        await waitFor(() => expect(queryByTestId('ellipse-button')).toBeTruthy());
        fireEvent.click(getByTestId('ellipse-button'));

        expect(getByTestId('nav-list').getAttribute('hidden')).toBe(null);
    });
});
