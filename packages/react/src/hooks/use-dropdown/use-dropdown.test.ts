import { act, renderHook } from '@testing-library/react';
import { useDropdown } from './use-dropdown';

type IntersectionCallback = (entries: Pick<IntersectionObserverEntry, 'isIntersecting'>[]) => void;

class IntersectionObserverMock {
    static instances: IntersectionObserverMock[] = [];

    readonly observe = jest.fn();

    readonly disconnect = jest.fn();

    constructor(readonly callback: IntersectionCallback) {
        IntersectionObserverMock.instances.push(this);
    }
}

function lastObserver(): IntersectionObserverMock {
    return IntersectionObserverMock.instances[IntersectionObserverMock.instances.length - 1];
}

function setReferenceIntersecting(isIntersecting: boolean): void {
    act(() => lastObserver().callback([{ isIntersecting }]));
}

interface OpenDropdown {
    reference: HTMLElement;
    floating: HTMLElement;
    rerender(props: { open: boolean }): void;
}

function renderOpenDropdown(): OpenDropdown {
    const reference = document.createElement('button');
    const floating = document.createElement('div');
    document.body.append(reference, floating);

    const { result, rerender } = renderHook(
        ({ open }) => useDropdown<HTMLElement>({ open }),
        { initialProps: { open: true } },
    );
    act(() => {
        result.current.refs.setReference(reference);
        result.current.refs.setFloating(floating);
    });

    return { reference, floating, rerender };
}

describe('useDropdown', () => {
    afterEach(() => {
        document.body.replaceChildren();
    });

    describe('with IntersectionObserver', () => {
        beforeEach(() => {
            IntersectionObserverMock.instances = [];
            Object.defineProperty(window, 'IntersectionObserver', {
                configurable: true,
                writable: true,
                value: IntersectionObserverMock,
            });
        });

        afterEach(() => {
            Reflect.deleteProperty(window, 'IntersectionObserver');
        });

        it('observes the reference while open', () => {
            const { reference } = renderOpenDropdown();

            expect(lastObserver().observe).toHaveBeenCalledWith(reference);
        });

        it('hides the dropdown when the reference is scrolled out of view', () => {
            const { floating } = renderOpenDropdown();

            setReferenceIntersecting(false);

            expect(floating).toHaveStyle({ visibility: 'hidden' });
        });

        it('shows the dropdown again when the reference is scrolled back into view', () => {
            const { floating } = renderOpenDropdown();
            setReferenceIntersecting(false);

            setReferenceIntersecting(true);

            expect(floating).toBeVisible();
        });

        it('stops observing the reference once closed', () => {
            const { rerender } = renderOpenDropdown();
            const observer = lastObserver();

            rerender({ open: false });

            expect(observer.disconnect).toHaveBeenCalled();
        });
    });

    it('keeps the dropdown visible without IntersectionObserver', () => {
        const { floating } = renderOpenDropdown();

        expect(floating).toBeVisible();
    });
});
