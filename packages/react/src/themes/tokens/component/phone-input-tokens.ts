import type { ComponentTokenMap } from '../tokens';

export type PhoneInputToken =
    | 'phone-input-background-color'
    | 'phone-input-mask-text-color';

export const defaultPhoneInputTokens: ComponentTokenMap<PhoneInputToken> = {
    'phone-input-background-color': 'transparent-100',
    'phone-input-mask-text-color': 'color-control-auxiliary',
};
