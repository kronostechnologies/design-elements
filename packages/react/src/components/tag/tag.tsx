import {
    forwardRef,
    MouseEventHandler,
    Ref,
    SVGProps,
    useCallback,
} from 'react';
import styled, { StyledProps } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { IconButton } from '../buttons/icon-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';

export type TagColor =
    | 'default'
    | 'decorative-01'
    | 'decorative-02'
    | 'decorative-03'
    | 'decorative-04'
    | 'decorative-05'
    | 'decorative-06'
    | 'decorative-07'
    | 'decorative-08'
    | 'decorative-09'
    | 'decorative-10';

export type TagSize =
    | 'small'
    | 'medium';

export interface TagValue {
    id?: string;
    label: string;
}

export interface BaseTagProps {
    className?: string;
    size?: TagSize;
    value: TagValue;
    iconName?: IconName;
}

export interface BaseTagStylingProps {
    $isMobile: boolean;
    $tagSize: TagSize;
    $hasIcon: boolean;
}

export interface TagProps extends BaseTagProps {
    color?: TagColor;
    onRemove?(tag: TagValue): void;
}

export interface TagStylingProps extends BaseTagStylingProps {
    $tagColor: TagColor;
    $removable: boolean;
}

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

const TagContainer = styled.span<TagStylingProps>`
    align-items: center;
    background-color: ${(props) => getTagColors(props, 'background-color')};
    border: 1px solid ${(props) => getTagColors(props, 'border-color')};
    border-radius: ${({ $tagSize, $isMobile }) => ($isMobile || isMedium($tagSize) ? 'var(--border-radius-1halfx)' : 'var(--border-radius)')};
    display: inline-flex;
    padding: ${getPadding};

    & + & {
        margin-left: var(--spacing-1x);
    }
`;

const TagLabel = styled.span<TagStylingProps>`
    color: ${(props) => getTagColors(props, 'text-color')};
    display: inline-block;
    font-size: ${getFontSize}rem;
    line-height: ${getLineHeight}rem;
    max-width: 312px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const StyledIcon = styled(Icon)<SVGProps<SVGSVGElement> & TagStylingProps>`
    color: ${(props) => getTagColors(props, 'icon-color')};
    height: var(--size-1x);
    margin-right: var(--spacing-half);
    vertical-align: text-bottom;
    width: var(--size-1x);
`;

const RemoveButton = styled(IconButton)<TagStylingProps>`
    align-items: center;
    border-radius: 50%;
    color: ${(props) => getTagColors(props, 'icon-color')};
    display: inline-flex;
    height: auto;
    justify-content: center;
    margin-left: var(--spacing-half);
    margin-right: calc(-1 * var(--spacing-half));
    min-height: auto;
    min-width: auto;
    width: auto;

    > svg {
        height: 1rem;
        width: 1rem;
    }
`;

export const Tag = forwardRef(({
    className,
    iconName,
    size = 'medium',
    color = 'default',
    value,
    onRemove,
}: TagProps, ref: Ref<HTMLElement>) => {
    const { t } = useTranslation('tag');
    const { isMobile } = useDeviceContext();

    const isRemovable = !!onRemove;
    const hasIcon = !!iconName;
    const hasIconLabel = !(value.label.toLowerCase() === iconName?.toLowerCase());

    const handleDelete: MouseEventHandler = useCallback((e) => {
        e.stopPropagation();
        onRemove?.(value);
    }, [onRemove, value]);

    return (
        <TagContainer
            ref={ref}
            className={className}
            $isMobile={isMobile}
            $tagSize={size}
            $removable={isRemovable}
            $hasIcon={hasIcon}
            $tagColor={color}
        >
            {hasIcon && (
                <StyledIcon
                    aria-label={hasIconLabel ? iconName : undefined}
                    aria-hidden={!hasIconLabel}
                    data-testid={`${value.label}-icon`}
                    name={iconName}
                    size={getIconSize(isMobile)}
                    role="img"
                    focusable
                    $isMobile={isMobile}
                    $tagSize={size}
                    $tagColor={color}
                    $hasIcon={hasIcon}
                    $removable={isRemovable}
                />
            )}

            <TagLabel
                $isMobile={isMobile}
                $tagSize={size}
                $tagColor={color}
                $hasIcon={hasIcon}
                $removable={isRemovable}
            >
                {value.label}
            </TagLabel>

            {isRemovable && (
                <RemoveButton
                    aria-hidden="true"
                    data-testid={`${value.label}-remove-button`}
                    type="button"
                    buttonType="tertiary"
                    iconName="x"
                    size={size}
                    aria-label={t('deleteButtonAriaLabel', { label: value.label })}
                    onClick={handleDelete}
                    $tagSize={size}
                    $isMobile={isMobile}
                    $tagColor={color}
                    $hasIcon={hasIcon}
                    $removable={isRemovable}
                />
            )}
        </TagContainer>
    );
});

Tag.displayName = 'Tag';
