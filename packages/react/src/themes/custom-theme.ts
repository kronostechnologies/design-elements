import { mergedTheme } from './merge-pallets';
import { Theme } from './theme';
import { generateTokens } from './tokens';

const { main, greys, notifications } = mergedTheme;

const minimalCustomTheme: Omit<Theme, 'tokens'> = {
    main,
    greys,
    notifications,
};

const minimalCustomTokens = generateTokens(minimalCustomTheme);

export const customTheme: Theme = {
    ...minimalCustomTheme,
    tokens: minimalCustomTokens,
};
