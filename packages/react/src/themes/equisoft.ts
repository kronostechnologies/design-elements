import * as equisoftPalette from './default-theme';
import { Theme } from './default-types';

const { palette, tokens } = equisoftPalette;

export const equisoftTheme: Theme = {
    ref: palette,
    component: tokens,
};
