import { Theme } from '@design-elements/components/theme-wrapper/theme-wrapper';

declare module 'styled-components' {
    interface DefaultTheme extends Theme {
    }
}
