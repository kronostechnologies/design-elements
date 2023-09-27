import * as equisoftPalette from './equisoft-palette';
import { Theme } from './theme';
import { generateTokens } from './tokens';

const { main, greys, notifications } = equisoftPalette;

const minimalTheme: Omit<Theme, 'tokens'> = {
    main,
    greys,
    notifications,
};

// Generate tokens for the minimal theme
const minimalTokens = generateTokens(minimalTheme);

export const equisoftTheme: Theme = {
    ...minimalTheme,
    tokens: minimalTokens,
};
