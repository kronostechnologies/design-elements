export type TextAttributeTokens =
    | 'font-weight-bold';

export type TextAttributeValue = string;

export type TextAttributeTokenMap = {
    [Token in TextAttributeTokens]: TextAttributeValue;
};

export const defaultTextAttributeTokens: TextAttributeTokenMap = {
    'font-weight-bold': 'bold',
};
