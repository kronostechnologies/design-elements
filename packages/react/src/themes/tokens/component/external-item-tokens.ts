import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ExternalItemTokens =
    'external-item-color'
    | 'external-item-hover-color'
    | 'external-item-visited-color'
    | 'external-item-visited-fill-color'
    | 'external-item-svg-visited-color'
    | 'external-item-svg-visited-fill-color'
    | 'external-item-disabled-color'
    | 'external-item-disabled-fill-color';

export type ExternalItemTokenValue = AliasTokens | RefTokens;

export type ExternalItemTokenMap = {
    [Token in ExternalItemTokens]: ExternalItemTokenValue;
};

export const defaultExternalItemTokens: ExternalItemTokenMap = {
    'external-item-color': 'color-black',
    'external-item-hover-color': 'color-neutral-15',
    'external-item-svg-visited-color': 'color-black',
    'external-item-svg-visited-fill-color': 'color-black',
    'external-item-visited-color': 'color-black',
    'external-item-visited-fill-color': 'color-black',
    'external-item-disabled-color': 'color-neutral-30',
    'external-item-disabled-fill-color': 'color-neutral-30',
};
