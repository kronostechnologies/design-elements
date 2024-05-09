import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TabTokens =
    | 'tab-button-section-background-color'
    | 'tab-button-global-background-color'
    | 'tab-button-icon-color'
    | 'tab-button-text-color'
    | 'tab-button-indicator-hover-background-color'
    | 'tab-button-hover-text-color'
    | 'tab-button-indicator-active-background-color'
    | 'tab-button-active-text-color'
    | 'tab-button-indicator-selected-background-color'
    | 'tab-button-selected-background-color'
    | 'tab-button-selected-text-color'
    | 'tab-border-bottom-color'
    | 'tab-panel-border-color'
    | 'tab-panel-background-color';

export type TabTokenValue = AliasTokens | RefTokens;

export type TabTokenMap = {
    [Token in TabTokens]: TabTokenValue;
};

export const defaultTabTokens: TabTokenMap = {
    /**
     * tab button
     */
    'tab-button-global-background-color': 'color-bg',
    'tab-button-section-background-color': 'color-bg-neutral-subtle', // color-bg-isolated? neutral-02 or neutral-05?
    'tab-button-selected-background-color': 'color-bg',

    'tab-button-icon-color': 'color-content-subtle',
    'tab-button-text-color': 'color-content-subtle',
    'tab-button-hover-text-color': 'color-neutral-65',
    'tab-button-active-text-color': 'color-neutral-90',
    'tab-button-selected-text-color': 'color-neutral-90',

    /**
     * tab button indicator
     */
    'tab-button-indicator-hover-background-color': 'color-bg-hover',
    'tab-button-indicator-active-background-color': 'color-bg-indicator-active', // not sure about this one
    'tab-button-indicator-selected-background-color': 'color-bg-indicator',

    /**
     * tab panel
     */
    'tab-border-bottom-color': 'color-neutral-15',
    'tab-panel-border-color': 'color-neutral-05', // should be the same as 'tab-border-bottom-color'?
    'tab-panel-background-color': 'color-bg',
};
