import { ResolvedTheme } from './themes/tokens/theme';

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends ResolvedTheme {
    }
}
