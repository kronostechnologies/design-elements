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
    'focus-border-color': 'color-brand-50',
    'focus-box-shadow-color': 'color-brand-20',
    'focus-box-shadow-inset-color': 'color-brand-20',
    'focus-border-box-shadow-color-1': 'color-brand-50',
    'focus-border-box-shadow-color-2': 'color-brand-20',
    'focus-border-box-shadow-inset-color-1': 'color-brand-20',
    'focus-border-box-shadow-inset-color-2': 'color-brand-50',
};

export const defaultTheme: ThemeCustomization = {
    ref: defaultRefTokens,
    alias: defaultAliasTokens,
    component: defaultComponentTokens,
};
