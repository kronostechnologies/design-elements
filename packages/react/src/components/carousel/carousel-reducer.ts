export interface CarouselState {
    active: number;
    desired: number;
    offset: number;
    length: number;
    loop: boolean;
}

interface CarouselNextAction {
    type: 'next';
}

interface CarouselPrevAction {
    type: 'previous';
}

interface CarouselJumpAction {
    type: 'jump';
    desired: number;
}

interface CarouselDoneAction {
    type: 'done';
}

interface CarouselDragAction {
    type: 'drag';
    offset: number;
}

export type CarouselAction =
    | CarouselJumpAction
    | CarouselNextAction
    | CarouselPrevAction
    | CarouselDragAction
    | CarouselDoneAction;

export function carouselReducer(state: CarouselState, action: CarouselAction): CarouselState {
    switch (action.type) {
        case 'jump':
            return {
                ...state,
                desired: action.desired,
            };
        case 'next':
            return {
                ...state,
                desired: next(state.length, state.active),
            };
        case 'previous':
            return {
                ...state,
                desired: previous(state.length, state.active),
            };
        case 'done':
            return {
                ...state,
                offset: NaN,
                active: state.desired,
            };
        case 'drag':
            return {
                ...state,
                offset: action.offset,
            };
        default:
            return state;
    }
}

function previous(length: number, current: number): number {
    return (current - 1 + length) % length;
}

function next(length: number, current: number): number {
    return (current + 1) % length;
}
