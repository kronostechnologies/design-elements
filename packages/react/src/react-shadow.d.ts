declare module 'react-shadow' {
    import { FunctionComponent } from 'react';
    import root from 'react-shadow/styled-components';

    export function useShadowRoot(): ShadowRoot | null;

    export function createProxy(
        target: unknown,
        id: string,
        render: FunctionComponent<{ root?: HTMLElement | undefined, ssr?: boolean }>,
    ): typeof root;
}
