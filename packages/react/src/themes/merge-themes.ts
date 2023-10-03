import { Theme } from './default-types';
import { equisoftTheme } from './equisoft';
import { CustomTheme } from './custom-types';
import { generateTokens } from './tokens-generator';

const colorMappings = [
    { from: 'primary-1.1', to: 'brand-50' },
    { from: 'primary-1.2', to: 'brand-20' },
    { from: 'primary-1.3', to: 'brand-70' },
    { from: 'primary-1.4', to: 'brand-05' },
    { from: 'primary-2', to: 'brand-80' },
    { from: 'primary-3', to: 'brand-50' },
    { from: 'secondary-4.1', to: 'accent-50' },
    { from: 'secondary-4.2', to: 'accent-20' },
    { from: 'secondary-4.3', to: 'accent-70' },
    { from: 'colored-white', to: 'neutral-02' },
    { from: 'light-grey', to: 'neutral-05' },
    { from: 'grey', to: 'neutral-15' },
    { from: 'mid-grey', to: 'neutral-30' },
    { from: 'dark-grey', to: 'neutral-65' },
    { from: 'info-1.1', to: 'informative-50' },
    { from: 'success-1.1', to: 'success-50' },
    { from: 'success-1.2', to: 'success-05' },
    { from: 'success-1.3', to: 'success-20' },
    { from: 'alert-2.1', to: 'alert-50' },
    { from: 'alert-2.2', to: 'alert-05' },
    { from: 'warning-3.1', to: 'warning-50' },
    { from: 'warning-3.2', to: 'warning-05' },
    { from: 'warning-3.3', to: 'warning-50' },
    { from: 'warning-3.4', to: 'warning-70' },
];

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
                    console.error(`Unknown token reference: ${value}. It should be a string starting with colors.property or a valid hex color.`);
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

        // Update colors with custom colors
        if (typeof customValue === 'string' && customValue.trim() !== '') {
            if (/^#[0-9A-Fa-f]{6}$/.test(customValue)) {
                merged[key as keyof T] = customValue;
            } else {
                console.error(`Invalid color format on CustomTheme: ${key}, ${customValue}. Please use hex format.`);
            }
        } else {
            // Find a color mapping for the key
            const colorMapping = colorMappings.find((mapping) => mapping.to === key);
            merged[key as keyof T] = colorMapping
                ? merged[colorMapping.from as keyof T]
                : base[key as keyof T];
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
