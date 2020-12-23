// Source : https://gist.github.com/FlorianRappl/fee731eea985d983fc48d10c648ecb17

import { clamp } from '@design-elements/utils/math';
import { CSSProperties, Dispatch, useCallback, useEffect, useReducer } from 'react';
import { SwipeableHandlers, SwipeEventData, useSwipeable } from 'react-swipeable';
import { CarouselAction, carouselReducer, CarouselState } from './carousel-reducer';

type PreviousDirection = -1;
type NextDirection = 1;
type CarouselDirection = NextDirection | PreviousDirection;

interface CarouselHandlers {
    mouse: SwipeableHandlers;

    onNext(): void;

    onPrevious(): void;
}

export interface UseCarouselResponse {
    active: number;
    handlers: CarouselHandlers;
    style: CSSProperties;

    setActive(desired: number): void;
}

export interface UseCarouselOptions {
    autoTransitionDelay?: number;
    initial?: number;
    length: number;
    loop?: boolean;
    trackMouse?: boolean;
    trackTouch?: boolean;
    transitionTime?: number;
}

const FORWARD = 1;
const BACKWARD = -1;
const PADDING_SLIDES = 2;

function canSwipe(e: SwipeEventData, state: CarouselState): boolean {
    const direction = Math.sign(-e.deltaX);
    const isDraggingLastForward = state.active === state.length - 1 && direction === FORWARD;
    const isDraggingFirstBackward = state.active === 0 && direction === BACKWARD;

    return state.loop || (!state.loop && !isDraggingFirstBackward && !isDraggingLastForward);
}

function getClientWidth(target: EventTarget | null): number {
    return (target as HTMLElement).clientWidth;
}

function getSlideWidth(target: EventTarget | null, slidesCount: number): number {
    return getClientWidth(target) / (slidesCount + PADDING_SLIDES);
}

function threshold(target: EventTarget | null, slidesCount: number): number {
    if (target === null) {
        return 0;
    }

    return getSlideWidth(target, slidesCount) / 3;
}

function onSwiped(
    e: SwipeEventData,
    dispatch: Dispatch<CarouselAction>,
    state: CarouselState,
    direction: CarouselDirection,
): void {
    if (canSwipe(e, state)) {
        const delta = direction * -e.deltaX;
        if (delta >= threshold(e.event.currentTarget, state.length)) {
            dispatch({ type: direction === FORWARD ? 'next' : 'previous' });
        } else {
            dispatch({
                type: 'drag',
                offset: 0,
            });
        }
    }
}

function updateStyleForDraggingTransition(state: CarouselState, style: CSSProperties, transitionTime: number): void {
    if (state.offset !== 0) {
        // eslint-disable-next-line no-param-reassign
        style.transform = `translateX(${state.offset}px)`;
    } else {
        // eslint-disable-next-line no-param-reassign
        style.transition = `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
    }
}

interface NavigationTransition {
    distance: number;
    directionFromActive: CarouselDirection;
}

function getNavigationTransition(state: CarouselState): NavigationTransition {
    let distance: number;
    let directionFromActive: CarouselDirection;
    if (state.loop && state.desired === 0 && state.active > state.length / 2) {
        distance = state.length - state.active;
        directionFromActive = BACKWARD;
    } else if (state.loop && state.desired === state.length - 1 && state.active < Math.floor(state.length / 2)) {
        distance = state.length - (state.desired - state.active);
        directionFromActive = FORWARD;
    } else {
        distance = Math.abs(state.desired - state.active);
        directionFromActive = Math.sign(state.active - state.desired) as CarouselDirection;
    }

    return { distance, directionFromActive };
}

function updateStyleForTransitionToActive(state: CarouselState, style: CSSProperties, transitionTime: number): void {
    const directionFromDrag = Math.sign(state.offset || 0);
    const { distance, directionFromActive }: NavigationTransition = getNavigationTransition(state);

    let shift: number;
    if (directionFromDrag) {
        shift = 100 * directionFromDrag / (state.length + 2);
    } else {
        shift = 100 * directionFromActive / (state.length + 2) * distance;
    }

    // eslint-disable-next-line no-param-reassign
    style.transition = `transform ${transitionTime}ms ease`;
    // eslint-disable-next-line no-param-reassign
    style.transform = `translateX(${shift}%)`;
}

export function useCarousel(
    {
        transitionTime = 0,
        initial = 0,
        autoTransitionDelay,
        length,
        loop = false,
        trackMouse = false,
        trackTouch = true,
    }: UseCarouselOptions,
): UseCarouselResponse {
    const initialCarouselState: CarouselState = {
        active: initial,
        desired: initial,
        offset: 0,
        length,
        loop,
    };
    const [state, dispatch] = useReducer(carouselReducer, initialCarouselState);
    const swipeableHandlers: SwipeableHandlers = useSwipeable({
        onSwiping(e: SwipeEventData): void {
            if (canSwipe(e, state)) {
                const maxOffset = getSlideWidth(e.event.currentTarget, state.length);
                dispatch({
                    type: 'drag',
                    offset: clamp(-maxOffset, maxOffset, e.deltaX),
                });
            }
        },
        onSwipedLeft(e: SwipeEventData): void {
            onSwiped(e, dispatch, state, FORWARD);
        },
        onSwipedRight(e: SwipeEventData): void {
            onSwiped(e, dispatch, state, BACKWARD);
        },
        trackMouse,
        trackTouch,
    });

    const previousHandler: () => void = useCallback(() => {
        if (state.loop || (!state.loop && state.active > 0)) {
            dispatch({ type: 'previous' });
        }
    }, [state.loop, state.active]);

    const nextHandler: () => void = useCallback(() => {
        if (state.loop || (!state.loop && state.active < state.length - 1)) {
            dispatch({ type: 'next' });
        }
    }, [state.active, state.loop, state.length]);

    useEffect(() => {
        if (autoTransitionDelay !== undefined && Number.isFinite(autoTransitionDelay)) {
            const delay = Math.max(autoTransitionDelay, transitionTime);
            const id = setTimeout(nextHandler, delay);
            return () => clearTimeout(id);
        }
        return undefined;
    }, [transitionTime, nextHandler, autoTransitionDelay, state.offset, state.active]);

    useEffect(() => {
        const id = setTimeout(() => dispatch({ type: 'done' }), transitionTime);
        return () => clearTimeout(id);
    }, [state.desired, transitionTime]);

    const style: CSSProperties = {
        marginLeft: `-${(state.active + 1) * 100}%`,
        transform: 'translateX(0)',
        width: `${100 * (length + 2)}%`,
    };

    if (state.desired !== state.active) {
        updateStyleForTransitionToActive(state, style, transitionTime);
    } else if (!Number.isNaN(state.offset)) {
        updateStyleForDraggingTransition(state, style, transitionTime);
    }

    return {
        active: state.active,
        handlers: {
            mouse: swipeableHandlers,
            onPrevious: previousHandler,
            onNext: nextHandler,
        },
        setActive: (desired) => dispatch({ type: 'jump', desired }),
        style,
    };
}
