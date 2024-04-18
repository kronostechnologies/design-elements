import { buildTheme } from './build-theme';
import { defaultComponentTokens, defaultAliasTokens, defaultRefTokens } from './tokens';
import { ThemeCustomization } from './theme';

export const defaultThemeCustomization: ThemeCustomization = {
    ref: defaultRefTokens,
    alias: defaultAliasTokens,
    component: defaultComponentTokens,
};

export const defaultTheme = buildTheme(defaultThemeCustomization);
