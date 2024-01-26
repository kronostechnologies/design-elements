import { ThemeCustomization } from '../tokens/theme';
import { AliasTokenMap, RefTokenMap } from '../tokens';
import { defaultComponentTokens } from './default-component-tokens';
import { defaultColorUtilityTokens, defaultPaletteTokens, defaultTextAttributeTokens } from './default-ref-tokens';

export const defaultRefTokens: RefTokenMap = {
    ...defaultPaletteTokens,
    ...defaultColorUtilityTokens,
    ...defaultTextAttributeTokens,
};

export const defaultAliasTokens: AliasTokenMap = {
    'button-color-secondary': 'color-brand-05',
    'interaction-color': 'color-brand-05',
};

export const defaultTheme: ThemeCustomization = {
    ref: defaultRefTokens,
    alias: defaultAliasTokens,
    component: defaultComponentTokens,
};
