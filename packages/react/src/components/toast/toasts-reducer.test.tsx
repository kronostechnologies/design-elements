import { Toast } from './toast-context';
import { toastsReducer, ToastsState } from './toasts-reducer';

describe('toastsReducer', () => {
    const toast: Toast = { id: 'an id', type: 'neutral', message: 'a message' };

    it('should add toast to state', () => {
        const anotherToast: Toast = { id: 'another id', type: 'neutral', message: 'a message' };
        const currentState: ToastsState = [toast];

        const newState = toastsReducer(currentState, { type: 'add', toast: anotherToast });

        expect(newState).not.toBe(currentState);
        expect(newState).toEqual([toast, anotherToast]);
    });

    it('should remove toast from state when id matches', () => {
        const currentState: ToastsState = [toast];

        const newState = toastsReducer(currentState, { type: 'remove', id: toast.id });

        expect(newState).not.toBe(currentState);
        expect(newState).toStrictEqual([]);
    });

    it('should not remove toast from state when id does not match', () => {
        const currentState: ToastsState = [toast];

        const newState = toastsReducer(currentState, { type: 'remove', id: 'unexisting toast id' });

        expect(newState).not.toBe(currentState);
        expect(newState).toStrictEqual([toast]);
    });
});
