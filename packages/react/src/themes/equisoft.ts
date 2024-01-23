import { ThemeCustomization } from './interface/theme';
import {
    defaultAliasTokens,
    defaultPaletteTokens,
    defaultTextAttributeTokens,
    defaultThemeCustomization,
} from './default-theme';

export const equisoftTheme: ThemeCustomization = {
    ref: {
        ...defaultPaletteTokens,
        ...defaultTextAttributeTokens,
    },
    alias: defaultAliasTokens,
    component: defaultThemeCustomization.component,
};
