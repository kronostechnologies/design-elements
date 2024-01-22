import { defaultMain, defaultGreys, defaultNotifications, defaultTokens, defaultTheme } from '../default-theme';
import { AliasTokenKeys, AliasTokens } from './alias-tokens';
import { ComponentTokens } from './component-tokens';
import { RefTokenKeys, RefTokens } from './ref-tokens';
import { Theme, ThemeCustomization } from './theme';

export function mergeTheme(customization: ThemeCustomization): Theme {
    // Merge the default theme with the customization provided
    const mergedTheme: ThemeCustomization = {
        ref: { ...defaultTheme.ref, ...customization.ref },
        alias: { ...defaultTheme.alias, ...customization.alias },
        component: { ...defaultTheme.component, ...customization.component },
    };

    function isRefToken(token: string): token is RefTokenKeys {
        // @ts-ignore-typing
        return mergedTheme.ref && token in mergedTheme.ref;
    }

    function isAliasToken(token: string): token is AliasTokenKeys {
        // @ts-ignore-typing
        return mergedTheme.alias && token in mergedTheme.alias;
    }

    // Resolve references within the theme
    function resolveToken(token: keyof AliasTokens | keyof RefTokens | undefined): string {
        if (token && isRefToken(token)) {
            return mergedTheme.ref![token];
        }

        if (token && isAliasToken(token)) {
            const aliasToken = mergedTheme.alias![token];
            return resolveToken(aliasToken);
        }

        // Fallback in case of unresolved token
        throw new Error(`Token '${token}' not found in RefTokens or AliasTokens`);
    }

    // Final theme with resolved values
    const finalTheme: Theme = {
        main: defaultMain,
        greys: defaultGreys,
        notifications: defaultNotifications,
        tokens: defaultTokens,
        ref: mergedTheme.ref as RefTokens,
        alias: mergedTheme.alias as AliasTokens,
        component: {} as ComponentTokens,
    };

    // Resolve component tokens
    if (mergedTheme.component) {
        Object.keys(mergedTheme.component).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(mergedTheme.component, key)) {
                const token = mergedTheme.component![key as keyof ComponentTokens];
                finalTheme.component[key as keyof ComponentTokens] = resolveToken(token);
            }
        });
    }

    return finalTheme;
}
