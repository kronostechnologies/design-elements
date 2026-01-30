import type { ComponentTokenMap } from '../tokens';

export type ListboxToken =
    | 'listbox-background-color'
    | 'listbox-border-color'
    | 'listbox-divider-color'
    | 'listbox-item-text-color'
    | 'listbox-item-disabled-background-color'
    | 'listbox-item-disabled-text-color'
    | 'listbox-item-hover-background-color'
    | 'listbox-item-subcontent-text-color'
    | 'listbox-item-subcontent-disabled-text-color'
    | 'listbox-item-indicator-selected-color'
    | 'listbox-box-shadow-depth-color';

export const defaultListboxTokens: ComponentTokenMap<ListboxToken> = {
    'listbox-background-color': 'color-menu-background',
    'listbox-border-color': 'color-menu-border',
    'listbox-divider-color': 'color-border',
    'listbox-item-text-color': 'color-menu-item-content',
    'listbox-item-subcontent-text-color': 'color-menu-item-subcontent',
    'listbox-item-hover-background-color': 'color-menu-item-background-hover',
    'listbox-item-disabled-background-color': 'color-menu-item-background',
    'listbox-item-disabled-text-color': 'color-menu-item-content-disabled',
    'listbox-item-subcontent-disabled-text-color': 'color-menu-item-content-disabled',
    'listbox-item-indicator-selected-color': 'color-background-indicator-selected',
    'listbox-box-shadow-depth-color': 'color-box-shadow',
};
