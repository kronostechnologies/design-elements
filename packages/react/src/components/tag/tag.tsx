import { forwardRef, MouseEventHandler, Ref, SVGProps, useCallback } from 'react';
import styled, { type StyledProps } from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { IconButton } from '../buttons';
import { useDeviceContext } from '../device-context-provider';
import { Icon, type IconName } from '../icon';

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

export interface TagProps {
    className?: string;
    color?: TagColor;
    iconName?: IconName;
    labelRef?: Ref<HTMLSpanElement>;
    size?: TagSize;
    subtle?: boolean;
    value: TagValue;

    onRemove?(tag: TagValue): void;
}

interface TagStylingProps {
    $hasIcon: boolean;
    $isMobile: boolean;
    $removable: boolean;
    $subtle?: boolean;
    $tagColor: TagColor;
    $tagSize: TagSize;
}

function getFontSize({ $isMobile }: TagStylingProps): number {
    return $isMobile ? 0.875 : 0.75;
}

function getIconSize(isMobile: boolean): string {
    return isMobile ? '20' : '12';
}

function isDefaultColor(tagColor: TagColor): tagColor is 'default' {
    return tagColor === 'default';
}

function isMedium(tagSize: TagSize): tagSize is 'medium' {
    return tagSize === 'medium';
}

function isSmall(tagSize: TagSize): tagSize is 'small' {
    return tagSize === 'small';
}

function getPadding({ $isMobile, $tagSize }: TagStylingProps): string {
    return $isMobile || isMedium($tagSize) ? '0 var(--spacing-1x)' : '0 var(--spacing-half)';
}

function getLineHeight({ $isMobile, $tagSize }: TagStylingProps): number {
    if ($isMobile) {
        return isSmall($tagSize) ? 1.5 : 1.875;
    }
    return isSmall($tagSize) ? 1 : 1.5;
}

type ColorProperty = 'background-color' | 'border-color' | 'text-color' | 'icon-color';

function getTagColors(
    { $tagColor, theme }: StyledProps<TagStylingProps>,
    $colorProperty: ColorProperty,
): string {
    if (isDefaultColor($tagColor)) {
        return theme.component[`tag-${$colorProperty}`];
    }
    return theme.component[`tag-${$tagColor}-${$colorProperty}`];
}

function getBorder(props: StyledProps<TagStylingProps>): string {
    if (props.$subtle) {
        return 'none';
    }
    return `1px solid ${getTagColors(props, 'border-color')}`;
}

const TagContainer = styled.div<TagStylingProps>`
    align-items: center;
    background-color: ${(props) => getTagColors(props, 'background-color')};
    border: ${getBorder};
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
    labelRef,
    iconName,
    size = 'medium',
    subtle = false,
    color = 'default',
    value,
    onRemove,
    ...otherProps
}: TagProps, ref: Ref<HTMLDivElement>) => {
    const { t } = useTranslation('tag');
    const { isMobile } = useDeviceContext();
    const dataAttributes = useDataAttributes(otherProps);

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
            $subtle={subtle}
            {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
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
                ref={labelRef}
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
