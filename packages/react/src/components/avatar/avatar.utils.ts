import { type ResolvedTheme } from '../../themes';
import { AZ_BG_COLORS, AZ_TXT_COLORS } from './avatar.constants';

export interface AvatarColorsFromStringResult {
    backgroundColor: string;
    textColor: string;
}

function getCharCodeWithoutDiacritics(char: string): number {
    if (!char) {
        return -1;
    }
    const normalized = char.normalize('NFD');
    const baseChar = normalized.replace(/[\u0300-\u036f]/g, '');
    return baseChar.charCodeAt(0);
}

export function getDefaultAvatarColors(theme: ResolvedTheme): AvatarColorsFromStringResult {
    return {
        backgroundColor: theme.component['avatar-background-color'],
        textColor: theme.component['avatar-text-color'],
    };
}

export function getAvatarColorsFromString(
    theme: ResolvedTheme,
    str?: string,
): AvatarColorsFromStringResult {
    if (!str || str.trim().length === 0) {
        return getDefaultAvatarColors(theme);
    }

    const firstChar = str.charAt(0).toUpperCase();
    const charCode = getCharCodeWithoutDiacritics(firstChar);
    const index = charCode - 65;

    if (index >= 0 && index < AZ_BG_COLORS.length) {
        return {
            backgroundColor: AZ_BG_COLORS[index],
            textColor: AZ_TXT_COLORS[index],
        };
    }

    return getDefaultAvatarColors(theme);
}
