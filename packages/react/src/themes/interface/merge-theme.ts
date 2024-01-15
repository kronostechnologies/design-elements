import { defaultTheme } from '../default-theme';
import { Theme, ThemeCustomization } from './theme';

/*
 import { AliasTokens } from './alias-tokens';
 import { RefTokens } from './ref-tokens';

function resolveTokenValue(token: keyof RefTokens | keyof AliasTokens, theme: Theme): string {
    // Check if the token is a palette color
    if (theme.ref[token as keyof RefTokens]) {
        return theme.ref[token as keyof RefTokens];
    }

    // If it's an alias token, recursively resolve it
    const aliasValue = theme.alias[token as keyof AliasTokens];
    if (aliasValue) {
        return resolveTokenValue(aliasValue, theme);
    }

    // Fallback in case of unresolved token
    throw new Error(`Token '${token}' not found in RefTokens or AliasTokens`);
}
*/

export function mergeTheme(customization: ThemeCustomization): Theme {
    const finalTheme = { ...defaultTheme };

    // Resolve and merge ref tokens
    if (customization.ref) {
        finalTheme.ref = { ...finalTheme.ref, ...customization.ref };
        console.log('Default RefTokens: ', defaultTheme.ref);
        console.log('Customization RefTokens: ', customization.ref);
        console.log('Final RefTokens: ', finalTheme.ref);
    }

    /*
    // Resolve and merge alias tokens
    if (customization.alias) {
        finalTheme.alias = { ...finalTheme.alias, ...customization.alias };
        // Object.keys(finalTheme.alias).forEach((key) => {
        // finalTheme.alias[key] = resolveTokenValue(finalTheme.alias[key], finalTheme);
        // });
    }

    // Resolve and merge component tokens
    if (customization.component) {
        finalTheme.component = { ...finalTheme.component, ...customization.component };
        // Object.keys(finalTheme.component).forEach((key) => {
        // finalTheme.component[key] = resolveTokenValue(finalTheme.component[key], finalTheme);
        // });
    }
*/
    // Return the computed Theme object
    return {
        main: defaultTheme.main,
        greys: defaultTheme.greys,
        notifications: defaultTheme.notifications,
        tokens: defaultTheme.tokens,
        ref: finalTheme.ref,
        alias: finalTheme.alias,
        component: finalTheme.component,
    };
}
