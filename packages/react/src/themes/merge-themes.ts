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
            if (typeof tokenValue === 'string') {
                // const value = tokenValue.substring(7);
                if (tokenValue in mergedColors) {
                    resolved[key] = mergedColors[tokenValue];
                } else {
                    console.error(`Unknown token reference: ${tokenValue}. It should be a string color-property.`);
                }
            } else {
                resolved[key] = tokenValue;
            }
        } else {
            const tokens = generateTokens(mergedColors as Theme['ref']) as TokenObject;
            resolved[key] = tokens[key];
        }
    });

    return resolved;
}

function mergeColors<T>(base: T, customTheme: T): T {
    const merged: T = { ...base };
    if (customTheme) {
        Object.keys(customTheme).forEach((key) => {
            // Check for undefined value (optional)
            if (customTheme[key as keyof T] !== undefined) {
                // Use type assertion to inform TypeScript that the key is valid
                const validKey = key as keyof T;
                merged[validKey] = customTheme[validKey];
            }
        });
    }

    return merged;
}

export const mergedTheme = (props: { theme?: CustomTheme }): Theme => {
    const customTheme = props.theme;

    // If custom theme is not provided, use equisoftTheme
    if (!customTheme) {
        return {
            ref: equisoftTheme.ref,
            tokens: equisoftTheme.tokens,
        };
    }

    // Merge the base colors with custom colors
    const mergedColors = customTheme.ref
        ? mergeColors(equisoftTheme.ref, customTheme.ref) as Theme['ref']
        : equisoftTheme.ref;

    // Resolve tokens variables to colours
    const resolvedTokens = resolveTokens(customTheme, mergedColors, equisoftTheme) as Theme['tokens'];

    return {
        ref: mergedColors,
        tokens: resolvedTokens,
    };
};
