import { ThemeCustomization } from './tokens/theme';
import {
    defaultAliasTokens,
    defaultPaletteTokens,
    defaultTextAttributeTokens,
    defaultTheme,
} from './default-theme';

export const equisoftTheme: ThemeCustomization = {
    ref: {
        ...defaultPaletteTokens,
        ...defaultTextAttributeTokens,
    },
    alias: defaultAliasTokens,
    component: defaultTheme.component,
};
