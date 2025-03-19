import { act, renderHook, waitFor } from '@testing-library/react';
import { useCarousel, UseCarouselOptions, UseCarouselResponse } from './use-carousel';

describe('useCarousel', () => {
    describe('Initial options', () => {
        it('should show slide 0 on init', () => {
            const initialProps: UseCarouselOptions = { length: 5 };

            const { result } = renderHook<UseCarouselResponse, UseCarouselOptions>(useCarousel, { initialProps });

            expect(result.current.active).toEqual(0);
            expect(result.current.style.marginLeft).toEqual('-100%');
        });

        it('should set active slide from initialSlide option on init', async () => {
            const initialProps: UseCarouselOptions = { length: 5, initial: 2 };

            const { result } = renderHook<UseCarouselResponse, UseCarouselOptions>(
                useCarousel,
                { initialProps },
            );

            await waitFor(() => expect(result.current.active).toEqual(2));
            expect(result.current.style.marginLeft).toEqual('-300%');
        });
    });

    it('should change active slide when setActive is called', async () => {
        const initialProps: UseCarouselOptions = { length: 5 };
        const { result } = renderHook<UseCarouselResponse, UseCarouselOptions>(
            useCarousel,
            { initialProps },
        );

        act(() => {
            result.current.setActive(3);
        });
        await waitFor(() => expect(result.current.active).toEqual(3));

        expect(result.current.style.marginLeft).toEqual('-400%');
    });

    describe('onNext handler', () => {
        it('should set next slide as active', async () => {
            const initialProps: UseCarouselOptions = { length: 5, initial: 2 };
            const { result } = renderHook<UseCarouselResponse, UseCarouselOptions>(
                useCarousel,
                { initialProps },
            );

            act(() => {
                result.current.handlers.onNext();
            });

            await waitFor(() => expect(result.current.active).toEqual(3));
        });

        it('should not set next slide as active when loop is false and active slide is last', async () => {
            const initialProps: UseCarouselOptions = { length: 5, initial: 4, loop: false };
            const { result } = renderHook<UseCarouselResponse, UseCarouselOptions>(
                useCarousel,
                { initialProps },
            );

            act(() => {
                result.current.handlers.onNext();
            });

            await waitFor(() => expect(result.current.active).toEqual(4));
        });

        it('should set first slide as active when loop is true and active slide is last', async () => {
            const initialProps: UseCarouselOptions = { length: 5, initial: 4, loop: true };
            const { result } = renderHook<UseCarouselResponse, UseCarouselOptions>(
                useCarousel,
                { initialProps },
            );

            act(() => {
                result.current.handlers.onNext();
            });

            await waitFor(() => expect(result.current.active).toEqual(0));
        });
    });

    describe('onPrevious handler', () => {
        it('should set previous slide as active when onPrevious handler is called', async () => {
            const initialProps: UseCarouselOptions = { length: 5, initial: 2 };
            const { result } = renderHook<UseCarouselResponse, UseCarouselOptions>(
                useCarousel,
                { initialProps },
            );

            act(() => {
                result.current.handlers.onPrevious();
            });
            await waitFor(() => expect(result.current.active).toEqual(1));
        });

        it('should not set last slide as active when loop is false and active slide is first', async () => {
            const initialProps: UseCarouselOptions = { length: 5, initial: 0, loop: false };
            const { result } = renderHook<UseCarouselResponse, UseCarouselOptions>(
                useCarousel,
                { initialProps },
            );

            act(() => {
                result.current.handlers.onPrevious();
            });

            await waitFor(() => expect(result.current.active).toEqual(0));
        });

        it('should set last slide as active when loop is true and active slide is first', async () => {
            const initialProps: UseCarouselOptions = { length: 5, initial: 0, loop: true };
            const { result } = renderHook<UseCarouselResponse, UseCarouselOptions>(
                useCarousel,
                { initialProps },
            );

            act(() => {
                result.current.handlers.onPrevious();
            });
            await waitFor(() => expect(result.current.active).toEqual(4));
        });
    });

    it('should change active slide after autoTransitionDelay', async () => {
        jest.useFakeTimers();
        const autoTransitionDelay = 2000;
        const transitionTime = 1;
        const initialProps: UseCarouselOptions = { length: 5, autoTransitionDelay, transitionTime };
        const { result } = renderHook<UseCarouselResponse, UseCarouselOptions>(
            useCarousel,
            { initialProps },
        );

        act(() => {
            jest.runOnlyPendingTimers(); // Run autoTransition
            jest.useRealTimers();
        });
        await waitFor(() => expect(result.current.active).toEqual(1));
    });
});
