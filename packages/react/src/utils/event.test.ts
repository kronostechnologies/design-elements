import { eventIsInside } from './events';

describe('eventIsInside', () => {
    it('should return true when event target\'s is inside the container', () => {
        const container = document.createElement('div');
        const target = document.createElement('a');
        container.appendChild(target);
        const event = {
            target,
        } as Partial<Event> as Event;

        const isInside = eventIsInside(event, container);

        expect(isInside).toBe(true);
    });

    it('should return true when event target\'s is the container', () => {
        const container = document.createElement('div');
        const event = {
            target: container,
        } as Partial<Event> as Event;

        const isInside = eventIsInside(event, container);

        expect(isInside).toBe(true);
    });

    it('should return false when event target\'s is outside the container', () => {
        const container = document.createElement('div');
        const target = document.createElement('a');
        const event = {
            target,
        } as Partial<Event> as Event;

        const isInside = eventIsInside(event, container);

        expect(isInside).toBe(false);
    });

    it('should return true when event target\'s from composedPath is inside the container', () => {
        const container = document.createElement('div');
        const target = document.createElement('a');
        container.appendChild(target);
        const event = {
            composed: true,
            composedPath(): EventTarget[] {
                return [target, container, document];
            },
        } as Partial<Event> as Event;

        const isInside = eventIsInside(event, container);

        expect(isInside).toBe(true);
    });

    it('should return true when event target\'s from composedPath is the container', () => {
        const container = document.createElement('div');
        const event = {
            composed: true,
            composedPath(): EventTarget[] {
                return [container, document];
            },
        } as Partial<Event> as Event;

        const isInside = eventIsInside(event, container);

        expect(isInside).toBe(true);
    });

    it('should return false when event target\'s from composedPath is outside the container', () => {
        const container = document.createElement('div');
        const target = document.createElement('a');
        const event = {
            composed: true,
            composedPath(): EventTarget[] {
                return [target, document];
            },
        } as Partial<Event> as Event;

        const isInside = eventIsInside(event, container);

        expect(isInside).toBe(false);
    });
});
