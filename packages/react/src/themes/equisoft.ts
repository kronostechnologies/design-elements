import { buildTheme } from './build-theme';
import { ThemeCustomization } from './theme';
import { defaultAliasTokens, defaultComponentTokens, defaultRefTokens } from './tokens';

const equisoftThemeCustomization: ThemeCustomization = {
    ref: defaultRefTokens,
    alias: defaultAliasTokens,
    component: defaultComponentTokens,
};

export const equisoftTheme = buildTheme(equisoftThemeCustomization);
