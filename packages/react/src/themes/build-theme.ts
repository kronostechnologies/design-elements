import { devConsole } from '../utils/dev-console';
import { ResolvedTheme, ThemeCustomization, ThemeDeclaration } from './theme';
import {
    AliasToken,
    ComponentToken,
    defaultAliasTokens,
    defaultComponentTokens,
    defaultRefTokens,
    RefToken,
    ResolvedTokenMap,
    TokenValue,
    TokenName,
} from './tokens';

function isRefToken(tokenName: TokenName): tokenName is RefToken {
    return tokenName in defaultRefTokens;
}

function isAliasToken(tokenName: TokenName): tokenName is AliasToken {
    return tokenName in defaultAliasTokens;
}

function isComponentToken(tokenName: TokenName): tokenName is ComponentToken {
    return tokenName in defaultComponentTokens;
}

function customizeTheme(customization: ThemeCustomization): ThemeDeclaration {
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
        component: {} as ResolvedTokenMap<ComponentToken>,
    };

    function resolveToken(token: AliasToken | RefToken): TokenValue {
        if (isRefToken(token)) {
            return resolvedTheme.ref[token];
        }

        if (isAliasToken(token)) {
            const aliasToken = resolvedTheme.alias[token];

            if (aliasToken === token) {
                devConsole.error(`Self-referencing AliasToken detected: '${token}'`);
                return '';
            }

            if (isAliasToken(aliasToken) || isRefToken(aliasToken)) {
                return resolveToken(aliasToken);
            }
            return aliasToken;
        }

        devConsole.error(`Token '${token}' not found in RefTokens or AliasTokens`);
        return '';
    }

    Object.keys(customizedTheme.alias).forEach((token) => {
        if (isAliasToken(token)) {
            const tokenToResolve = customizedTheme.alias[token];
            if (tokenToResolve) {
                resolvedTheme.alias[token] = resolveToken(tokenToResolve);
            } else {
                devConsole.error(`Token "${token}" is undefined.`);
            }
        }
    });

    Object.keys(customizedTheme.component).forEach((token) => {
        if (isComponentToken(token)) {
            const tokenToResolve = customizedTheme.component[token];
            if (tokenToResolve) {
                resolvedTheme.component[token] = resolveToken(tokenToResolve);
            } else {
                devConsole.error(`Token "${token}" is undefined.`);
            }
        }
    });

    return resolvedTheme;
}
