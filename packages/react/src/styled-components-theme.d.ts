import { Theme } from './themes';

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {
    }
}
