import { NoSelfReference } from '../../utility-types';
import { RefTokens } from './ref-tokens';

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
 * BACKGROUND
 */
    | 'color-bg'
    | 'color-bg-overlay'
    | 'color-bg-isolated'
    | 'color-bg-disabled'
    | 'color-bg-empty'
    | 'color-bg-hover'
    | 'color-bg-selected'
    | 'color-bg-brand-subtle'
    | 'color-bg-brand'
    | 'color-bg-brand-bold'
    | 'color-bg-indicator'
    | 'color-bg-neutral-subtlest'
    | 'color-bg-neutral-subtle'
    | 'color-bg-neutral-bold'
    | 'color-feedback-bg-success-subtle'
    | 'color-feedback-bg-warning-subtle'
    | 'color-feedback-bg-alert-subtle'
    | 'color-feedback-bg-discovery-subtle'
    | 'color-feedback-bg-informative-subtle'
    | 'color-feedback-bg-success-subtlest'
    | 'color-feedback-bg-warning-subtlest'
    | 'color-feedback-bg-alert-subtlest'
    | 'color-feedback-bg-discovery-subtlest'
    | 'color-feedback-bg-informative-subtlest'
    | 'color-feedback-bg-success-bold'
    | 'color-feedback-bg-alert-bold'
    | 'color-feedback-bg-warning-bold'
    | 'color-feedback-bg-discovery-bold'
    | 'color-feedback-bg-informative-bold'
    | 'color-input-bg'
    | 'color-input-bg-hover'
    | 'color-input-bg-disabled'
    | 'color-blanket-bg'
/**
 * BORDER
 */
    | 'color-border'
    | 'color-border-subtle'
    | 'color-border-bold'
    | 'color-border-overlay'
    | 'color-border-hover'
    | 'color-border-disabled'
    | 'color-border-selected'
    | 'color-border-inverse'
    | 'color-border-brand'
    | 'color-feedback-border-success'
    | 'color-feedback-border-warning'
    | 'color-feedback-border-alert'
    | 'color-feedback-border-discovery'
    | 'color-feedback-border-informative'
    | 'color-input-border'
    | 'color-input-border-hover'
    | 'color-input-border-disabled'
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
    | 'color-content-subtle-hover'
    | 'color-content-selected'
    | 'color-feedback-content-success'
    | 'color-feedback-content-warning'
    | 'color-feedback-content-alert'
    | 'color-feedback-content-discovery'
    | 'color-feedback-content-informative'
    | 'color-input-content'
    | 'color-input-content-hover'
    | 'color-input-content-disabled'
    | 'color-input-content-error'
    | 'color-link-content'
    | 'color-link-content-visited'
    | 'color-link-content-disabled'
    | 'color-link-content-hover'
/**
 * BOX-SHADOW
 */
    | 'color-box-shadow';

export type AliasTokenMap = {
    [Token in AliasTokens]: NoSelfReference<RefTokens | AliasTokens, Token>;
}

