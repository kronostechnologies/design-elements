import { equisoftTheme } from './equisoft';
import { generateTokens } from './tokens-generator';
import { Palette, ComponentTokens, Theme, ThemeCustomization } from './interface';

type RefTokens = Palette;
type AliasTokens = ComponentTokens;
type AllTokens = RefTokens | AliasTokens;

function resolveTokens(
    customTokens: ThemeCustomization,
    mergedColors: Palette,
    baseTokens: { component: ComponentTokens },
): ComponentTokens {
    const resolved: ComponentTokens = { ...baseTokens.component };

    Object.keys(baseTokens.component).forEach((componentKey) => {
        const key = componentKey as keyof ComponentTokens;

        if (customTokens.component) {
            const tokenValue = customTokens.component[key];
            if (tokenValue !== undefined && !(tokenValue in mergedColors)) {
                console.error(`Error on color reference: ${tokenValue} in component: ${componentKey}. It should be a value existing in the palette/ref colors name.`);
            } else {
                resolved[key] = mergedColors[tokenValue as keyof AllTokens];
            }
        } else {
            const tokens = generateTokens(mergedColors);
            resolved[key] = tokens[key] as NonNullable<ComponentTokens[keyof ComponentTokens]>;
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
    const resolvedTokens = customTheme.component
        ? resolveTokens(customTheme, mergedColors, equisoftTheme)
        : equisoftTheme.component;

    return {
        ref: mergedColors,
        component: resolvedTokens,
    };
};
