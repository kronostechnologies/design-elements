import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type LozengeTokens =
    'lozenge-success-background-color' |
    'lozenge-disabled-background-color' |
    'lozenge-alert-background-color' |
    'lozenge-warning-background-color' |
    'lozenge-info-background-color' |
    'lozenge-default-background-color' |
    'lozenge-success-border-color' |
    'lozenge-disabled-border-color' |
    'lozenge-alert-border-color' |
    'lozenge-warning-border-color' |
    'lozenge-info-border-color' |
    'lozenge-default-border-color' |
    'lozenge-success-color' |
    'lozenge-disabled-color' |
    'lozenge-alert-color' |
    'lozenge-warning-color' |
    'lozenge-info-color' |
    'lozenge-default-color';

export type LozengeTokensValue = AliasTokens | RefTokens;

export type LozengeTokensMap = {
    [Token in LozengeTokens]: LozengeTokensValue;
};

export const defaultLozengeTokens: LozengeTokensMap = {
    'lozenge-success-background-color' : 'color-success-02',
    'lozenge-disabled-background-color' : 'color-neutral-05',
    'lozenge-alert-background-color' : 'color-alert-05',
    'lozenge-warning-background-color' : 'color-warning-05',
    'lozenge-info-background-color' : 'color-informative-05',
    'lozenge-default-background-color' : 'color-neutral-05',
    'lozenge-success-border-color' : 'color-success-50',
    'lozenge-disabled-border-color' : 'color-neutral-30',
    'lozenge-alert-border-color' : 'color-alert-50',
    'lozenge-warning-border-color' : 'color-warning-50',
    'lozenge-info-border-color' : 'color-informative-50',
    'lozenge-default-border-color' : 'color-neutral-65',
    'lozenge-success-color' : 'color-success-50',
    'lozenge-disabled-color' : 'color-neutral-30',
    'lozenge-alert-color' : 'color-alert-50',
    'lozenge-warning-color' : 'color-warning-50',
    'lozenge-info-color' : 'color-informative-50',
    'lozenge-default-color' : 'color-neutral-65'
}
