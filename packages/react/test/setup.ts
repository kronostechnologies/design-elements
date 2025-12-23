/// <reference types="jest-extended" />
import { TextEncoder } from 'util';
// tslint:disable-next-line:no-import-side-effect
import '@testing-library/jest-dom';
import 'jest-styled-components';

globalThis.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;

jest.mock('any.scss', () => ({
    use: jest.fn(),
    unuse: jest.fn(),
    toString: () => 'body {}',
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useLayoutEffect: jest.requireActual('react').useEffect,
}));

{
    let counter = 0;
    jest.mock('../src/utils/uuid', () => ({
        // eslint-disable-next-line no-plusplus
        v4: () => `uuid${++counter}`,
    }));

    beforeEach(() => {
        counter = 0;
    });
}

// Workaround for the offsetParent property in jsdom
Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
    get() { return this.parentElement; },
});

global.ResizeObserver = class {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    observe(): void {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    unobserve(): void {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    disconnect(): void {}
};
