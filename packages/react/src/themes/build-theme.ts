import { devConsole } from '../utils/dev-console';
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
    RefTokenMap,
    AliasTokenMap,
    ComponentTokenMap,
} from './tokens';
import {
    ResolvedTheme,
    ThemeCustomization,
} from './theme';

interface MergedTheme {
    ref: RefTokenMap;
    alias: AliasTokenMap;
    component: ComponentTokenMap;
}

function mergeTheme(customization: ThemeCustomization): MergedTheme {
    // Merge the default theme with the customization provided
    return {
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
        if (isRefToken(token)) {
            return mergedTheme.ref[token];
        }

        if (isAliasToken(token)) {
            const aliasToken = mergedTheme.alias[token];

            if (aliasToken === token) {
                devConsole.error(`Self-referencing AliasToken detected: '${token}'`);
                return '';
            }

            return resolveToken(aliasToken);
        }

        devConsole.error(`Token '${token}' not found in RefTokens or AliasTokens`);
        return '';
    }

    // Resolve component tokens
    Object.keys(mergedTheme.component).forEach((token) => {
        if (isComponentToken(token)) {
            const tokenToResolve = mergedTheme.component[token];
            const resolvedToken = tokenToResolve ? resolveToken(tokenToResolve)
                : devConsole.error('Token is undefined.');
            resolvedTheme.component[token] = resolvedToken || '';
        }
    });

    return resolvedTheme;
}
