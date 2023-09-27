import * as equisoftPallet from './equisoft-pallet';
import { Theme } from './theme';
import { generateTokens } from './tokens';

const { main, greys, notifications } = equisoftPallet;

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
