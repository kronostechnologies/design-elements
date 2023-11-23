import { equisoftTheme } from './equisoft';
import { generateTokens } from './tokens-generator';
import { Palette, ComponentTokens, Theme, ThemeCustomization } from './interface';

function resolveTokens(
    customTokens: ThemeCustomization,
    mergedColors: Palette,
    baseTokens: { component: ComponentTokens },
): ComponentTokens {
    const resolved: ComponentTokens = { ...baseTokens.component };

    Object.keys(baseTokens.component).forEach((key) => {

        if (customTokens.component) {
            const tokenValue = (customTokens.component as Record<string, keyof Palette>)[key];

            if (tokenValue in mergedColors) {
                console.log(`Token reference: ${tokenValue}.`, key);
                resolved[key] = mergedColors[tokenValue as keyof Palette];
            } else {
                console.error(`Unknown token reference: ${tokenValue}. It should be a string color-property.`);
            }
        } else {
            const tokens = generateTokens(mergedColors);
            resolved[key as keyof ComponentTokens] = tokens[key];
        }
    });

    return resolved;
}

function mergeColors<T>(base: T, customTheme: T): T {
    const merged: T = { ...base };
    if (customTheme) {
        Object.keys(customTheme).forEach((key) => {
            if (customTheme[key as keyof T] !== undefined) {
                const validKey = key as keyof T;
                merged[validKey] = customTheme[validKey];
            }
        });
    }

    return merged;
}

export const mergedTheme = (props: { theme?: ThemeCustomization }): Theme => {
    const customTheme = props.theme;

    if (!customTheme) {
        return {
            ref: equisoftTheme.ref,
            component: equisoftTheme.component,
        };
    }

    // Merge the base colors with custom colors
    const mergedColors = customTheme.ref
        ? mergeColors(equisoftTheme.ref, customTheme.ref) as Theme['ref']
        : equisoftTheme.ref;

    // Resolve tokens variables colours
    console.log('mergedColors', equisoftTheme, customTheme, mergedColors);
    //const resolvedTokens = equisoftTheme.component;
 const resolvedTokens = resolveTokens(customTheme, mergedColors, equisoftTheme);

    return {
        ref: mergedColors,
        component: resolvedTokens,
    };
};
