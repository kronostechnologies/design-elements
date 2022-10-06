import { renderHook } from '@testing-library/react-hooks';
import { useBreadcrumbLayoutEffect } from './use-breadcrumb-layout-effect';

const firstElement = { label: 'HOME', value: 'index', href: '/index' };
const secondElement = { label: 'ROUTE', value: 'route', href: '/route' };
const thirdElement = { label: 'THREE', value: 'three', href: '/three' };
const fourthElement = { label: 'FOUR', value: 'four', href: '/four' };
const fifthElement = { label: 'FOURTH', value: 'fourth', href: '/five' };
const defaultHistory = [firstElement, secondElement, thirdElement, fourthElement, fifthElement];

describe('useBreadcrumbLayoutEffect', () => {
    describe('overflow horizontal', () => {
        it('should hide one route', () => {
            const setHiddenRoutes = jest.fn();
            const setShownRoutes = jest.fn();

            renderHook(useBreadcrumbLayoutEffect, {
                initialProps: {
                    overflow: {
                        horizontal: true,
                        vertical: false,
                    },
                    shownRoutes: defaultHistory,
                    history: defaultHistory,
                    setHiddenRoutes,
                    setShownRoutes,
                },
            });

            expect(setShownRoutes).toBeCalledWith([firstElement, secondElement, thirdElement, fifthElement]);
            expect(setHiddenRoutes).toBeCalledWith([fourthElement]);
        });

        it('should hide two routes', () => {
            const setHiddenRoutes = jest.fn();
            const setShownRoutes = jest.fn();

            renderHook(useBreadcrumbLayoutEffect, {
                initialProps: {
                    overflow: {
                        horizontal: true,
                        vertical: false,
                    },
                    shownRoutes: [firstElement, secondElement, thirdElement, fifthElement],
                    history: defaultHistory,
                    setHiddenRoutes,
                    setShownRoutes,
                },
            });

            expect(setShownRoutes).toBeCalledWith([firstElement, secondElement, fifthElement]);
            expect(setHiddenRoutes).toBeCalledWith([thirdElement, fourthElement]);
        });

        it('should hide three routes', () => {
            const setHiddenRoutes = jest.fn();
            const setShownRoutes = jest.fn();

            renderHook(useBreadcrumbLayoutEffect, {
                initialProps: {
                    overflow: {
                        horizontal: true,
                        vertical: false,
                    },
                    shownRoutes: [firstElement, secondElement, fifthElement],
                    history: defaultHistory,
                    setHiddenRoutes,
                    setShownRoutes,
                },
            });

            expect(setShownRoutes).toBeCalledWith([firstElement, fifthElement]);
            expect(setHiddenRoutes).toBeCalledWith([secondElement, thirdElement, fourthElement]);
        });

        it('should hide all routes', () => {
            const setHiddenRoutes = jest.fn();
            const setShownRoutes = jest.fn();

            renderHook(useBreadcrumbLayoutEffect, {
                initialProps: {
                    overflow: {
                        horizontal: true,
                        vertical: false,
                    },
                    shownRoutes: [firstElement],
                    history: defaultHistory,
                    setHiddenRoutes,
                    setShownRoutes,
                },
            });

            expect(setShownRoutes).toBeCalledWith([]);
            expect(setHiddenRoutes).toBeCalledWith([
                firstElement,
                secondElement,
                thirdElement,
                fourthElement,
                fifthElement,
            ]);
        });
    });

    describe('no overflow horizontal', () => {
        it('should not hide any routes', () => {
            const setHiddenRoutes = jest.fn();
            const setShownRoutes = jest.fn();

            renderHook(useBreadcrumbLayoutEffect, {
                initialProps: {
                    overflow: {
                        horizontal: false,
                        vertical: false,
                    },
                    shownRoutes: defaultHistory,
                    history: defaultHistory,
                    setHiddenRoutes,
                    setShownRoutes,
                },
            });

            expect(setShownRoutes).toHaveReturnedTimes(0);
            expect(setHiddenRoutes).toHaveReturnedTimes(0);
        });
    });
});
