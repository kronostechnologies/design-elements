export type TextAttributeValue = string;

export type TextAttributeTokens =
    | 'font-weight-bold';

export type TextAttributeTokenMap = {
    [Token in TextAttributeTokens]: TextAttributeValue;
};
