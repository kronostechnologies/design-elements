import { IconName } from '../icon/icon';

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

export interface TagProps extends BaseTagProps {
    color?: TagColor;
    onRemove?(tag: TagValue): void;
}

export interface ToggleTagProps extends BaseTagProps {
    onClick?(tag: TagValue): void;
    /**
     * Whether the tag is selected.
     * Can manually set the selected state of the tag, without the need for a click event.
     */
    selected?: boolean;
}

export interface BaseTagStylingProps {
    $isMobile: boolean;
    $tagSize: TagSize;
    $hasIcon: boolean;
}

export interface TagStylingProps extends BaseTagStylingProps {
    $tagColor: TagColor;
    $removable: boolean;
}

export interface ToggleTagStylingProps extends BaseTagStylingProps {
    $selected?: boolean;
}
