import {
    defaultMain,
    defaultGreys,
    defaultNotifications,
    defaultTokens,
    defaultTheme,
} from './default-theme';
import {
    AliasTokenMap,
    AliasTokens,
    ComponentTokens,
    ResolvedComponentTokens,
    RefTokenMap,
    RefTokens,
    RefTokenValue,
} from './tokens';
import { LegacyTheme, Theme, ThemeCustomization } from './tokens/theme';

export function mergeTheme(customization: ThemeCustomization): Theme {
    // Merge the default theme with the customization provided
    const mergedTheme: ThemeCustomization = {
        main: { ...defaultMain, ...customization.main },
        greys: { ...defaultGreys, ...customization.greys },
        notifications: { ...defaultNotifications, ...customization.notifications },
        tokens: { ...defaultTokens, ...customization.tokens },
        ref: { ...defaultTheme.ref, ...customization.ref },
        alias: { ...defaultTheme.alias, ...customization.alias },
        component: { ...defaultTheme.component, ...customization.component },
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

            if (aliasToken === token) {
                // eslint-disable-next-line no-console
                console.error(`Self-referencing AliasToken detected: '${token}'`);
                return '';
            }

            return resolveToken(aliasToken);
        }

        // Fallback in case of unresolved token
        // eslint-disable-next-line no-console
        console.error(`Token '${token}' not found in RefTokens or AliasTokens`);
        return '';
    }

    // Final theme with resolved values
    const finalTheme: Theme = {
        main: mergedTheme.main as LegacyTheme['main'],
        greys: mergedTheme.greys as LegacyTheme['greys'],
        notifications: mergedTheme.notifications as LegacyTheme['notifications'],
        tokens: mergedTheme.tokens as LegacyTheme['tokens'],
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
