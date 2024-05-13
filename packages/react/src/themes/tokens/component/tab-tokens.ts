import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TabTokens =
    | 'tab-section-border-color'
    | 'tab-section-box-shadow-color'
    | 'tab-global-list-background-color'
    | 'tab-section-list-background-color'
    | 'tab-section-button-background-color'
    | 'tab-global-button-background-color'
    | 'tab-button-icon-color'
    | 'tab-button-text-color'
    | 'tab-button-indicator-hover-background-color'
    | 'tab-button-hover-text-color'
    | 'tab-button-indicator-active-background-color'
    | 'tab-button-active-text-color'
    | 'tab-button-indicator-selected-background-color'
    | 'tab-global-button-selected-background-color'
    | 'tab-section-button-selected-background-color'
    | 'tab-button-selected-text-color'
    | 'tab-section-background-color'
    | 'tab-border-bottom-color';

export type TabTokenValue = AliasTokens | RefTokens;

export type TabTokenMap = {
    [Token in TabTokens]: TabTokenValue;
};

export const defaultTabTokens: TabTokenMap = {
    /**
     * tabs global
     */
    'tab-global-button-background-color': 'transparent-100',
    'tab-global-list-background-color': 'transparent-100',
    'tab-global-button-selected-background-color': 'transparent-100',

    /**
     * tabs section
     */
    'tab-section-background-color': 'color-bg',
    'tab-section-border-color': 'color-border',
    'tab-section-box-shadow-color': 'color-box-shadow',
    'tab-section-list-background-color': 'color-bg-neutral-subtle',
    'tab-section-button-background-color': 'color-bg',
    'tab-section-button-selected-background-color': 'color-bg',

    /**
     * tab button
     */
    'tab-button-icon-color': 'color-content-subtle',
    'tab-button-text-color': 'color-content-subtle',
    'tab-button-hover-text-color': 'color-content-hover',
    'tab-button-active-text-color': 'color-content',
    'tab-button-selected-text-color': 'color-content',

    'tab-border-bottom-color': 'color-border',

    /**
     * tab button indicator
     */
    'tab-button-indicator-hover-background-color': 'color-bg-hover',
    'tab-button-indicator-active-background-color': 'color-bg-indicator-active',
    'tab-button-indicator-selected-background-color': 'color-bg-indicator-selected',
};
