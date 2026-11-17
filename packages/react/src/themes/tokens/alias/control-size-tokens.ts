import type { AliasTokenMap } from '../tokens';

export type ControlSizeAliasToken =
    | 'size-touch-target'
    | 'size-stepper-value-width'
    | 'size-stepper-icon'
    | 'spacing-stepper-button-padding'
    | 'spacing-stepper-value-padding-inline'
    | 'text-stepper-value-letter-spacing';

export const defaultControlSizeAliasTokens: AliasTokenMap<ControlSizeAliasToken> = {
    'size-touch-target': 'size-2x',
    'size-touch-target:mobile': 'size-3x',
    'size-stepper-value-width': 'size-3x',
    'size-stepper-value-width:mobile': 'size-stepper-value-width-mobile',
    'size-stepper-icon': 'size-1x',
    'size-stepper-icon:mobile': 'size-125',
    'spacing-stepper-button-padding': 'spacing-1x',
    'spacing-stepper-button-padding:mobile': 'spacing-1halfx',
    'spacing-stepper-value-padding-inline': 'spacing-1x',
    'spacing-stepper-value-padding-inline:mobile': 'spacing-1halfx',
    'text-stepper-value-letter-spacing': 'letter-spacing-body-compact',
    'text-stepper-value-letter-spacing:mobile': 'letter-spacing-body-mobile',
};
