import { ResolvedTheme } from './themes/theme';

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends ResolvedTheme {
    }
}
