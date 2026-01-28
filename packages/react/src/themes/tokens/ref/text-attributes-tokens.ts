export type TextAttributeTokens =
    | 'letter-spacing-normal'
    | 'font-size-350'
    | 'font-transform-none'
    | 'font-weight-regular'
    | 'font-weight-semibold'
    | 'font-weight-bold';

export type TextAttributeValue = string;

export type TextAttributeTokenMap = {
    [Token in TextAttributeTokens]: TextAttributeValue;
};

export const defaultTextAttributeTokens: TextAttributeTokenMap = {
    'letter-spacing-normal': '0.2px',
    'font-size-350': '0.875rem',
    'font-transform-none': 'none',
    'font-weight-bold': '700',
    'font-weight-regular': '400',
    'font-weight-semibold': '600',
};
