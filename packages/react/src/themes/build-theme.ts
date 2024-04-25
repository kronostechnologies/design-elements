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

interface CustomizedTheme {
    ref: RefTokenMap;
    alias: AliasTokenMap;
    component: ComponentTokenMap;
}

function customizeTheme(customization: ThemeCustomization): CustomizedTheme {
    return {
        ref: { ...defaultRefTokens, ...customization.ref },
        alias: { ...defaultAliasTokens, ...customization.alias },
        component: { ...defaultComponentTokens, ...customization.component },
    };
}

export function buildTheme(customization: ThemeCustomization): ResolvedTheme {
    const customizedTheme = customizeTheme(customization);

    const resolvedTheme: ResolvedTheme = {
        ...customizedTheme,
        component: {} as ResolvedComponentTokens,
    };

    function resolveToken(token: AliasTokens | RefTokens): RefTokenValue {
        if (isRefToken(token)) {
            return customizedTheme.ref[token];
        }

        if (isAliasToken(token)) {
            const aliasToken = customizedTheme.alias[token];

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
    Object.keys(customizedTheme.component).forEach((token) => {
        if (isComponentToken(token)) {
            const tokenToResolve = customizedTheme.component[token];
            const resolvedToken = tokenToResolve ? resolveToken(tokenToResolve)
                : devConsole.error('Token is undefined.');
            resolvedTheme.component[token] = resolvedToken || '';
        }
    });

    return resolvedTheme;
}
