import { renderHook } from '@testing-library/react-hooks';
import { useBreadcrumbOverflow } from './use-breadcrumb-overflow';

const firstElement = { label: 'HOME', value: 'index', href: '/index' };
const secondElement = { label: 'ROUTE', value: 'route', href: '/route' };
const thirdElement = { label: 'THREE', value: 'three', href: '/three' };
const defaultHistory = [firstElement, secondElement, thirdElement];

describe('useBreadcrumpOverflow', () => {
    it('no vertical overflow if scroll height < offset height', () => {
        const { result } = renderHook(useBreadcrumbOverflow, {
            initialProps: {
                shownRoutes: defaultHistory,
                hiddenRoutes: [],
                navRef: {
                    current: {
                        offsetHeight: 100,
                        offsetWidth: 100,
                        scrollHeight: 99,
                        scrollWidth: 100,
                    } as HTMLDivElement,
                },
            },
        });

        expect(result.current.vertical).toBeFalsy();
    });

    it('vertical overflow if scroll height > offset height', () => {
        const { result } = renderHook(useBreadcrumbOverflow, {
            initialProps: {
                shownRoutes: defaultHistory,
                hiddenRoutes: [],
                navRef: {
                    current: {
                        offsetHeight: 100,
                        offsetWidth: 100,
                        scrollHeight: 101,
                        scrollWidth: 100,
                    } as HTMLDivElement,
                },
            },
        });

        expect(result.current.vertical).toBeTruthy();
    });

    it('no horizontal overflow if scroll width < offset width', () => {
        const { result } = renderHook(useBreadcrumbOverflow, {
            initialProps: {
                shownRoutes: defaultHistory,
                hiddenRoutes: [],
                navRef: {
                    current: {
                        offsetHeight: 100,
                        offsetWidth: 100,
                        scrollHeight: 100,
                        scrollWidth: 99,
                    } as HTMLDivElement,
                },
            },
        });

        expect(result.current.horizontal).toBeFalsy();
    });

    it('horizontal overflow if scroll width > offset width', () => {
        const { result } = renderHook(useBreadcrumbOverflow, {
            initialProps: {
                shownRoutes: defaultHistory,
                hiddenRoutes: [],
                navRef: {
                    current: {
                        offsetHeight: 100,
                        offsetWidth: 100,
                        scrollHeight: 100,
                        scrollWidth: 101,
                    } as HTMLDivElement,
                },
            },
        });

        expect(result.current.horizontal).toBeTruthy();
    });
});
