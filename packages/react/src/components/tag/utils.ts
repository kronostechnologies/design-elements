import { StyledProps } from 'styled-components';
import { BaseTagStylingProps, TagColor, TagSize, TagStylingProps } from './types';

export function getFontSize({ $isMobile }: BaseTagStylingProps): number {
    return $isMobile ? 0.875 : 0.75;
}

export function getIconSize(isMobile: boolean): string {
    return isMobile ? '20' : '12';
}

export function isDefaultColor(tagColor: TagColor): tagColor is 'default' {
    return tagColor === 'default';
}

export function isMedium(tagSize: TagSize): tagSize is 'medium' {
    return tagSize === 'medium';
}

export function isSmall(tagSize: TagSize): tagSize is 'small' {
    return tagSize === 'small';
}

export function getPadding({ $isMobile, $tagSize }: BaseTagStylingProps): string {
    return $isMobile || isMedium($tagSize) ? '0 var(--spacing-1x)' : '0 var(--spacing-half)';
}

export function getLineHeight({ $isMobile, $tagSize }: BaseTagStylingProps): number {
    if ($isMobile) {
        return isSmall($tagSize) ? 1.5 : 1.875;
    }
    return isSmall($tagSize) ? 1 : 1.5;
}

type ColorProperty = 'background-color' | 'border-color' | 'text-color' | 'icon-color';

export function getTagColors(
    { $tagColor, theme }: StyledProps<TagStylingProps>,
    $colorProperty: ColorProperty,
): string {
    if (isDefaultColor($tagColor)) {
        return theme.component[`tag-${$colorProperty}`];
    }
    return theme.component[`tag-${$tagColor}-${$colorProperty}`];
}
