import { renderHook } from '@testing-library/react-hooks';
import { useBreadcrumbOverflow } from './use-breadcrumb-overflow';
import { useBreadcrumbRoutes } from './use-breadcrumb-routes';

const firstElement = { label: 'HOME', value: 'index', href: '/index' };
const secondElement = { label: 'ROUTE', value: 'route', href: '/route' };
const thirdElement = { label: 'THREE', value: 'three', href: '/three' };
const defaultHistory = [firstElement, secondElement, thirdElement];

jest.mock('./use-breadcrumb-layout-effect', () => ({
    useBreadcrumbLayoutEffect: jest.fn(),
}));

jest.mock('./use-breadcrumb-overflow', () => ({
    useBreadcrumbOverflow: jest.fn(),
}));

describe('useBreadcrumpRoutes', () => {
    it('should include routes in the initial shown routes', () => {
        jest.mocked(useBreadcrumbOverflow).mockReturnValue({ horizontal: false, vertical: false });

        const { result } = renderHook(() => useBreadcrumbRoutes(
            defaultHistory,
            {
                current: {
                    offsetHeight: 100,
                    offsetWidth: 100,
                    scrollHeight: 99,
                    scrollWidth: 100,
                } as HTMLDivElement,
            },
        ));

        expect(result.current.shownRoutes).toEqual([firstElement, secondElement, thirdElement]);
    });
});
