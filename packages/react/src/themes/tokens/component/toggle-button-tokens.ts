import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ToggleButtonToken =
    | 'toggle-button-background-color'
    | 'toggle-button-border-color'
    | 'toggle-button-font-size'
    | 'toggle-button-text-transform'
    | 'toggle-button-font-weight'
    | 'toggle-button-letter-spacing'
    | 'toggle-button-text-color'
    | 'toggle-button-hover-background-color'
    | 'toggle-button-hover-text-color'
    | 'toggle-button-disabled-background-color'
    | 'toggle-button-disabled-text-color'
    | 'toggle-button-pressed-background-color'
    | 'toggle-button-pressed-font-weight'
    | 'toggle-button-pressed-text-color'
    | 'toggle-button-pressed-hover-background-color'
    | 'toggle-button-pressed-hover-text-color';

export type ToggleButtonTokenValue = AliasTokens | RefTokens;

export type ToggleButtonTokenMap = {
    [Token in ToggleButtonToken]: ToggleButtonTokenValue;
};

export const defaultToggleButtonTokens: ToggleButtonTokenMap = {
    'toggle-button-background-color': 'transparent-100',
    'toggle-button-border-color': 'transparent-100',
    'toggle-button-font-size': 'text-body-medium-font-size',
    'toggle-button-text-transform': 'text-body-transform',
    'toggle-button-font-weight': 'font-weight-regular',
    'toggle-button-letter-spacing': 'letter-spacing-normal',
    'toggle-button-text-color': 'color-control-auxiliary',
    'toggle-button-hover-background-color': 'color-control-background-hover',
    'toggle-button-hover-text-color': 'color-control-auxiliary-hover',
    'toggle-button-disabled-background-color': 'color-control-background-disabled',
    'toggle-button-disabled-text-color': 'color-control-auxiliary-disabled',
    'toggle-button-pressed-background-color': 'color-control-background-selected',
    'toggle-button-pressed-font-weight': 'font-weight-semibold',
    'toggle-button-pressed-text-color': 'color-control-auxiliary-selected',
    'toggle-button-pressed-hover-background-color': 'color-control-background-selected-hover',
    'toggle-button-pressed-hover-text-color': 'color-control-auxiliary-selected',
};
