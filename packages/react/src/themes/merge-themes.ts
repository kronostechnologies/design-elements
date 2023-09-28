import { equisoftTheme } from './equisoft';
import { Theme } from './theme';
import { CustomTheme } from './custom-types';

function mergeThemes<T>(base: T, customTheme: T): T {
    const merged: T = { ...base };

    Object.keys(customTheme as object).forEach((key) => {
        const customValue = customTheme[key as keyof T];

        if (typeof customValue === 'object' && customValue !== null) {
            // Handle nested objects recursively
            if (typeof base[key as keyof T] === 'object' && base[key as keyof T] !== null) {
                merged[key as keyof T] = mergeThemes(base[key as keyof T], customValue);
            } else {
                // Assign the custom object if the base is not an object
                merged[key as keyof T] = customValue;
            }
        } else {
            // Merge simple values
            merged[key as keyof T] = customValue !== undefined ? customValue : base[key as keyof T];
        }
    });

    return merged;
}

const colorsMerge = (props: { theme?: CustomTheme }): Theme['colors'] => (
    mergeThemes(equisoftTheme.colors, props.theme?.colors || {}) as Theme['colors']
);

export const mergedTheme = (props: { theme?: CustomTheme }): Theme => ({
    colors: colorsMerge(props),
    tokens: mergeThemes(equisoftTheme.tokens, (props.theme?.tokens || {}) as Theme['tokens']),
});