export const defaultAliasTokens: AliasTokenMap = {
    /**
     * ACTION
     * Usage: Buttons.
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
     * BACKGROUND
     */

    /**
     * Use as the primary surface base background of the UI.
     */
    'color-bg': 'color-white',
    /**
     * Use for the elevation surface background of elements that sit on top of other UI elements,
     * such as modals, menus, floating toolbar, toggletips, etc.
     */
    'color-bg-overlay': 'color-white',
    /**
     * A secondary elevation surface background for the UI commonly used for
     * grouped or isolated items, such as sections, accordion panels, etc.
     */
    'color-bg-isolated': 'color-neutral-02',

    /**
     * Use for backgrounds of elements on a bold background, such as in the buttons on spotlight cards.
     */
    // 'color-bg-inverse': 'color-neutral-65',
    // 'color-bg-inverse-hover': 'color-neutral-80',

    /**
     * Use for the background of elements that appear to have no background in a resting state,
     * such as subtle buttons and menu items.
     */
    // 'color-bg-subtle': 'transparent-50',
    /**
     * Use for backgrounds of elements in a hovered state,
     * such as menu items, navigation elements, etc.
     */
    'color-bg-hover': 'color-neutral-15',
    /**
     * Use for backgrounds of elements in a disabled state,
     * such as menu items, form elements, etc.
     */
    'color-bg-disabled': 'color-neutral-05',
    'color-bg-empty': 'color-neutral-15',
    /**
     * Use for the background of elements in a selected state.
     */
    'color-bg-selected': 'color-brand-05',
    // color-bg-selected-hover?

    /**
     * Use for the background of action or visual indicator elements to reinforce our brand,
     * that need to stand out a lot.
     */
    'color-bg-brand-subtle': 'color-brand-20',
    'color-bg-brand': 'color-brand-50',
    'color-bg-brand-bold': 'color-brand-80',
    'color-bg-indicator': 'color-bg-brand',

    /**
     * Use for default background of neutral UI elements,
     * subtle: use for default variants of lozenge, sectionnal banners.
     * bold: vibrant option neutral elements, such as global-banners, lozenges, toasts.
     */
    'color-bg-neutral-subtlest': 'color-neutral-02',
    'color-bg-neutral-subtle': 'color-neutral-05',
    'color-bg-neutral-bold': 'color-neutral-65',
    // 'color-bg-neutral-hover': 'color-neutral-70',
    // 'color-bg-neutral-disabled': 'color-neutral-20',
    /**
     * Use for backgrounds communicating a favorable outcome.
     * subtle: use for success section messages.
     * bold: vibrant option for checked toggles.
     */
    'color-feedback-bg-success-subtlest': 'color-success-02',
    'color-feedback-bg-success-subtle': 'color-success-05',
    'color-feedback-bg-success-bold': 'color-success-50',
    // 'color-feedback-bg-success-hover': 'color-success-70',
    // 'color-feedback-bg-success-disabled': 'color-success-20',
    /**
     * Use for backgrounds communicating critical information.
     * subtle: use for error section messages.
     * bold: vibrant option for danger buttons and error banners.
     */
    'color-feedback-bg-alert-subtlest': 'color-alert-02',
    'color-feedback-bg-alert-subtle': 'color-alert-05',
    'color-feedback-bg-alert-bold': 'color-alert-50',
    // 'color-feedback-bg-alert-hover': 'color-alert-70',
    // 'color-feedback-bg-alert-disabled': 'color-alert-20',
    /**
     * Use for backgrounds communicating caution.
     * subtle: use for warning buttons and warning banners.
     * bold: vibrant option for danger buttons and error banners.
     */
    'color-feedback-bg-warning-subtlest': 'color-warning-02',
    'color-feedback-bg-warning-subtle': 'color-warning-05',
    'color-feedback-bg-warning-bold': 'color-warning-50',
    // 'color-feedback-bg-warning-hover': 'color-warning-70',
    // 'color-feedback-bg-warning-disabled': 'color-warning-20',
    /**
     * Use for backgrounds communicating change or something new
     * subtle: use for discovery section messages.
     * bold: vibrant option for onboarding spotlights.
     */
    'color-feedback-bg-discovery-subtlest': 'color-discovery-02',
    'color-feedback-bg-discovery-subtle': 'color-discovery-05',
    'color-feedback-bg-discovery-bold': 'color-discovery-50',
    // 'color-feedback-bg-discovery-hover': 'color-discovery-70',
    // 'color-feedback-bg-discovery-disabled': 'color-discovery-20',
    /**
     * Use for backgrounds communicating information or something in-progress.
     * subtle: use for information section messages.
     * bold: vibrant option.
     */
    'color-feedback-bg-informative-subtlest': 'color-informative-02',
    'color-feedback-bg-informative-subtle': 'color-informative-05',
    'color-feedback-bg-informative-bold': 'color-informative-50',
    // 'color-feedback-bg-informative-hover': 'color-informative-70',
    // 'color-feedback-bg-informative-disabled': 'color-informative-20',

    /**
     * Use for background of form UI elements, such as inputs, checkboxes, and radio buttons.
     * Use selected for the backgrounds of inputs in a selected state, such as checkboxes and radio buttons.
     */
    'color-input-bg': 'color-white',
    'color-input-bg-hover': 'color-neutral-15',
    'color-input-bg-disabled': 'color-neutral-05',
    // color-input-bg-selected?
    // color-input-bg-selected-hover?

    /**
     * Use for the screen overlay that appears with modal dialogs
     */
    'color-blanket-bg': 'transparent-dark-75',

    /**
     * BORDER
     */

    /**
     * Use to visually group or separate UI elements, such as flat cards, side panel dividers and seperators.
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
    'color-border-disabled': 'color-neutral-30',
    /**
     * Use for borders or visual indicators of elements in a selected, opened or active state,
     * such as in tabs or menu items.
     */
    'color-border-selected': 'color-brand-50',
    // 'color-border-selected-hover' ?

    /**
     * Use for borders or visual indicators of elements that reinforce our brand,
     * such as global header or primary buttons.
     */
    'color-border-brand': 'color-brand-70',

    /**
     * Use for borders communicating a favorable outcome.
     */
    'color-feedback-border-success': 'color-success-50',
    /**
     * Use for borders communicating caution.
     */
    'color-feedback-border-warning': 'color-warning-50',
    /**
     * Use for borders communicating critical information, such as the borders on invalid inputs or table rows in error.
     */
    'color-feedback-border-alert': 'color-alert-50',
    /**
     * Use for borders communicating change or something new, such as the borders in onboarding spotlights.
     */
    'color-feedback-border-discovery': 'color-discovery-50',
    /**
     * Use for borders communicating information or something in-progress.
     */
    'color-feedback-border-informative': 'color-informative-50',

    /**
     * Use for borders of form UI elements, such as text fields, checkboxes, and radio buttons.
     */
    'color-input-border': 'color-neutral-65',
    'color-input-border-hover': 'color-neutral-90',
    'color-input-border-disabled': 'color-neutral-15',
    // color-input-border-error?
    // color-input-border-selected?

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
     * Use for primary content, such as body copy, sentence case headers, and buttons.
     */
    'color-content': 'color-neutral-90',
    /**
     * Use for secondary content, input field hints, subheadings, list items description.
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
    'color-content-subtle-hover': 'color-neutral-90',
    /**
     * Use for content in a disabled state.
     */
    'color-content-disabled': 'color-neutral-30',
    /**
     * Use for text in selected, active or opened states, such as choosers, toggles, pagination, etc.
     */
    'color-content-selected': 'color-brand-70',
    // 'color-content-selected-hover' ?

    /**
     * Use for content of elements that reinforce our brand, such as logos or primary buttons.
     */
    // color-content-brand?
    // color-content-action?

    /**
     * Use for content to communicate a favorable outcome, such as input field success messaging.
     */
    'color-feedback-content-success': 'color-success-70',
    /**
     * Use for critical text, such as input field error messaging.
     */
    'color-feedback-content-alert': 'color-alert-70',
    /**
     * Use for text to emphasize change or something new, such as in new lozenges.
     */
    'color-feedback-content-discovery': 'color-discovery-70',
    /**
     * Use for informative text or to communicate something is in progress, such as in-progress lozenges.
     */
    'color-feedback-content-informative': 'color-informative-70',
    /**
     * Use for text to emphasize caution, such as in moved lozenges.
     */
    'color-feedback-content-warning': 'color-warning-80',

    /**
     * Use for content of form UI elements, such as inputs.
     */
    'color-input-content': 'color-neutral-65',
    'color-input-content-hover': 'color-neutral-90',
    'color-input-content-disabled': 'color-neutral-30',
    'color-input-content-error': 'color-alert-50',
    // color-input-content-selected?
    // color-input-content-placeholder?

    /**
     * Use for links in a default, disabled, hovered and visited state.
     */
    'color-link-content': 'color-informative-50',
    'color-link-content-disabled': 'color-informative-20',
    'color-link-content-hover': 'color-informative-70',
    'color-link-content-visited': 'color-discovery-50',

    /**
     * BOX-SHADOW
     */
    'color-box-shadow': 'transparent-dark-20',
};
