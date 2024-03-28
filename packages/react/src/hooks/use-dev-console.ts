type DevConsole = Pick<Console, 'log' | 'info' | 'warn' | 'error'>;

// eslint-disable-next-line no-underscore-dangle
const inDevMode = globalThis.__DS_DEV__;

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): void {}

/* eslint-disable no-console */
export function useDevConsole(): DevConsole {
    return {
        log: inDevMode ? console.log : noop,
        info: inDevMode ? console.info : noop,
        warn: inDevMode ? console.warn : noop,
        error: inDevMode ? console.error : noop,
    };
}
