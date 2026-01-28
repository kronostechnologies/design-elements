import { NoSelfReference } from '../../utility-types';
import { RefTokens, RefTokenValue } from './ref-tokens';

export type AliasTokens =
    /**
     * ACTION
     */
    | 'color-action'
    | 'color-action-hover'
    | 'color-action-disabled'
    | 'color-action-destructive'
    | 'color-action-destructive-hover'
    | 'color-action-destructive-disabled'
    | 'color-action-inverse'
    | 'color-action-inverse-hover'
    | 'color-action-inverse-disabled'
    /**
     * FEEDBACK
     */
    | 'color-background-neutral-subtlest'
    | 'color-background-neutral-subtle'
    | 'color-background-neutral-bold'
    | 'color-background-neutral-bold-disabled'
    | 'color-feedback-background-success-subtle'
    | 'color-feedback-background-warning-subtle'
    | 'color-feedback-background-alert-subtle'
    | 'color-feedback-background-discovery-subtle'
    | 'color-feedback-background-informative-subtle'
    | 'color-feedback-background-success-subtlest'
    | 'color-feedback-background-warning-subtlest'
    | 'color-feedback-background-alert-subtlest'
    | 'color-feedback-background-discovery-subtlest'
    | 'color-feedback-background-informative-subtlest'
    | 'color-feedback-background-success-bold'
    | 'color-feedback-background-success-bold-disabled'
    | 'color-feedback-background-alert-bold'
    | 'color-feedback-background-warning-bold'
    | 'color-feedback-background-discovery-bold'
    | 'color-feedback-background-informative-bold'
    | 'color-feedback-border-success'
    | 'color-feedback-border-warning'
    | 'color-feedback-border-alert'
    | 'color-feedback-border-discovery'
    | 'color-feedback-border-informative'
    | 'color-feedback-content-success'
    | 'color-feedback-content-warning'
    | 'color-feedback-content-alert'
    | 'color-feedback-content-discovery'
    | 'color-feedback-content-informative'
    /**
     * CONTROL
     */
    | 'color-control-background'
    | 'color-control-background-hover'
    | 'color-control-background-disabled'
    | 'color-control-background-readonly'
    | 'color-control-background-checked'
    | 'color-control-background-selected'
    | 'color-control-background-selected-hover'
    | 'color-control-border'
    | 'color-control-border-hover'
    | 'color-control-border-disabled'
    | 'color-control-border-readonly'
    | 'color-control-border-selected'
    | 'color-control-border-checked'
    | 'color-control-border-error'
    | 'color-control-value'
    | 'color-control-value-hover'
    | 'color-control-value-disabled'
    | 'color-control-value-readonly'
    | 'color-control-auxiliary'
    | 'color-control-auxiliary-hover'
    | 'color-control-auxiliary-disabled'
    | 'color-control-auxiliary-readonly'
    | 'color-control-auxiliary-error'
    | 'color-control-auxiliary-success'
    | 'color-control-auxiliary-checked'
    | 'color-control-auxiliary-selected'
    /**
     * MENU
     */
    | 'color-menu-background'
    | 'color-menu-border'
    | 'color-menu-item-background'
    | 'color-menu-item-background-hover'
    | 'color-menu-item-content'
    | 'color-menu-item-subcontent'
    | 'color-menu-item-content-hover'
    | 'color-menu-item-content-disabled'
    /**
     * BRAND
     */
    | 'color-background-brand-subtle'
    | 'color-background-brand'
    | 'color-background-brand-bold'
    | 'color-background-indicator-disabled'
    | 'color-background-indicator-selected'
    | 'color-background-indicator-active'
    | 'color-border-brand'
    | 'color-border-brand-bold'
    | 'color-content-brand'
    /**
     * BACKGROUND
     */
    | 'color-background'
    | 'color-background-overlay'
    | 'color-background-isolated'
    | 'color-background-disabled'
    | 'color-background-empty'
    | 'color-background-hover'
    | 'color-background-selected'
    | 'color-background-selected-hover'
    | 'color-backdrop-background'
    | 'color-backdrop-background-subtle'
    /**
     * BORDER
     */
    | 'color-border'
    | 'color-border-subtle'
    | 'color-border-bold'
    | 'color-border-overlay'
    | 'color-border-hover'
    | 'color-border-disabled'
    | 'color-border-empty'
    | 'color-border-selected'
    | 'color-border-inverse'
    | 'color-border-focus-outside'
    | 'color-border-focus-inside'
    | 'color-border-focus-outside-inverse'
    | 'color-border-focus-inside-inverse'
    /**
     * CONTENT (TEXT & ICONS)
     */
    | 'color-content'
    | 'color-content-subtle'
    | 'color-content-inverse'
    | 'color-content-disabled'
    | 'color-content-hover'
    | 'color-content-selected'
    | 'color-link-content'
    | 'color-link-content-visited'
    | 'color-link-content-disabled'
    | 'color-link-content-hover'
    /**
     * BOX-SHADOW
     */
    | 'color-box-shadow'
    /**
     * TEXT
     */
    | 'text-body-medium-font-size'
    | 'text-body-transform';

