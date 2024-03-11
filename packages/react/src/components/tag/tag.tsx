import {
    forwardRef,
    MouseEventHandler,
    Ref,
    SVGProps,
    useCallback, useEffect, useState,
} from 'react';
import styled, {
    css, FlattenInterpolation,
    StyledProps, ThemeProps,
} from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';
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
    extraLabel?: string;
}

export interface ClickableOrDeletableTag {
    /*  The tag's is clickable. (optional) */
    onClick?(tag: TagValue): void;

    /*  The tag's is deletable. (optional) */
    onDelete?(tag: TagValue): void;
}

export interface TagProps extends Partial<ClickableOrDeletableTag> {
    className?: string;

    /*  The tag's size.
    *   @default 'medium'
    */
    size?: TagSize;

    /*  The tag's color.
    *   @default 'default'
    *  default color mapping:
    *   decorative-01 -> purple
    *   decorative-02 -> gold
    *   decorative-03 -> turquoise
    *   decorative-04 -> red
    *   decorative-05 -> lime
    *   decorative-06 -> orange
    *   decorative-07 -> blue
    *   decorative-08 -> green-forest
    *   decorative-09 -> magenta
    *   decorative-10 -> violet
    */
    color?: TagColor;

    /* The tag's value
         TagValue.id is optional
         TagValue.label is required
         TagValue.extraLabel is optional and works only with 'default' color
     */
    value: TagValue;

    /*  Whether the tag is selected. (optional)
     *  Can manually set the selected state of the tag, without the need for a click event.
    *   @default false
    */
    selected?: boolean;

    /*  The tag's icon. (optional)
     *  *only with 'default' color
     */
    iconName?: IconName;
}

interface BaseTagStylingProps {
    $isMobile: boolean;
    $tagSize: TagSize;
    $tagColor: TagColor;
    $selected?: boolean;
    $clickable?: boolean;
}

