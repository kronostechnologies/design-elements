import { buildTheme } from './build-theme';
import { ThemeCustomization } from './theme';
import { defaultAliasTokens, defaultComponentTokens, defaultRefTokens } from './tokens';

const equisoftThemeCustomization: ThemeCustomization = {
    ref: defaultRefTokens,
    alias: defaultAliasTokens,
    component: defaultComponentTokens,
};

export const equisoftTheme = buildTheme(equisoftThemeCustomization);

export const equisoftColors = {
    'logo-fill': '#ff4338',
    'logo-fill-hover': '#7b1a15',
} as const;