export type AliasTokenMap = {
    [Token in AliasTokens]: NoSelfReference<RefTokens | AliasTokens, Token>;
}

export const defaultAliasTokens: AliasTokenMap = {
    /**
     * ACTION
     * Use for buttons.
     * Equisoft theme has brand colors.
     * Others themes might use accent colors.
     */
    'color-action': 'color-brand-50',
    'color-action-hover': 'color-brand-70',
    'color-action-disabled': 'color-brand-20',
    'color-action-destructive': 'color-alert-50',
    'color-action-destructive-hover': 'color-alert-70',
    'color-action-destructive-disabled': 'color-alert-20',
    'color-action-inverse': 'color-white',
    'color-action-inverse-hover': 'color-brand-20',
    'color-action-inverse-disabled': 'color-brand-50',

    /**
     * FEEDBACK
     *
     * background
     *  subtlest: use for sectional banners.
     *  subtle: use for subtle lozenges.
     *  bold: vibrant option used for global-banners, lozenges, toasts, toggle-switch, tooltips, etc.
     *
     * border
     *  use for success sectional banners.
     *
     * content (text & icons)
     *  use for success sectional banners, lozenges, etc.
     *
     */
    /**
     * NEUTRAL
     *  Use for default background of neutral UI elements,
     *  sometimes on a subtle background. Could also be named color-background-inverse.
     */
    'color-background-neutral-subtlest': 'color-neutral-02',
    'color-background-neutral-subtle': 'color-neutral-05',
    'color-background-neutral-bold': 'color-neutral-65',
    'color-background-neutral-bold-disabled': 'color-neutral-30',
    /**
     * SUCCESS
     *  Use for UI elements communicating a favorable outcome and success messaging.
     */
    'color-feedback-background-success-subtlest': 'color-success-02',
    'color-feedback-background-success-subtle': 'color-success-05',
    'color-feedback-background-success-bold': 'color-success-50',
    'color-feedback-background-success-bold-disabled': 'color-success-20',
    'color-feedback-border-success': 'color-success-50',
    'color-feedback-content-success': 'color-success-70',
    /**
     * ALERT
     *  Use for UI elements communicating critical information and error messaging.
     */
    'color-feedback-background-alert-subtlest': 'color-alert-02',
    'color-feedback-background-alert-subtle': 'color-alert-05',
    'color-feedback-background-alert-bold': 'color-alert-50',
    'color-feedback-border-alert': 'color-alert-50',
    'color-feedback-content-alert': 'color-alert-70',
    /**
     * WARNING
     *  Use for UI elements communicating caution.
     */
    'color-feedback-background-warning-subtlest': 'color-warning-02',
    'color-feedback-background-warning-subtle': 'color-warning-05',
    'color-feedback-background-warning-bold': 'color-warning-50',
    'color-feedback-border-warning': 'color-warning-50',
    'color-feedback-content-warning': 'color-warning-80',
    /**
     * DISCOVERY
     *  Use for UI elements communicating change, something new or onboarding spotlights.
     */
    'color-feedback-background-discovery-subtlest': 'color-discovery-02',
    'color-feedback-background-discovery-subtle': 'color-discovery-05',
    'color-feedback-background-discovery-bold': 'color-discovery-50',
    'color-feedback-border-discovery': 'color-discovery-50',
    'color-feedback-content-discovery': 'color-discovery-70',
    /**
     * INFORMATIVE
     *  Use for UI elements communicating information or something in-progress.
     */
    'color-feedback-background-informative-subtlest': 'color-informative-02',
    'color-feedback-background-informative-subtle': 'color-informative-05',
    'color-feedback-background-informative-bold': 'color-informative-50',
    'color-feedback-border-informative': 'color-informative-50',
    'color-feedback-content-informative': 'color-informative-70',

    /**
     * CONTROL
     *  Use for form UI elements, such as inputs, checkboxes, radio buttons, choosers, segmented controls, etc.
     */
    'color-control-background': 'color-white',
    'color-control-background-hover': 'color-neutral-15',
    'color-control-background-disabled': 'color-neutral-05',
    'color-control-background-readonly': 'transparent-dark-3',
    'color-control-background-checked': 'color-brand-50',
    'color-control-background-selected': 'color-brand-05',
    'color-control-background-selected-hover': 'color-brand-10',

    'color-control-border': 'color-neutral-65',
    'color-control-border-hover': 'color-black',
    'color-control-border-disabled': 'color-neutral-30',
    'color-control-border-readonly': 'transparent-100',
    'color-control-border-selected': 'color-brand-50',
    'color-control-border-checked': 'color-brand-50',
    'color-control-border-error': 'color-alert-50',

    'color-control-value': 'color-content',
    'color-control-value-hover': 'color-content-hover',
    'color-control-value-disabled': 'color-content-disabled',
    'color-control-value-readonly': 'color-content',
    'color-control-auxiliary': 'color-neutral-65',
    'color-control-auxiliary-hover': 'color-black',
    'color-control-auxiliary-disabled': 'color-neutral-30',
    'color-control-auxiliary-readonly': 'color-neutral-65',
    'color-control-auxiliary-error': 'color-alert-50',
    'color-control-auxiliary-success': 'color-success-50',
    'color-control-auxiliary-checked': 'color-white',
    'color-control-auxiliary-selected': 'color-brand-70',

    /**
     * MENU
     * Used for menus, dropdown menus, listbox, navigation list and their items.
     */
    'color-menu-background': 'color-background-overlay',
    'color-menu-border': 'color-border-overlay',
    'color-menu-item-background': 'transparent-100',
    'color-menu-item-background-hover': 'color-background-hover', // should use transparency instead
    'color-menu-item-content': 'color-content',
    'color-menu-item-subcontent': 'color-content-subtle',
    'color-menu-item-content-hover': 'color-content-hover',
    'color-menu-item-content-disabled': 'color-content-disabled',

    /**
     * BRAND
     * Use for UI elements, like visual indicators to reinforce our brand, that need to stand out a lot.
     *
     * background
     *  subtle: used for legends
     *  bold: used for global headers.
     *
     * border
     *  used for global headers.
     *
     * content (text & icons)
     *  used for progress trackers
     */
    'color-background-brand-subtle': 'color-brand-20',
    'color-background-brand': 'color-brand-50',
    'color-background-brand-bold': 'color-brand-80',
    'color-background-indicator-disabled': 'color-neutral-30',
    'color-background-indicator-selected': 'color-brand-50',
    'color-background-indicator-active': 'color-brand-80',
    'color-border-brand': 'color-brand-50',
    'color-border-brand-bold': 'color-brand-70',
    'color-content-brand': 'color-brand-50',

    /**
     * BACKGROUND
     */

    /**
     * Use as the primary surface base background of the UI.
     */
    'color-background': 'color-white',
    /**
     * Use for the elevation surface background of elements that sit on top of other UI elements,
     * such as modals, menus, datepicker calendar, global navigation, toggletips, etc.
     */
    'color-background-overlay': 'color-white',
    /**
     * A secondary elevation surface background for the UI commonly used for
     * grouped or isolated items, such as sections, accordion panels, table even rows, etc.
     */
    'color-background-isolated': 'color-neutral-02',

    /**
     * Use for the background of elements that appear to have no background in a resting state,
     * such as subtle buttons and menu items.
     */
    // 'color-background-subtle': 'transparent-100',

    /**
     * Use for backgrounds of elements in a hovered state,
     * such as navigation elements like accordion headers, card links, table cells, clickable tags, etc.
     */
    'color-background-hover': 'color-neutral-15',
    /**
     * Use for backgrounds of elements in a disabled state,
     * such as menu items, navigation elements like accordion, etc.
     */
    'color-background-disabled': 'color-neutral-05',
    /**
     * Use for backgrounds of elements in an empty state,
     * such as carousel dots, progress elements, etc.
     */
    'color-background-empty': 'color-neutral-15',
    /**
     * Use for the background of elements in a selected state,
     * such as navigation elements like pagination pages or items like table rows.
     */
    'color-background-selected': 'color-brand-05',
    'color-background-selected-hover': 'color-brand-10', // should use transparency instead

    /**
     * Use for the screen overlay that appears with modal dialogs
     */
    'color-backdrop-background': 'transparent-dark-75',
    'color-backdrop-background-subtle': 'transparent-dark-50',

    /**
     * BORDER
     */

    /**
     * Use to visually group or separate UI elements, such as flat cards, side panel dividers and separators.
     */
    'color-border': 'color-neutral-15',
    'color-border-subtle': 'color-neutral-05',
    'color-border-bold': 'color-neutral-50',
    /**
     * Use for borders of overlaying elements, such as modals, menus, and toggletips.
     */
    'color-border-overlay': 'color-neutral-50',
    /**
     * Use for borders on bold backgrounds.
     */
    'color-border-inverse': 'color-white',
    /**
     * Use for border in a hovered state.
     */
    'color-border-hover': 'color-black',
    /**
     * Use for borders of elements in a disabled state.
     */
    'color-border-disabled': 'color-neutral-15',
    /**
     * Use for borders of elements in an empty state,
     * such as progress elements, etc.
     */
    'color-border-empty': 'color-neutral-30',
    /**
     * Use for borders or visual indicators of elements in a selected, opened or active state,
     * such as navigation elements like tabs, pagination or menu items.
     */
    'color-border-selected': 'color-brand-50',

    /**
     * Use for focus rings of elements in a focus state.
     */
    'color-border-focus-outside': 'color-brand-50',
    'color-border-focus-inside': 'color-brand-20',
    'color-border-focus-outside-inverse': 'color-border-focus-inside',
    'color-border-focus-inside-inverse': 'color-border-focus-outside',

    /**
     * CONTENT (TEXT & ICONS)
     */

    /**
     * Use for primary content, such as body copy, sentence case headers, labels, legends, etc.
     */
    'color-content': 'color-neutral-90',
    /**
     * Use for secondary content, input field hints, subheadings, list items descriptions and captions.
     */
    'color-content-subtle': 'color-neutral-65',
    /**
     * Use for content on bold backgrounds.
     */
    'color-content-inverse': 'color-white',
    /**
     * Use for content in a hovered state.
     */
    'color-content-hover': 'color-black',
    /**
     * Use for content in a disabled state.
     */
    'color-content-disabled': 'color-neutral-30',
    /**
     * Use for content in selected, active or opened states, such as choosers, toggles, pagination, etc.
     */
    'color-content-selected': 'color-brand-70',

    /**
     * Use for links in a default, disabled, hovered and visited state.
     */
    'color-link-content': 'color-informative-50',
    'color-link-content-disabled': 'color-informative-20',
    'color-link-content-hover': 'color-informative-70',
    'color-link-content-visited': 'color-informative-50',

    /**
     * BOX-SHADOW
     */
    'color-box-shadow': 'transparent-dark-20',

    /**
     * TEXT
     */
    'text-body-medium-font-size': 'font-size-350',
    'text-body-transform': 'font-transform-none',
};

export type ResolvedAliasTokenValue = RefTokenValue;

export type ResolvedAliasTokens = {
    [Token in AliasTokens]: ResolvedAliasTokenValue;
}

export function isAliasToken(token: string): token is AliasTokens {
    return token in defaultAliasTokens;
}