interface TagContainerProps extends BaseTagStylingProps {
    $clickable: boolean;
    $deletable: boolean;
    $hasIcon: boolean;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

type TagLabelProps = BaseTagStylingProps;
type IconOrButtonProps = BaseTagStylingProps;

function getFontSize({ $isMobile }: TagLabelProps): number {
    return $isMobile ? 0.875 : 0.75;
}

function getIconSize(isMobile: boolean): string {
    return isMobile ? '20' : '12';
}

function isDefault(tagColor: TagColor): tagColor is 'default' {
    return tagColor === 'default';
}

function isMedium(tagSize: TagSize): tagSize is 'medium' {
    return tagSize === 'medium';
}

function isSmall(tagSize: TagSize): tagSize is 'small' {
    return tagSize === 'small';
}

function getPadding({ $isMobile, $tagSize }: IconOrButtonProps): string {
    return $isMobile || isMedium($tagSize) ? '0 var(--spacing-1x)' : '0 var(--spacing-half)';
}

function getLineHeight({ $isMobile, $tagSize }: TagLabelProps): number {
    if ($isMobile) {
        return isSmall($tagSize) ? 1.5 : 1.875;
    }
    return isSmall($tagSize) ? 1 : 1.5;
}

function getBorderRadius({ $clickable, $isMobile, $tagSize }: TagContainerProps): string {
    if ($clickable) {
        return isSmall($tagSize) ? 'var(--border-radius-3x)' : 'var(--border-radius-4x)';
    }
    return $isMobile || isMedium($tagSize) ? 'var(--border-radius-2x)' : 'var(--border-radius)';
}

type ColorProperty = 'background-color' | 'border-color' | 'text-color';

function getTagColors(
    {
        $tagColor, $colorProperty, theme,
}: StyledProps<BaseTagStylingProps & {
        $colorProperty: ColorProperty;
    }>,
): string {
    return theme.component[`tag-${$tagColor}-${$colorProperty}`];
}

const StyledIcon = styled(Icon)<SVGProps<SVGSVGElement> & IconOrButtonProps>`
    color: ${({ theme }) => theme.component['tag-default-icon-color']};

    height: var(--size-1x);
    margin-right: var(--spacing-half);
    vertical-align: text-bottom;
    width: var(--size-1x);

    ${({ $selected, theme }) => $selected && css`
        color: ${theme.component['tag-default-selected-icon-color']};
    `}

    ${({ $clickable, $selected, theme }) => $clickable && css`
        &:hover {
            color: ${$selected ? theme.component['tag-default-selected-hover-icon-color'] : theme.component['tag-default-hover-icon-color']};
        }
    `}
`;

const DeleteIcon = styled(Icon).attrs({
    'aria-hidden': 'true',
    name: 'x',
})``;

const TagExtraLabel = styled.span<TagLabelProps>`
    color: ${({ theme }) => theme.component['tag-default-extra-label-text-color']};
    display: inline-block;
    font-size: ${getFontSize}rem;
    line-height: ${getLineHeight}rem;
    max-width: 312px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${({ $selected, theme }) => $selected && css`
        color: ${theme.component['tag-default-selected-extra-label-text-color']};
    `}
`;

const TagLabel = styled.span<TagLabelProps>`
    color: ${(props) => getTagColors({ ...props, $colorProperty: 'text-color' })};
    display: inline-block;
    font-size: ${getFontSize}rem;
    line-height: ${getLineHeight}rem;
    max-width: 312px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${({ $selected, theme }) => $selected && css`
        color: ${theme.component['tag-default-selected-text-color']};
        font-weight: var(--font-semi-bold);
    `}
`;

const DeleteButton = styled(IconButton)<IconOrButtonProps>`
    align-items: center;
    border-radius: 50%;
    color: ${({ theme }) => theme.component['tag-default-delete-button-icon-color']};
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

    ${({ $selected, theme }) => $selected && css`
        color: ${theme.component['tag-default-selected-delete-button-hover-icon-color']};
    `}

    &:hover {
        background-color: ${({ $selected, theme }) => ($selected ? theme.component['tag-default-selected-delete-button-hover-background-color'] : theme.component['tag-default-delete-button-hover-background-color'])};
        color: ${({ $selected, theme }) => ($selected ? theme.component['tag-default-selected-delete-button-hover-icon-color'] : theme.component['tag-default-delete-button-hover-icon-color'])};

        ${DeleteIcon} {
            color: ${({ theme }) => theme.component['tag-default-delete-button-hover-icon-color']};
        }
    }

    ${focus};
`;

function getClickableStyle(
    { $clickable, $selected, $tagSize }: TagContainerProps,
): FlattenInterpolation<ThemeProps<ResolvedTheme>> | false {
    return $clickable && css`
        font-family: var(--font-family);
        padding-left: ${isSmall($tagSize) ? 'var(--spacing-1x)' : 'var(--spacing-1halfx)'};
        padding-right: ${isSmall($tagSize) ? 'var(--spacing-1x)' : 'var(--spacing-1halfx)'};

        &:hover {
            background-color: ${({ theme }) => ($selected ? theme.component['tag-default-selected-hover-background-color'] : theme.component['tag-default-hover-background-color'])};
            border-color: ${({ theme }) => ($selected ? theme.component['tag-default-selected-hover-border-color'] : theme.component['tag-default-hover-border-color'])};
        }

        ${focus};
    `;
}

const TagContainer = styled.div<TagContainerProps>`
    align-items: center;
    background-color: ${(props) => getTagColors({ ...props, $colorProperty: 'background-color' })};
    border: 1px solid ${(props) => getTagColors({ ...props, $colorProperty: 'border-color' })};
    border-radius: ${getBorderRadius};
    display: inline-flex;
    padding: ${getPadding};

    & + & {
        margin-left: var(--spacing-1x);
    }

    ${({ $selected, theme }) => $selected && css`
        background-color: ${theme.component['tag-default-selected-background-color']};
        border: 1px solid ${theme.component['tag-default-selected-border-color']};
    `}

    ${getClickableStyle};
`;

export const Tag = forwardRef(({
    className,
    iconName,
    size = 'medium',
    color = 'default',
    selected = false,
    value,
    onClick,
    onDelete,
}: TagProps, ref: Ref<HTMLElement>) => {
    const { t } = useTranslation('tag');
    const { isMobile } = useDeviceContext();
    const [isSelected, setSelected] = useState<boolean>(isDefault(color) && selected);
    const hasIconLabel = !(value.label.toLowerCase() === iconName?.toLowerCase());
    const shortenedLabel = value.label.length > 20 ? `${value.label.slice(0, 17)}…` : value.label;
    const shortenedExtraLabel = value.extraLabel && value.extraLabel.length > 20
        ? `${value.extraLabel.slice(0, 17)}…`
        : value.extraLabel || '';

    useEffect(() => {
        if (isDefault(color)) {
            setSelected(selected);
        } else {
            setSelected(false);
        }
    }, [color, selected]);

    const handleClick: MouseEventHandler = useCallback(() => {
        if (isDefault(color) && onClick) {
            setSelected(!isSelected);
            onClick?.(value);
        }
    }, [color, isSelected, onClick, value]);

    const handleDelete: MouseEventHandler = useCallback((e) => {
        e.stopPropagation();
        onDelete?.(value);
    }, [onDelete, value]);

    return (
        <TagContainer
            ref={ref}
            as={onClick ? 'button' : 'span'}
            className={className}
            onClick={handleClick}
            type={onClick ? 'button' : undefined}
            $isMobile={isMobile}
            $tagSize={size}
            $tagColor={color}
            $clickable={!!onClick && isDefault(color)}
            $deletable={!!onDelete && isDefault(color)}
            $hasIcon={!!iconName}
            $selected={isSelected}
        >
            {iconName && isDefault(color) && (
                <StyledIcon
                    aria-label={hasIconLabel ? iconName : undefined}
                    aria-hidden={!hasIconLabel}
                    data-testid={`${value.label}-icon`}
                    name={iconName}
                    size={getIconSize(isMobile)}
                    role="img"
                    color={color}
                    $isMobile={isMobile}
                    $tagSize={size}
                    $tagColor={color}
                    focusable={undefined}
                    $selected={isSelected}
                />
            )}

            {value.extraLabel && isDefault(color) && (
                <TagExtraLabel
                    $isMobile={isMobile}
                    $tagSize={size}
                    $tagColor={color}
                    $selected={isSelected}
                >
                    {shortenedExtraLabel}
                    &nbsp;
                </TagExtraLabel>
            )}

            <TagLabel
                $isMobile={isMobile}
                $tagSize={size}
                $tagColor={color}
                $selected={isSelected}
            >
                {shortenedLabel}
            </TagLabel>

            {onDelete && isDefault(color) && (
                <DeleteButton
                    data-testid={`${value.label}-delete-button`}
                    type="button"
                    buttonType="tertiary"
                    iconName="x"
                    size={size}
                    aria-label={t('deleteButtonAriaLabel', { label: value.label })}
                    onClick={handleDelete}
                    $tagSize={size}
                    $isMobile={isMobile}
                    $tagColor={color}
                    $selected={isSelected}
                />
            )}
        </TagContainer>
    );
});

Tag.displayName = 'Tag';
