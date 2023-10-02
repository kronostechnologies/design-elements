import { Theme } from './default-types';
import { equisoftTheme } from './equisoft';
import { CustomTheme } from './custom-types';
import { generateTokens } from './tokens-generator';

interface TokenObject {
    [key: string]: string;
}
interface MergedColors {
    [key: string]: string;
}

function resolveTokens(
    customTokens: { tokens?: TokenObject },
    mergedColors: MergedColors,
    baseTokens: { tokens: TokenObject },
): Record<string, string> {
    const resolved: Record<string, string> = {};

    Object.keys(baseTokens.tokens as object).forEach((key) => {
        if (customTokens && customTokens.tokens && (key in customTokens.tokens)) {
            const tokenValue = customTokens.tokens[key];
            // Check if tokenValue is a string and starts with colors.
            if (typeof tokenValue === 'string' && tokenValue.startsWith('colors.')) {
                const value = tokenValue.substring(7);
                if (value in mergedColors) {
                    resolved[key] = mergedColors[value];
                } else {
                    throw new Error(`Unknown token reference: ${value}`);
                }
            } else {
                resolved[key] = tokenValue;
            }
        } else {
            const tokens = generateTokens(mergedColors as Theme['colors']) as TokenObject;
            resolved[key] = tokens[key];
        }
    });

    return resolved;
}

function mergeColors<T>(base: T, customTheme: T): T {
    const merged: T = { ...base };

    Object.keys(base as object).forEach((key) => {
        const customValue = customTheme[key as keyof T];
        if (typeof customValue === 'object' && customValue !== null) {
            merged[key as keyof T] = customValue;
        } else {
            merged[key as keyof T] = customValue !== undefined ? customValue : base[key as keyof T];
        }
    });

    return merged;
}

export const mergedTheme = (props: { theme?: CustomTheme }): Theme => {
    const customTheme = props.theme;

    // If custom theme is not provided, use equisoftTheme
    if (!customTheme) {
        return {
            colors: equisoftTheme.colors,
            tokens: equisoftTheme.tokens,
        };
    }

    // Merge the base colors with custom colors
    const mergedColors = customTheme.colors
        ? mergeColors(equisoftTheme.colors, customTheme.colors) as Theme['colors']
        : equisoftTheme.colors;

    // Resolve tokens variables to colours
    const resolvedTokens = resolveTokens(customTheme, mergedColors, equisoftTheme) as Theme['tokens'];

    return {
        colors: mergedColors,
        tokens: resolvedTokens,
    };
};
