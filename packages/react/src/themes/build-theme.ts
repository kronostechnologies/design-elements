import { devConsole } from '../utils/dev-console';
import { ResolvedTheme, ThemeCustomization, ThemeDeclaration } from './theme';
import {
    AliasToken,
    AliasTokenMap,
    ComponentToken,
    defaultAliasTokens,
    defaultComponentTokens,
    defaultRefTokens,
    RefToken,
    ResolvedTokenMap,
    TokenContext,
    TokenMap,
    TokenName,
    TokenValue,
} from './tokens';

type ContextualizedAliasTokenMap = TokenMap<AliasToken, RefToken | AliasToken>;

interface ContextualizedTheme extends ThemeDeclaration {
    alias: ContextualizedAliasTokenMap;
}

const themeCache: {
    // Inputs
    themeCustomization: ThemeCustomization | undefined;
    activeContext: TokenContext[] | undefined;
    // Build stages
    customizedTheme: ThemeDeclaration | undefined;
    contextualizedTheme: ContextualizedTheme | undefined;
    resolvedTheme: ResolvedTheme | undefined;
} = {
    themeCustomization: undefined,
    activeContext: undefined,
    customizedTheme: undefined,
    contextualizedTheme: undefined,
    resolvedTheme: undefined,
};

function isRefToken(tokenName: TokenName): tokenName is RefToken {
    return tokenName in defaultRefTokens;
}

function isAliasToken(tokenName: TokenName): tokenName is AliasToken {
    return tokenName in defaultAliasTokens;
}

function isComponentToken(tokenName: TokenName): tokenName is ComponentToken {
    return tokenName in defaultComponentTokens;
}

function ensureNoSelfReference<T extends TokenName, U>(
    tokenName: T,
    tokenValue: T | U,
): tokenValue is Exclude<T, typeof tokenName> {
    if (tokenName === tokenValue) {
        devConsole.error(`Self-referencing token detected: '${tokenName}'`);
    }
    return tokenName !== tokenValue;
}

function applyCustomization(customization: ThemeCustomization): ThemeDeclaration {
    const customizedTheme = {
        ref: { ...defaultRefTokens, ...customization.ref },
        alias: { ...defaultAliasTokens, ...customization.alias },
        component: { ...defaultComponentTokens, ...customization.component },
    };

    themeCache.themeCustomization = customizedTheme;

    return customizedTheme;
}

function applyContext(theme: ThemeDeclaration, activeContext: TokenContext[]): ContextualizedTheme {
    const contextualTokens: Partial<{ [Context in TokenContext]: AliasToken[] }> = {};
    const nonContextualTokens: Partial<ContextualizedAliasTokenMap> = {};

    Object.entries(theme.alias).forEach(([contextualTokenName, tokenValue]) => {
        const [tokenName, tokenContext] = contextualTokenName.split(':') as [AliasToken, TokenContext];

        if (activeContext.includes(tokenContext)) {
            if (!contextualTokens[tokenContext]) {
                contextualTokens[tokenContext] = [];
            }
            contextualTokens[tokenContext].push(tokenName);
        } else if (!tokenContext && ensureNoSelfReference(tokenName, tokenValue)) {
            nonContextualTokens[tokenName] = tokenValue;
        }
    });

    const contextResolutions: Partial<AliasTokenMap<AliasToken>> = {};

    activeContext.forEach((tokenContext) => {
        contextualTokens[tokenContext]?.forEach((tokenName) => {
            const contextualValue = theme.alias[`${tokenName}:${tokenContext}`];

            if (contextualValue !== undefined && ensureNoSelfReference(tokenName, contextualValue)) {
                contextResolutions[tokenName] = contextualValue;
            }
        });
    });

    return {
        ...theme,
        alias: { ...nonContextualTokens, ...contextResolutions } as ContextualizedAliasTokenMap,
    };
}

function resolveToken(theme: ThemeDeclaration, tokenName: RefToken | AliasToken): TokenValue {
    if (isRefToken(tokenName)) {
        return theme.ref[tokenName];
    }

    if (isAliasToken(tokenName)) {
        const tokenValue = theme.alias[tokenName];

        if (!ensureNoSelfReference(tokenValue, tokenName)) {
            return '';
        }

        if (isAliasToken(tokenValue) || isRefToken(tokenValue)) {
            return resolveToken(theme, tokenValue);
        }

        return tokenValue;
    }

    devConsole.error(`Token '${tokenName}' used as value was not found`);
    return '';
}

export function buildTheme(customization: ThemeCustomization, activeContext: TokenContext[] = []): ResolvedTheme {
    if (themeCache.customizedTheme === undefined || themeCache.themeCustomization !== customization) {
        themeCache.customizedTheme = applyCustomization(customization);
        themeCache.themeCustomization = customization;
        themeCache.contextualizedTheme = undefined;
        themeCache.resolvedTheme = undefined;
    }

    const activeContextHasChanged = themeCache.activeContext?.length !== activeContext.length
        || themeCache.activeContext.some((tc) => !activeContext.includes(tc));

    if (themeCache.contextualizedTheme === undefined || activeContextHasChanged) {
        themeCache.contextualizedTheme = applyContext(themeCache.customizedTheme, activeContext);
        themeCache.activeContext = activeContext;
        themeCache.resolvedTheme = undefined;
    }

    if (themeCache.resolvedTheme === undefined) {
        const resolvedAliasTokens: Partial<ResolvedTokenMap<AliasToken>> = {};
        const resolvedComponentTokens: Partial<ResolvedTokenMap<ComponentToken>> = {};

        Object.entries(themeCache.contextualizedTheme.alias).forEach(([tokenName, tokenValue]) => {
            if (isAliasToken(tokenName) && themeCache.contextualizedTheme !== undefined) {
                resolvedAliasTokens[tokenName] = resolveToken(themeCache.contextualizedTheme, tokenValue);
            }
        });

        Object.entries(themeCache.contextualizedTheme.component).forEach(([tokenName, tokenValue]) => {
            if (isComponentToken(tokenName) && themeCache.contextualizedTheme !== undefined) {
                resolvedComponentTokens[tokenName] = resolveToken(themeCache.contextualizedTheme, tokenValue);
            }
        });

        themeCache.resolvedTheme = {
            ref: themeCache.contextualizedTheme.ref,
            alias: resolvedAliasTokens,
            component: resolvedComponentTokens,
        } as ResolvedTheme;
    }

    return themeCache.resolvedTheme;
}
