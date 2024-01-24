export type TextAttributeValue = string;

export type TextAttributeTokens =
    | 'font-weight-bold'
    | 'transparent';

export type TextAttributeTokenMap = {
    [Token in TextAttributeTokens]: TextAttributeValue;
};
