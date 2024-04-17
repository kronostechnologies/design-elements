import {
    AliasTokens,
    ResolvedComponentTokens,
    RefTokens,
    RefTokenValue,
    defaultRefTokens,
    defaultAliasTokens,
    defaultComponentTokens,
    isRefToken,
    isAliasToken,
    isComponentToken,
} from './tokens';
import {
    defaultGreys,
    defaultMain,
    defaultNotifications,
    defaultTokens,
} from './tokens/legacy-tokens';
import {
    MergedTheme,
    ResolvedTheme,
    ThemeCustomization,
} from './theme';

function mergeTheme(customization: ThemeCustomization): MergedTheme {
    // Merge the default theme with the customization provided
    return {
        main: { ...defaultMain, ...customization.main },
        greys: { ...defaultGreys, ...customization.greys },
        notifications: { ...defaultNotifications, ...customization.notifications },
        tokens: { ...defaultTokens, ...customization.tokens },
        ref: { ...defaultRefTokens, ...customization.ref },
        alias: { ...defaultAliasTokens, ...customization.alias },
        component: { ...defaultComponentTokens, ...customization.component },
    };
}

export function buildTheme(customization: ThemeCustomization): ResolvedTheme {
    // Merge the default theme with the customization provided
    const mergedTheme: MergedTheme = mergeTheme(customization);

    const resolvedTheme: ResolvedTheme = {
        ...mergedTheme,
        component: {} as ResolvedComponentTokens,
    };

    function resolveToken(token: AliasTokens | RefTokens): RefTokenValue {
        if (!token) {
            console.error('Token is undefined.');
            return '';
        }

        if (token && isRefToken(token)) {
            return mergedTheme.ref[token];
        }

        if (token && isAliasToken(token)) {
            const aliasToken = mergedTheme.alias[token];

            if (aliasToken === token) {
                console.error(`Self-referencing AliasToken detected: '${token}'`);
                return '';
            }

            return resolveToken(aliasToken);
        }

        console.error(`Token '${token}' not found in RefTokens or AliasTokens`);
        return '';
    }

    // Resolve component tokens
    Object.keys(mergedTheme.component).forEach((token) => {
        if (isComponentToken(token)) {
            const tokenToResolve = mergedTheme.component[token];
            resolvedTheme.component[token] = resolveToken(tokenToResolve);
        }
    });

    return resolvedTheme;
}
