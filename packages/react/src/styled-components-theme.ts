import { ResolvedTheme } from './themes';

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends ResolvedTheme {
    }
}

export {};
