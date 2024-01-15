import { Palette, AliasTokens, ComponentTokens } from './index';

export type RefTokens = Palette

export interface ThemeCustomization {
    ref: Partial<RefTokens>;
    alias: Partial<AliasTokens>;
    component: Partial<ComponentTokens>;
}

export interface Theme {
    main: {
        'primary-1.1': string;
        'primary-1.2': string;
        'primary-1.3': string;
        'primary-1.4': string;
        'primary-2': string;
        'primary-3': string;
        'secondary-4.1': string;
        'secondary-4.2': string;
        'secondary-4.3': string;
    };
    greys: {
        'white': string;
        'neutral-90': string;
        'colored-white': string;
        'light-grey': string;
        'grey': string;
        'mid-grey': string;
        'dark-grey': string;
        'black': string;
    };
    notifications: {
        'info-1.1': string;
        'neutral-1.1': string;
        'discovery-1.1': string;
        'success-1.1': string;
        'success-1.2': string;
        'success-1.3': string;
        'alert-2.1': string;
        'alert-2.2': string;
        'warning-3.1': string;
        'warning-3.2': string;
        'warning-3.3': string;
        'warning-3.4': string;
    };
    tokens: {
        'focus-box-shadow': string;
        'focus-box-shadow-inset': string;
        'focus-border-box-shadow': string;
        'focus-border-box-shadow-inset': string;
        'focus-border': string;
        'modal-overlay-background-color': string;
        'overlay-box-shadow': string;
    };
    ref: RefTokens;
    alias: AliasTokens;
    component: ComponentTokens;
}

/*
 import { defaultTheme } from '../default-theme';

 export function mergeTheme(customization: ThemeCustomization): Theme {
 const finalRefTokens: RefTokens = { ...defaultTheme.ref };
 const finalAliasTokens: AliasTokens = { ...defaultTheme.alias };
 const finalComponentTokens: ComponentTokens = { ...defaultTheme.component };

 // Resolve and merge ref tokens
 for (const key in customization.ref) {
 if (customization.ref[key]) {
 finalRefTokens[key as keyof Palette] = customization.ref[key]!;
 }
 }

 const resolveAliasToken = (token: keyof AliasTokens | keyof Palette): string => {
 if (finalRefTokens[token as keyof Palette]) {
 return finalRefTokens[token as keyof Palette];
 } else if (finalAliasTokens[token as keyof AliasTokens]) {
 return resolveAliasToken(finalAliasTokens[token as keyof AliasTokens] as keyof AliasTokens);
 }
 throw new Error(`Token '${token}' not found in Palette or AliasTokens`);
 };

 // Resolve and merge alias tokens
 for (const key in customization.alias) {
 if (customization.alias[key]) {
 // @ts-ignore
 finalAliasTokens[key as keyof AliasTokens] = resolveAliasToken(customization.alias[key]!);
 }
 }

 // Resolve and merge component tokens
 for (const key in customization.component) {
 if (customization.component[key]) {
 const tokenReference = customization.component[key]!;
 finalComponentTokens[key as keyof ComponentTokens] = resolveAliasToken(tokenReference);
 }
 }

 // Return the computed Theme object
 return {
 ref: finalRefTokens,
 alias: finalAliasTokens,
 component: finalComponentTokens,
 };
 }
 */

/*
 export interface Theme {
 main: {
 'primary-1.1': string;
 'primary-1.2': string;
 'primary-1.3': string;
 'primary-1.4': string;
 'primary-2': string;
 'primary-3': string;
 'secondary-4.1': string;
 'secondary-4.2': string;
 'secondary-4.3': string;
 };
 greys: {
 'white': string;
 'neutral-90': string;
 'colored-white': string;
 'light-grey': string;
 'grey': string;
 'mid-grey': string;
 'dark-grey': string;
 'black': string;
 };
 notifications: {
 'info-1.1': string;
 'neutral-1.1': string;
 'discovery-1.1': string;
 'success-1.1': string;
 'success-1.2': string;
 'success-1.3': string;
 'alert-2.1': string;
 'alert-2.2': string;
 'warning-3.1': string;
 'warning-3.2': string;
 'warning-3.3': string;
 'warning-3.4': string;
 };
 tokens: {
 'focus-box-shadow': string;
 'focus-box-shadow-inset': string;
 'focus-border-box-shadow': string;
 'focus-border-box-shadow-inset': string;
 'focus-border': string;
 'modal-overlay-background-color': string;
 'overlay-box-shadow': string;
 };
 }
 */
