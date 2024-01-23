import {
    defaultMain,
    defaultGreys,
    defaultNotifications,
    defaultTokens,
    defaultThemeCustomization,
} from '../default-theme';
import { AliasTokenMap, AliasTokens } from './alias-tokens';
import { ComponentTokens, ResolvedComponentTokens } from './component-tokens';
import { RefTokenMap, RefTokens, RefTokenValue } from './ref-tokens';
import { Theme, ThemeCustomization } from './theme';

export function mergeTheme(customization: ThemeCustomization): Theme {
    // Merge the default theme with the customization provided
    const mergedTheme: ThemeCustomization = {
        ref: { ...defaultThemeCustomization.ref, ...customization.ref },
        alias: { ...defaultThemeCustomization.alias, ...customization.alias },
        component: { ...defaultThemeCustomization.component, ...customization.component },
    };

    function isRefToken(token: string): token is RefTokens {
        return mergedTheme.ref ? token in mergedTheme.ref : false;
    }

    function isAliasToken(token: string): token is AliasTokens {
        return mergedTheme.alias ? token in mergedTheme.alias : false;
    }

    // Resolve references within the theme
    function resolveToken(token: AliasTokens | RefTokens | undefined): RefTokenValue {
        if (token && isRefToken(token)) {
            return mergedTheme.ref![token] as RefTokenValue;
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
        ref: mergedTheme.ref as RefTokenMap,
        alias: mergedTheme.alias as AliasTokenMap,
        component: {} as ResolvedComponentTokens,
    };

    // Resolve component tokens
    if (mergedTheme.component) {
        Object.keys(mergedTheme.component).forEach((token) => {
            if (Object.prototype.hasOwnProperty.call(mergedTheme.component, token)) {
                const tokenToResolve = mergedTheme.component![token as ComponentTokens];
                finalTheme.component[token as ComponentTokens] = resolveToken(tokenToResolve);
            }
        });
    }

    return finalTheme;
}
