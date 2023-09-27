import { Theme } from '../theme';
import { CustomTheme } from './custom-types';
import * as equisoft from '../equisoft-pallet';
import * as custom from './custom-pallet';

// overwrite equisoft theme with custom theme and if custom theme is missing a key, use equisoft theme
function mergeThemes<T extends Record<string, string | undefined>>(base: T, customTheme: T): T {
    const merged: T = { ...base };
    Object.keys(customTheme).forEach((key) => {
        const typedKey = key as keyof T;
        merged[typedKey] = customTheme[typedKey] ?? base[typedKey];
    });
    return merged;
}

export const mergedTheme: Omit<Theme, 'tokens'> = {
    main: mergeThemes(equisoft.main, (custom as CustomTheme).main || (equisoft as Theme).main) as Theme['main'],
    greys: mergeThemes(equisoft.greys, (custom as CustomTheme).greys || (equisoft as Theme).greys) as Theme['greys'],
    notifications: mergeThemes(
        equisoft.notifications,
        (custom as CustomTheme).notifications || (equisoft as Theme).notifications,
    ) as Theme['notifications'],
};
