import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type PhoneInputTokens =
    | 'phone-input-background-color'
    | 'phone-input-mask-text-color';

export type PhoneInputTokenValue = AliasTokens | RefTokens;

export type PhoneInputTokenMap = {
    [Token in PhoneInputTokens]: PhoneInputTokenValue;
};

export const defaultPhoneInputTokens: PhoneInputTokenMap = {
    'phone-input-background-color': 'transparent-100', // Remove??
    'phone-input-mask-text-color': 'color-input-content',
};
