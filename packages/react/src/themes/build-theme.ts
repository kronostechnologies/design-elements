import { devConsole } from '../utils/dev-console';
import { ResolvedTheme, ThemeCustomization } from './theme';
import {
    AliasTokenMap,
    AliasTokens,
    ComponentTokenMap,
    defaultAliasTokens,
    defaultComponentTokens,
    defaultRefTokens,
    isAliasToken,
    isComponentToken,
    isRefToken,
    RefTokenMap,
    RefTokens,
    RefTokenValue,
    ResolvedComponentTokens,
} from './tokens';

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
